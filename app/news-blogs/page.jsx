"use client";

import { useState, useRef, useEffect } from "react";
import AnimatedHeading from "@/app/components/AnimatedHeading";
import PressCard from "@/app/components/PressCard";
import pressData from "@/data/news.json";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import Footer from "@/app/components/Footer";

export default function NewsBlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const itemsPerPage = 9;

  // Handle click outside for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Data based on type
  const filteredData = filterType === "All"
    ? pressData
    : pressData.filter(article => article.type === filterType);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="flex-1 w-full bg-brandBlack min-h-screen text-white flex flex-col">
      {/* ── Header & Stats ── */}
      <div className="pt-10 md:pt-20 pb-10 px-4 md:px-12 lg:px-16 mb-8 border-b border-zinc-800/50">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Side: Title & Description */}
          <div className="flex-1">
            <AnimatedHeading className="text-3xl md:text-5xl">
              News & Blogs
            </AnimatedHeading>
            <p className="mt-6 text-zinc-500 text-base md:text-lg font-serif max-w-xl">
              Insights, press releases, and articles exploring the intersection of software engineering and digital marketing.
            </p>
          </div>

          {/* Right Side: Filter */}
          <div className="flex flex-col lg:items-end gap-6 pt-6 lg:pt-0">
            {/* Filter Dropdown */}
            <div className="relative w-full sm:w-48" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between bg-[#1a1a1a] text-white border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#fceb3b] transition-colors"
              >
                <span>{filterType === "All" ? "All Types" : filterType}</span>
                <FaChevronDown className={`text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden">
                  <ul className="py-2">
                    {["All", "News", "Blog"].map((type) => (
                      <li
                        key={type}
                        onClick={() => {
                          setFilterType(type);
                          setCurrentPage(1);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-4 py-3 text-sm cursor-pointer hover:bg-zinc-800 transition-colors ${filterType === type ? 'text-[#fceb3b] font-medium' : 'text-zinc-300'
                          }`}
                      >
                        {type === "All" ? "All Types" : type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 lg:px-16 mb-16 flex-1">
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
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#fceb3b] hover:text-brandBlack hover:border-[#fceb3b] transition-all duration-300"
              >
                &larr;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all duration-300
                  ${currentPage === number
                        ? "bg-[#fceb3b] text-brandBlack border-[#fceb3b]"
                        : "border border-zinc-600 hover:border-[#fceb3b] hover:text-[#fceb3b]"
                      }`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#fceb3b] hover:text-brandBlack hover:border-[#fceb3b] transition-all duration-300"
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

      <Footer />
    </main>
  );
}
