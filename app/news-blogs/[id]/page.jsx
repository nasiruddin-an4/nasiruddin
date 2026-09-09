import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchNews, fetchBlogs } from "@/lib/api";
import { sanitizeHtml, stripHtml, estimateReadTime } from "@/lib/utils";
import { MoveLeft, Calendar, Clock } from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import PressCard from "@/app/components/PressCard";
import ReadingProgressBar from "@/app/components/ReadingProgressBar";

// Memoized per-request so generateMetadata and the page body share one DB round trip.
const getArticles = cache(async () => {
  const [news, blogs] = await Promise.all([fetchNews(), fetchBlogs()]);
  return { news, blogs };
});

async function findArticle(id) {
  const { news, blogs } = await getArticles();
  const newsMatch = news.find((item) => item.slug === id || item.id.toString() === id);
  if (newsMatch) return { ...newsMatch, kind: "News" };
  const blogMatch = blogs.find((item) => item.slug === id || item.id.toString() === id);
  if (blogMatch) return { ...blogMatch, kind: "Blog" };
  return null;
}

function getRelatedArticles(news, blogs, current, count = 3) {
  const all = [
    ...news.map((n) => ({ ...n, kind: "News", type: n.type || "News" })),
    ...blogs.map((b) => ({ ...b, kind: "Blog", type: b.type || "Blog" })),
  ].filter((a) => a.id.toString() !== current.id.toString());

  const sameCategory = all.filter((a) => a.category === current.category);
  const rest = all.filter((a) => a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await findArticle(id);
  if (!article) return { title: "Article Not Found" };

  const description =
    article.metaDescription ||
    stripHtml(article.content) ||
    article.excerpt ||
    `Read ${article.title} by Nasir Uddin.`;
  const shortDesc = description.substring(0, 160);

  return {
    title: article.metaTitle || article.title,
    description: shortDesc,
    alternates: {
      canonical: `/news-blogs/${article.slug || article.id}`,
    },
    openGraph: {
      title: article.metaTitle || article.title,
      description: shortDesc,
      type: "article",
      images: article.image ? [{ url: article.image, width: 1200, height: 630, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle || article.title,
      description: shortDesc,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const { news, blogs } = await getArticles();
  const article = await findArticle(id);

  if (!article) {
    notFound();
  }

  const articleUrl = `https://www.nasiruddin.net/news-blogs/${article.slug || article.id}`;
  const readTime = article.readTime || estimateReadTime(article.content || article.excerpt);
  const relatedArticles = getRelatedArticles(news, blogs, article);

  const shareLinks = [
    { Icon: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}` },
    { Icon: FaXTwitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}` },
    { Icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}` },
    { Icon: FaWhatsapp, href: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${articleUrl}`)}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": article.kind === "News" ? "NewsArticle" : "BlogPosting",
    headline: article.title,
    image: article.image ? [article.image] : undefined,
    datePublished: article.date,
    dateModified: article.updatedAt || article.date,
    author: {
      "@type": "Person",
      name: "Nasir Uddin",
      url: "https://www.nasiruddin.net",
    },
    publisher: {
      "@type": "Person",
      name: "Nasir Uddin",
      url: "https://www.nasiruddin.net",
    },
    description: article.metaDescription || stripHtml(article.content) || article.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <div className="min-h-screen bg-brandBlack text-white pb-20 overflow-x-hidden">
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-10 md:pt-20">
        <Link
          href="/news-blogs"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-brandYellow transition-colors duration-300 text-xs font-bold uppercase tracking-widest mb-8 group"
        >
          <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO NEWS & BLOGS
        </Link>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16 leading-tight max-w-4xl">
          {article.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-8 bg-zinc-900/40 p-6 md:p-8 rounded-2xl border border-zinc-800">
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Type</h4>
                <p className="text-lg font-medium text-brandYellow">{article.kind}</p>
              </div>

              {article.category && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Category</h4>
                  <p className="text-lg font-medium">{article.category}</p>
                </div>
              )}

              {article.date && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Published
                  </h4>
                  <p className="text-lg font-medium">{article.date}</p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> Read Time
                </h4>
                <p className="text-lg font-medium">{readTime}</p>
              </div>

              {article.tags && article.tags.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-zinc-800 text-zinc-300 font-medium px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {article.link && article.link !== "#" && (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-brandYellow text-brandBlack font-bold text-sm uppercase tracking-widest py-3 rounded-lg hover:bg-white transition-colors"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" /> Original Source
                </a>
              )}

              <div className="pt-6 border-t border-zinc-800">
                <h4 className="text-sm font-medium text-zinc-400 mb-4">Share this Article:</h4>
                <div className="flex items-center gap-3">
                  {shareLinks.map(({ Icon, href }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-brandYellow hover:text-brandBlack transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-9 space-y-12">
            {article.image && (
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={article.image}
                  alt={article.alt || article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {article.content ? (
              <div
                className="richtext text-zinc-300 font-sans font-light text-lg max-w-3xl"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
              />
            ) : (
              <p className="text-zinc-300 font-sans font-light text-lg max-w-3xl">{article.excerpt}</p>
            )}
          </main>
        </div>

        {/* Author Block */}
        <section className="mt-20 pt-12 border-t border-zinc-900">
          <Link
            href="/about"
            className="flex items-center gap-5 group w-fit"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-zinc-700 shrink-0">
              <Image src="/about_img.png" alt="Nasir Uddin" fill className="object-cover object-top" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Written by</p>
              <h4 className="font-bold text-xl text-white group-hover:text-brandYellow transition-colors">
                Nasir Uddin
              </h4>
              <p className="text-zinc-400 text-sm">Software Engineer & Full-Stack Digital Marketer</p>
            </div>
          </Link>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 pt-16 border-t border-zinc-900">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">More like this</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12">
              {relatedArticles.map((related) => (
                <PressCard key={related.id} article={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
