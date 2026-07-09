import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "./AnimatedHeading";
import { fetchNews, fetchBlogs } from "@/lib/api";

export default async function ReadThisSection() {
  const news = await fetchNews();
  const blogs = await fetchBlogs();
  const pressData = [
    ...news.map((n) => ({ ...n, type: n.type || "News" })),
    ...blogs.map((b) => ({ ...b, type: b.type || "Blog" })),
  ];
  pressData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="w-full bg-[#161616] text-white flex flex-col py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 inline-block">
          <AnimatedHeading
            className="text-2xl md:text-3xl"
            initialColor="text-brandBlack"
            finalColor="text-brandBlack"
          >
            LATEST NEWS
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {pressData.slice(0, 2).map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.id}`}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative w-full aspect-video mb-6 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.alt || article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex flex-col gap-1 mb-3">
                  <p className="text-white text-sm md:text-base font-extrabold uppercase tracking-widest">
                    {article.category}
                  </p>
                </div>
                <h3
                  className={`text-xl md:text-4xl pt-2 uppercase group-hover:text-gray-300 transition-colors duration-300 ${article.content ? "mb-4 line-clamp-3" : "line-clamp-4"}`}
                >
                  {article.title}
                </h3>
                {article.content && (
                  <p className="text-gray-400 font-serif text-base md:text-lg leading-relaxed line-clamp-2">
                    {article.content}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
