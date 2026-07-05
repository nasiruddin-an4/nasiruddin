"use client";

import { useState } from "react";
import AnimatedHeading from "@/app/components/AnimatedHeading";
import PressCard from "@/app/components/PressCard";
import pressData from "@/data/news.json";
import PhotoGallery from "@/app/components/PhotoGallery";
import Link from "next/link";

export default function PressPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(pressData.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pressData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-brandBlack text-white pt-6 md:pt-16 overflow-hidden">
      <div className="container px-4 md:px-6 lg:px-16 mx-auto mb-16">
        {/* Recent Press Section */}
        <div className="mb-12">
          <AnimatedHeading className="text-4xl md:text-5xl uppercase font-bebas tracking-wide">
            Latest News
          </AnimatedHeading>
        </div>

        {/* Press Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12">
          {currentItems.map((article) => (
            <PressCard key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination Details */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brandYellow hover:text-brandBlack hover:border-brandYellow transition-all duration-300"
              >
                &larr;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300
                  ${
                    currentPage === number
                      ? "bg-brandYellow text-brandBlack border-brandYellow"
                      : "border border-zinc-600 hover:border-brandYellow hover:text-brandYellow"
                  }`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brandYellow hover:text-brandBlack hover:border-brandYellow transition-all duration-300"
              >
                &rarr;
              </button>
            </div>
            <p className="text-sm text-zinc-500 tracking-wider">
              PAGE {currentPage} OF {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
