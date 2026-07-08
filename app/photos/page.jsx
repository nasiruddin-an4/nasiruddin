"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import AnimatedHeading from "@/app/components/AnimatedHeading";
import Footer from "@/app/components/Footer";

const photos = [
  "/ab4.jpg",
  "/ab5.jpg",
  "/abdulla-1.jpg",
  "/abdullah2.jpg",
  "/heroBG.jpeg",
  "/ab5.jpg",
  "/heroBG.jpeg",
  "/heroBG.jpeg",
  "/ab4.jpg",
];

export default function ProfessionalPhotosPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true));
  }, []);

  const navigateImage = useCallback(
    (dir) => {
      if (selectedIndex === null) return;
      setSelectedIndex((selectedIndex + dir + photos.length) % photos.length);
    },
    [selectedIndex],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") navigateImage(1);
      if (e.key === "ArrowLeft") navigateImage(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, navigateImage]);

  return (
    <main className="flex-1 w-full bg-brandBlack min-h-screen text-white flex flex-col">
      {/* ── Page Title ── */}
      <div className="pt-10 pb-4 md:pb-10 px-4 md:px-10">
        <AnimatedHeading className="text-2xl md:text-5xl tracking-wide">
          Headshots & Photos
        </AnimatedHeading>
      </div>

      {/* ── Photo Grid ── */}
      <div className="px-3 md:px-6 lg:px-10 pb-32">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 70}ms, transform 0.6s ease ${i * 70}ms`,
              }}
            >
              {/* Image wrapper — natural aspect ratio via width/height */}
              <div className="relative w-full overflow-hidden bg-zinc-900">
                <Image
                  src={photo}
                  alt={`Professional Photo ${i + 1}`}
                  width={800}
                  height={i % 3 === 0 ? 1100 : i % 2 === 0 ? 800 : 1000}
                  unoptimized
                  className="w-full h-auto block transition-transform duration-800 ease-out group-hover:scale-[1.06]"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brandBlack/0 group-hover:bg-brandBlack/40 transition-all duration-500" />

                {/* Expand indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <div className="w-14 h-14 rounded-full bg-brandBlack/50 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-100 bg-brandBlack/95 backdrop-blur-xl flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
          style={{ animation: "lbFade 0.25s ease-out" }}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-6 z-110 text-white/40 hover:text-white transition-colors"
            onClick={() => setSelectedIndex(null)}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-110 w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/50 hover:text-white flex items-center justify-center transition-all"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next */}
          <button
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-110 w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/50 hover:text-white flex items-center justify-center transition-all"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative w-[88vw] h-[82vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "lbZoom 0.3s ease-out" }}
          >
            <Image
              key={selectedIndex}
              src={photos[selectedIndex]}
              alt={`Professional Photo ${selectedIndex + 1}`}
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-6 z-110">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? "w-6 h-1.5 bg-brandYellow"
                      : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <span className="text-white/30 text-[11px] font-mono tracking-wider">
              {selectedIndex + 1}/{photos.length}
            </span>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        @keyframes lbFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes lbZoom {
          from {
            opacity: 0;
            transform: scale(0.94);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}
