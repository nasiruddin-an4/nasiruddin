import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import pressData from "@/data/news.json";
import { MoveLeft, Share2 } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaBehance,
} from "react-icons/fa6";
import socialLinks from "@/data/social.json";

const iconMap = {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaBehance,
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = pressData.find((item) => item.id.toString() === id);
  if (!article) return { title: "News Not Found" };
  return {
    title: `${article.title} | Nasir Uddin`,
    description: article.content ? article.content.substring(0, 160) : `Read about ${article.title} by Nasir Uddin.`,
  };
}

export default async function PressDetails({ params }) {
  // In Next.js 15+, params is a Promise
  const { id } = await params;

  const article = pressData.find((item) => item.id.toString() === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brandBlack text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-14 pb-5 px-4 md:px-6 lg:px-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-widest mb-12 group"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO NEWS
          </Link>

          <header className="mb-0">
            <div className="flex items-center gap-4 mb-6 text-sm uppercase tracking-widest font-bold">
              <span className="text-brandYellow">{article.category}</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
              <span className="text-zinc-400">{article.date || "Recent"}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl mb-2">
              {article.title}
            </h1>
          </header>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            {article.image && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-zinc-800 shadow-2xl">
                <Image
                  src={article.image}
                  alt={article.title || "Article Image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="text-zinc-300 leading-relaxed font-serif font-light text-lg md:text-xl space-y-6">
              {article.content ? (
                article.content.split("\n\n").map((paragraph, idx) => {
                  if (
                    paragraph.trim().startsWith("-") ||
                    paragraph.trim().startsWith("*")
                  ) {
                    return (
                      <ul
                        key={idx}
                        className="list-disc pl-6 space-y-2 mt-4 text-zinc-300"
                      >
                        {paragraph.split("\n").map((item, i) => (
                          <li key={i}>{item.replace(/^[-*]\s*/, "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={idx}
                      className={
                        idx === 0 ? "text-xl text-white font-medium" : ""
                      }
                    >
                      {paragraph}
                    </p>
                  );
                })
              ) : (
                <p className="text-zinc-500 italic">
                  No detailed content available for this article.
                </p>
              )}
            </div>

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-brandYellow text-sm font-bold uppercase tracking-widest">
                <Share2 className="w-4 h-4" />
                <span>Follow Me</span>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-brandYellow transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            {/* Recent News */}
            <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brandYellow mb-6">
                Recent News
              </h3>
              <div className="space-y-6">
                {pressData
                  .filter((item) => item.id.toString() !== id.toString())
                  .slice(0, 4)
                  .map((recent) => (
                    <Link
                      key={recent.id}
                      href={`/news/${recent.id}`}
                      className="group flex gap-4 items-center p-3 -mx-3 rounded-xl hover:bg-zinc-800/50 transition-colors"
                    >
                      {/* Thumbnail Image */}
                      <div className="relative w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                        {recent.image && (
                          <Image
                            src={recent.image}
                            alt={recent.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <p className="text-[10px] text-zinc-500 font-serif mb-1 uppercase tracking-wider">
                          {recent.date}
                        </p>
                        <h4 className="text-md group-hover:text-brandYellow transition-colors line-clamp-3">
                          {recent.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Tags / Categories */}
            {article.tags && article.tags.length > 0 && (
              <div className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brandYellow mb-6">
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-brandBlack border border-zinc-800 text-xs font-serif uppercase tracking-wider text-zinc-400 rounded-full hover:border-brandYellow hover:text-brandYellow transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Read More Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-zinc-900/30 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-8">
            INTERESTED IN MORE INSIGHTS?
          </h2>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-brandBlack font-bold uppercase tracking-wider rounded-full hover:bg-brandYellow hover:text-brandBlack transition-all duration-300"
          >
            LATEST NEWS
          </Link>
        </div>
      </section>
    </div>
  );
}
