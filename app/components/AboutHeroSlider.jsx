"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const timelineData = [
  {
    id: 1,
    year: "2021",
    description:
      "Begins career at Daffodil Institute of IT (DIIT) as Assistant Officer in Creative & Digital Marketing, managing social media platforms and executing digital campaigns.",
    image: "/diit2020.jpg",
  },
  {
    id: 2,
    year: "2023",
    description:
      "Takes on a part-time role as Social Media Creative Designer at SurmaTechZone, designing visual assets and conducting audience engagement research.",
    image: "/surmatech.jpg",
  },
  {
    id: 3,
    year: "2024",
    description:
      "Joins Daffodil International University (DIU) as Full Stack Developer, building responsive web applications with React JS, Next JS, and Tailwind CSS for institutional platforms.",
    image: "/diu.jpg",
  },
  {
    id: 4,
    year: "2025",
    description:
      "Completes B.Sc. (Eng.) in Computer Science & Engineering from DIIT. Gains strong foundation in software engineering, algorithms, and modern web technologies.",
    image: "/graduation.jpg",
  },
  {
    id: 5,
    year: "2026",
    description:
      "Joins Betopia Group as Software Engineer and Executive, leading corporate website projects, digital branding, and web platform development across 22+ business units.",
    image: "/betopiagroup2.jpg",
  },
];

function TimelineCard({ item }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateYValue = ((x - centerX) / centerX) * 10; // Max 10 degrees

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative shrink-0 w-[90%] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] h-full snap-center group/card overflow-hidden pt-10 md:pt-4"
      style={{ perspective: "1000px" }}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
            : `rotateX(0deg) rotateY(0deg) scale(1)`,
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.year}
            fill
            className={`object-cover transition-all duration-700 ${isHovered ? "grayscale-0" : "grayscale"}`}
            priority={item.id <= 3}
          />
        </div>

        {/* Overlay Gradient */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-brandBlack via-brandBlack/20 to-transparent transition-opacity duration-500 pointer-events-none ${isHovered ? "opacity-90" : "opacity-80"}`}
        />

        {/* Content */}
        <div
          className={`absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-12 lg:p-16 w-full text-white pointer-events-none z-10 transition-all duration-500 ${isHovered ? "-translate-y-4" : "translate-y-0"}`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl uppercase drop-shadow-2xl mb-2 sm:mb-4">
            {item.year}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-serif text-gray-300 leading-relaxed max-w-lg drop-shadow-lg">
            {item.description}
          </p>
        </div>

        {/* Subtle card-hover highlight */}
        <div
          className={`absolute inset-0 border border-white/0 transition-all duration-300 pointer-events-none ${isHovered ? "border-white/20" : ""}`}
        />
      </div>
    </div>
  );
}

export default function AboutHeroSlider() {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const autoScrollRef = useRef(null);
  const isPausedRef = useRef(false);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-scroll marquee on mobile
  useEffect(() => {
    if (!isMobile) {
      // Clear any existing auto-scroll if switching to desktop
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    const slider = sliderRef.current;
    if (!slider) return;

    let currentIndex = 0;
    const totalCards = timelineData.length;

    autoScrollRef.current = setInterval(() => {
      if (isPausedRef.current || !sliderRef.current) return;

      currentIndex++;
      if (currentIndex >= totalCards) {
        currentIndex = 0;
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardNode = sliderRef.current.children[currentIndex];
        if (cardNode) {
          sliderRef.current.scrollTo({
            left: cardNode.offsetLeft,
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    // Pause on touch
    const handleTouchStart = () => {
      isPausedRef.current = true;
    };
    const handleTouchEnd = () => {
      setTimeout(() => {
        isPausedRef.current = false;
      }, 4000);
    };

    // Sync currentIndex when user manually scrolls
    const handleScroll = () => {
      if (isPausedRef.current && sliderRef.current) {
        const cardWidth =
          sliderRef.current.firstElementChild?.offsetWidth ||
          sliderRef.current.clientWidth;
        currentIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
      }
    };

    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchend", handleTouchEnd, { passive: true });
    slider.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchend", handleTouchEnd);
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      checkScroll();
      slider.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (slider) {
        slider.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, []);

  const scrollRight = () => {
    if (sliderRef.current) {
      isPausedRef.current = true;
      const scrollAmount =
        sliderRef.current.firstElementChild?.clientWidth || 600;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(() => {
        isPausedRef.current = false;
      }, 4000);
    }
  };

  const scrollLeftBtn = () => {
    if (sliderRef.current) {
      isPausedRef.current = true;
      const scrollAmount =
        sliderRef.current.firstElementChild?.clientWidth || 600;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(() => {
        isPausedRef.current = false;
      }, 4000);
    }
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden bg-brandBlack h-[50vh] sm:h-[60vh] md:h-[70vh] group box-border">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={scrollLeftBtn}
          className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-brandBlack/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-brandBlack hover:scale-110 transition-all md:opacity-0 md:group-hover:opacity-100 cursor-pointer shadow-2xl"
          aria-label="Scroll Left"
        >
          <FaArrowLeft className="text-base sm:text-lg md:text-2xl" />
        </button>
      )}

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex h-full overflow-x-auto snap-x snap-mandatory gap-4 md:gap-3 lg:gap-5 px-[5%] md:px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollBehavior: "smooth" }}
      >
        {timelineData.map((item) => (
          <TimelineCard key={item.id} item={item} />
        ))}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-brandBlack/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-brandBlack hover:scale-110 transition-all md:opacity-0 md:group-hover:opacity-100 cursor-pointer shadow-2xl"
          aria-label="Scroll Right"
        >
          <FaArrowRight className="text-base sm:text-lg md:text-2xl" />
        </button>
      )}
    </div>
  );
}
