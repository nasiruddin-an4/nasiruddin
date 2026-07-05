"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const photos = [
  "/ab4.jpg",
  "/ab5.jpg",
  "/abdulla-1.jpg",
  "/abdullah2.jpg",
  "/heroBG.jpeg",
  "/heroBG.jpeg",
  "/heroBG.jpeg",
  "/heroBG.jpeg",
];

export default function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isEntered, setIsEntered] = useState(false);

  // Stagger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Navigate in lightbox
  const navigateImage = useCallback(
    (direction) => {
      if (selectedIndex === null) return;
      const nextIdx =
        (selectedIndex + direction + photos.length) % photos.length;
      setSelectedIndex(nextIdx);
    },
    [selectedIndex],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") navigateImage(1);
      if (e.key === "ArrowLeft") navigateImage(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, navigateImage]);

  return (
    <>
      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-6 md:px-12 lg:px-16">
        {photos.map((src, i) => (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`relative aspect-4/5 overflow-hidden cursor-pointer group rounded-sm transition-all duration-600 ease-out ${
              isEntered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <Image
              src={src}
              alt={`Professional Photo ${i + 1}`}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brandBlack/0 group-hover:bg-brandBlack/40 transition-colors duration-400 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/15">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
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

      {/* Fullscreen Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-brandBlack/95 backdrop-blur-md"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-8 text-white/50 hover:text-white transition-colors z-110"
            onClick={() => setSelectedIndex(null)}
          >
            <svg
              width="32"
              height="32"
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

          {/* Left Arrow */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all z-110"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all z-110"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono tracking-widest z-110">
            {selectedIndex + 1} / {photos.length}
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-110">
            {photos.map((src, i) => (
              <button
                key={`lb-thumb-${i}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(i);
                }}
                className={`relative w-10 h-10 rounded-sm overflow-hidden transition-all duration-200 ${
                  i === selectedIndex
                    ? "ring-1 ring-brandYellow opacity-100 scale-110"
                    : "opacity-30 hover:opacity-70"
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumb ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div
            className="relative w-[85vw] h-[75vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeInScale 0.25s ease-out" }}
          >
            <Image
              key={selectedIndex}
              src={photos[selectedIndex]}
              alt="Fullscreen Photo"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
