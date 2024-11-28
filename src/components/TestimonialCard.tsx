import React from 'react';
import { Testimonial } from '../types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-[350px] flex-shrink-0 mx-4">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{testimonial.content}</p>
      </div>
    </div>
  );
}