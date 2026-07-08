"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AnimatedHeading from "./AnimatedHeading";

export default function ExperienceGrid({ experiences }) {
  const mdDummies = experiences.length % 2 === 0 ? 0 : 1;
  const lgDummies =
    experiences.length % 4 === 0 ? 0 : 4 - (experiences.length % 4);

  return (
    <div className="w-full bg-[#0a0a0a]">
      <div className="container mx-auto px-4 mb-16">
        <AnimatedHeading className="text-4xl md:text-5xl">
          EXPERIENCE
        </AnimatedHeading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-zinc-900">
        {experiences.map((exp, idx) => (
          <ExperienceCard key={idx} exp={exp} index={idx} />
        ))}
        {/* Tablet Placeholders (2 columns) */}
        {Array.from({ length: mdDummies }).map((_, i) => (
          <div
            key={`md-dummy-${i}`}
            className="border border-zinc-600 h-[300px] hidden md:block lg:hidden"
          ></div>
        ))}
        {/* Desktop Placeholders (4 columns) */}
        {Array.from({ length: lgDummies }).map((_, i) => (
          <div
            key={`lg-dummy-${i}`}
            className="border border-zinc-600 h-[300px] hidden lg:block"
          ></div>
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="relative h-[300px] border border-zinc-600 transition-all duration-500 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={exp.website || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full"
      >
        {/* Background Gradient shown on hover */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 bg-linear-to-t from-indigo-700/50 via-indigo-800/20 to-transparent opacity-100 ${isHovered ? "md:opacity-100" : "md:opacity-0"}`}
        />

        {/* Logo Container (Always Visible, Left-Aligned) */}
        <div
          className={`absolute inset-0 flex items-start justify-start p-8 transition-all duration-700 z-10 
          -translate-y-14 opacity-100 ${isHovered ? "md:-translate-y-14" : "md:translate-y-0"}`}
        >
          {exp.logo && !imageError ? (
            <div
              className={`relative transition-all duration-700 grayscale-0 brightness-100 w-[50%] h-[80%] ${isHovered ? "md:grayscale-0 md:brightness-100 md:w-[80%] md:h-[80%]" : "md:w-full md:h-full md:grayscale md:brightness-200"}`}
            >
              <Image
                src={exp.logo}
                alt={exp.company}
                fill
                className="object-contain object-left"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <h3
              className={`text-2xl text-white uppercase transition-all duration-700 text-left opacity-100 ${isHovered ? "md:opacity-100" : "md:opacity-40"}`}
            >
              {exp.company}
            </h3>
          )}
        </div>

        {/* Content Container (Hover View) */}
        <div
          className={`absolute inset-0 px-8 py-4 flex flex-col items-start justify-end transition-all duration-700 z-20
          opacity-100 translate-y-0 ${isHovered ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-4"}`}
        >
          <div className="mb-4">
            <p className="text-brandYellow text-xl uppercase mb-1">
              {exp.duration}
            </p>
            <h3 className="text-2xl text-white uppercase tracking-wider mb-1">
              {exp.company}
            </h3>
            <p className="text-zinc-400 text-lg font-serif">{exp.role}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
