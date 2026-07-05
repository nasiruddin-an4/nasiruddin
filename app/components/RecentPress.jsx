"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import AnimatedHeading from "./AnimatedHeading";
import pressData from "@/data/news.json";

import PressCard from "./PressCard";

export default function RecentPress() {
  return (
    <section className="w-full bg-brandBlack text-white py-24 px-4 border-t border-zinc-900 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedHeading className="text-4xl">LATEST NEWS</AnimatedHeading>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12">
          {pressData.slice(0, 3).map((article) => (
            <PressCard key={article.id} article={article} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-10 flex justify-center">
          <Link href="/news">
            <button className="px-8 py-2 cursor-pointer border border-zinc-600 rounded-full text-md text-white hover:bg-white hover:text-brandBlack transition-colors duration-300">
              LOAD MORE
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
