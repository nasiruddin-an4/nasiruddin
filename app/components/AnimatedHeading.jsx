"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedHeading({
  children,
  className = "text-3xl md:text-5xl",
  initialColor = "text-brandBlack",
  finalColor = "text-brandBlack",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div className="inline-block" ref={ref}>
      <div className="relative px-4 py-1 inline-block overflow-hidden">
        <div
          className={`absolute inset-0 bg-[#fceb3b] transition-transform duration-1000 ease-out origin-left ${isVisible ? "scale-x-100" : "scale-x-0"}`}
        />
        <h2
          className={`relative z-10 uppercase transition-colors duration-700 delay-300 ${isVisible ? finalColor : initialColor} ${className}`}
        >
          {children}
        </h2>
      </div>
    </div>
  );
}
