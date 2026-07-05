"use client";

import Image from "next/image";
import Link from "next/link";
import { FaQuoteLeft } from "react-icons/fa6";

export default function ExperienceHero() {
  return (
    <div className="w-full flex flex-col bg-brandBlack">
      {/* Top Yellow Banner */}
      <div className="bg-[#fceb3b] py-2.5 text-center text-brandBlack font-bold text-sm font-serif z-20">
        <Link href="/cv" className="underline transition-all">
          Check out Nasir&apos;s latest projects and skills!
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[800px] w-full bg-[#0a0a0a] overflow-hidden border-b border-zinc-900">
        {/* Background Overlay with Pattern effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/heroBG.jpeg"
            alt="Background Pattern"
            fill
            className="object-cover grayscale opacity-25"
            priority
          />
          {/* Subtle gradient to focus on the text and portrait */}
          <div className="absolute inset-0 bg-linear-to-r from-brandBlack via-brandBlack/70 to-transparent" />
        </div>

        <div className="container mx-auto h-full px-6 md:px-16 lg:px-24 relative z-10 flex flex-col md:flex-row items-center">
          {/* Left Content: Quote & Intro */}
          <div className="flex-1 pt-12 md:pt-0 md:pr-10 text-left">
            <div className="mb-4">
              <FaQuoteLeft className="text-brandYellow text-3xl md:text-5xl" />
            </div>

            <h1 className="text-3xl md:text-7xl text-white mb-4 max-w-5xl">
              Building modern web applications that drive business growth.
            </h1>

            <p className="text-gray-400 text-sm md:text-lg font-serif font-medium leading-relaxed max-w-5xl opacity-90">
              Software Engineer Nasir Uddin is a Full-Stack Developer and
              Digital Marketer specializing in React, Next.js, and responsive
              web solutions.
            </p>
          </div>

          {/* Right Side: Portrait Image */}
          <div className="flex-1 h-full relative flex items-end justify-center md:justify-end">
            <div className="relative w-full md:w-[120%] h-[80%] md:h-full lg:h-[120%] md:-mb-2 translate-y-4 md:translate-y-8">
              <Image
                src="/Hero.webp"
                alt="Nasir Uddin"
                fill
                className="object-contain object-bottom pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
