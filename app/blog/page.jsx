"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/app/components/AnimatedHeading";
import Footer from "@/app/components/Footer";
import articlesData from "@/data/blog.json";

const categories = [
  "All",
  "Frontend",
  "Web Development",
  "SEO",
  "UX/UI",
  "AI & Tools",
  "Career",
  "Performance",
  "DevOps",
  "Enterprise",
];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Separate featured from rest
  const featured = articlesData.filter((a) => a.featured);
  const regular = articlesData.filter((a) => !a.featured);

  // Apply category filter to regular articles
  const filtered =
    activeCategory === "All"
      ? regular
      : regular.filter((a) => a.category === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <main className="flex-1 w-full bg-brandBlack min-h-screen text-white flex flex-col">
      {/* ── Header ── */}
      <div className="pt-6 md:pt-16 pb-8 px-4 md:px-12 lg:px-16">
        <AnimatedHeading className="text-3xl md:text-5xl">
          Blog
        </AnimatedHeading>
        <p className="mt-4 text-zinc-500 text-base md:text-lg font-serif max-w-xl">
          Thoughts on web development, software engineering, digital marketing,
          and building modern applications.
        </p>
      </div>

      {/* ── Featured Articles (Hero) ── */}
      {featured.length > 0 && (
        <section className="px-4 md:px-12 lg:px-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {featured.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="group relative overflow-hidden bg-zinc-900 block"
              >
                {/* Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brandBlack/80 via-brandBlack/30 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-brandYellow text-brandBlack text-[14px]">
                      {article.category}
                    </span>
                    <span className="text-white text-xs font-serif">
                      {article.date}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl group-hover:text-brandYellow transition-colors duration-300">
                    {article.title}
                  </h2>
                  <div className="mt-2 text-white text-xs font-serif">
                    {article.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Divider ── */}
      <div className="px-6 md:px-12 lg:px-16 mb-10">
        <div className="h-px w-full bg-zinc-800" />
      </div>

      {/* ── Category Filter ── */}
      <div className="px-6 md:px-12 lg:px-16 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 text-xs font-serif transition-all duration-300 rounded-full border ${
                activeCategory === cat
                  ? "bg-white text-brandBlack border-white"
                  : "bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-400 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Articles Grid ── */}
      <section className="px-6 md:px-12 lg:px-16 mb-16 flex-1">
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentItems.map((article, i) => (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="group block"
                style={{
                  animation: `fadeUp 0.5s ease ${i * 80}ms both`,
                }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-16/10 overflow-hidden bg-zinc-900 mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brandBlack/10 group-hover:bg-brandBlack/30 transition-colors duration-400" />

                  {/* Read time badge */}
                  <div className="absolute top-3 right-3 bg-brandBlack/60 backdrop-blur-sm text-white/80 text-[10px] font-serif px-2.5 py-1">
                    {article.readTime}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-brandYellow text-md font-serif">
                    {article.category}
                  </span>
                  <span className="text-white text-md font-serif">•</span>
                  <span className="text-white text-md font-serif">
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-md md:text-2xl mb-2 group-hover:text-brandYellow transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-zinc-400 text-sm font-serif font-light leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Read link */}
                <div className="mt-3 flex items-center gap-2 text-zinc-500 group-hover:text-brandYellow transition-colors duration-300">
                  <span className="text-xs uppercase tracking-[0.15em] font-bold">
                    Read Post
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg font-serif">
              No posts found in this category.
            </p>
          </div>
        )}
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="px-6 md:px-12 lg:px-16 mb-16 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-brandYellow hover:text-brandBlack hover:border-brandYellow transition-all duration-300"
            >
              &larr;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${
                    currentPage === number
                      ? "bg-brandYellow text-brandBlack"
                      : "border border-zinc-700 hover:border-brandYellow hover:text-brandYellow"
                  }`}
                >
                  {number}
                </button>
              ),
            )}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-700 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-brandYellow hover:text-brandBlack hover:border-brandYellow transition-all duration-300"
            >
              &rarr;
            </button>
          </div>
          <p className="text-xs text-zinc-600 font-mono tracking-widest">
            PAGE {currentPage} OF {totalPages}
          </p>
        </div>
      )}

      {/* ── Newsletter CTA ── */}
      <section className="px-6 md:px-12 lg:px-16 mb-20">
        <div className="relative bg-[#1a1a1a] border border-zinc-800/60 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-brandYellow" />
          <div className="p-8 md:p-12 lg:p-16 text-center max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl uppercase tracking-wider mb-3">
              Stay Updated
            </h3>
            <p className="text-zinc-500 text-base font-serif font-light mb-8 leading-relaxed">
              Get new posts, tutorials, and engineering insights delivered
              straight to your inbox. No spam, ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 bg-[#222] border border-zinc-700 text-white text-sm font-serif placeholder:text-zinc-600 focus:outline-none focus:border-brandYellow transition-colors"
              />
              <button className="shrink-0 bg-brandYellow text-brandBlack px-8 py-3 text-sm font-bold transition-all duration-300 hover:bg-yellow-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
