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
      <div className="container mx-auto px-4 mb-8">
        <AnimatedHeading className="text-4xl md:text-5xl">
          EXPERIENCE
        </AnimatedHeading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-12 pb-12">
        {experiences.map((exp, idx) => (
          <ExperienceCard key={idx} exp={exp} index={idx} />
        ))}
        {/* Tablet Placeholders (2 columns) */}
        {Array.from({ length: mdDummies }).map((_, i) => (
          <div
            key={`md-dummy-${i}`}
            className="border border-zinc-600 h-[380px] hidden md:block lg:hidden"
          ></div>
        ))}
        {/* Desktop Placeholders (4 columns) */}
        {Array.from({ length: lgDummies }).map((_, i) => (
          <div
            key={`lg-dummy-${i}`}
            className="border border-zinc-600 h-[380px] hidden lg:block"
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
      className="relative h-[380px] border border-zinc-600 transition-all duration-500 overflow-hidden group"
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
          className={`absolute inset-0 transition-opacity duration-1000 bg-linear-to-t from-indigo-900/80 via-indigo-900/40 to-transparent opacity-100 ${isHovered ? "md:opacity-100" : "md:opacity-0"}`}
        />

        {/* Logo Container (Always Visible, Fades on hover) */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-700 z-10 
          opacity-100 ${isHovered ? "md:-translate-y-8 md:opacity-10 md:scale-95" : "md:translate-y-0"}`}
        >
          {exp.logo && !imageError ? (
            <div
              className={`relative transition-all duration-700 w-full h-[60%] ${isHovered ? "md:grayscale-0 md:brightness-100" : "md:grayscale md:brightness-200"}`}
            >
              <Image
                src={exp.logo}
                alt={exp.company}
                fill
                className="object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <h3
              className={`text-2xl text-white uppercase transition-all duration-700 text-center opacity-100 ${isHovered ? "md:opacity-10" : "md:opacity-40"}`}
            >
              {exp.company}
            </h3>
          )}
        </div>

        {/* Content Container (Hover View) */}
        <div
          className={`absolute inset-0 px-8 py-6 flex flex-col items-start justify-end transition-all duration-700 z-20
          opacity-100 translate-y-0 ${isHovered ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-4"}`}
        >
          <div className="mb-4">
            <p className="text-brandYellow text-lg uppercase mb-2 font-bold tracking-wider">
              {exp.duration}
            </p>
            <h3 className="text-2xl text-white uppercase tracking-wider mb-2 font-oswald">
              {exp.company}
            </h3>
            <p className="text-zinc-300 text-lg font-serif leading-snug">{exp.role}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
