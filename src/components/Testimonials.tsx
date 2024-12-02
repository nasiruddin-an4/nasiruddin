import React, { useEffect, useRef } from 'react';
import { TestimonialCard } from './TestimonialCard';
import { testimonials } from '../data/testimonials';

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(scroll, 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-400 mb-8 text-center">
          What People Say
        </h2>
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden"
        >
          {/* Double the testimonials for seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}