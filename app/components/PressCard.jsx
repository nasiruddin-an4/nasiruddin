"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

export default function PressCard({ article }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      href={`/news/${article.id}`}
      ref={cardRef}
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-col flex-1">
        {/* Image Container */}
        <div className="relative w-full aspect-video mb-6 overflow-hidden">
          <Image
            src={article.image}
            alt={article.alt}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-1 pr-6 z-10">
          <p className="text-white text-xl mb-2">{article.category}</p>
          <h3 className="text-xl md:text-3xl group-hover:text-gray-300 transition-colors duration-300 line-clamp-4">
            {article.title}
          </h3>
        </div>
      </div>

      {/* Yellow Read Circle (Follows mouse) */}
      <div
        className="pointer-events-none absolute w-24 h-24 bg-brandYellow rounded-full flex items-center justify-center text-brandBlack text-xl z-50"
        style={{
          opacity: isHovered ? 1 : 0,
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform:
            "translate(-50%, -50%) scale(" + (isHovered ? 1 : 0.5) + ")",
          transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        }}
      >
        READ
      </div>
    </Link>
  );
}
