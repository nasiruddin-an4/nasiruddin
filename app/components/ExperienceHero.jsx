"use client";

import Link from "next/link";
import { FaQuoteLeft } from "react-icons/fa6";
import { motion } from "framer-motion";

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
      <div className="relative h-[450px] md:h-[600px] w-full bg-[#0a0a0a] overflow-hidden border-b border-zinc-900">
        {/* Background Overlay with Pattern effect */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full opacity-25"
            style={{
              backgroundImage: "url('/heroBG.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(100%)"
            }}
          />
          {/* Subtle gradient to focus on the text and portrait */}
          <div className="absolute inset-0 bg-linear-to-r from-brandBlack via-brandBlack/90 to-transparent" />
        </div>

        <div className="container mx-auto h-full px-6 md:px-16 lg:px-24 relative z-10 flex flex-col items-center justify-center text-center">
          {/* Content: Quote & Intro */}
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center pt-16 md:pt-0">
            <div className="mb-4 md:mb-8">
              <FaQuoteLeft className="text-brandYellow text-3xl md:text-5xl" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 font-bold leading-tight">
              My Professional Journey <br /> & <span className="text-brandYellow">Experience.</span>
            </h1>

            <p className="text-gray-400 text-base md:text-xl font-serif font-medium leading-relaxed max-w-2xl opacity-90 mx-auto">
              A timeline of my professional roles, highlighting my journey as a Software Engineer and Digital Marketer across various companies and projects.
            </p>
          </div>

          {/* Balloon Pop Background Animation */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
            {Array.from({ length: 15 }).map((_, i) => {
              // Deterministic values to prevent hydration mismatch
              const left = `${(i * 17) % 100}%`;
              const size = ((i * 13) % 50) + 20; // 20px to 70px
              const duration = ((i * 7) % 4) + 4; // 4s to 8s
              const delay = (i * 11) % 5;
              const isSolid = i % 4 === 0;

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: left,
                    width: size,
                    height: size,
                    backgroundColor: isSolid ? "rgba(252,235,59,0.6)" : "transparent",
                    border: isSolid ? "none" : "2px solid rgba(252,235,59,0.3)",
                    bottom: "-100px",
                  }}
                  animate={{
                    y: [0, -400, -600],
                    scale: [0.5, 1, 2.5],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    times: [0, 0.8, 1], // Floats up slowly, then scales up and fades out fast (pop)
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
