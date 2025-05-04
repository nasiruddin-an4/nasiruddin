import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../constants';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-32 bg-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-blue-400 text-lg mb-4 tracking-wider"
          >
            || CLIENT TESTIMONIALS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-serif text-white mb-8"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
            {/* Quote decoration */}
            <div className="absolute top-0 right-0 -mt-8 mr-8 transform rotate-12">
              <Quote size={64} className="text-blue-500/10" />
            </div>
            <div className="absolute bottom-0 left-0 -mb-8 ml-8 transform -rotate-12">
              <Quote size={48} className="text-purple-500/10" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="text-center relative z-10"
              >
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-blue-500/20 ring-4 ring-blue-500/10 shadow-xl">
                    <img
                      src={testimonialsData[currentIndex].image}
                      alt={testimonialsData[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {testimonialsData[currentIndex].name}
                  </h3>
                  <p className="text-blue-400 text-sm font-medium mb-6">
                    {testimonialsData[currentIndex].role} • {testimonialsData[currentIndex].company}
                  </p>
                </div>

                <p className="text-gray-300 text-lg md:text-xl mb-8 italic leading-relaxed max-w-2xl mx-auto">
                  "{testimonialsData[currentIndex].content}"
                </p>

                <div className="flex justify-center gap-2">
                  {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={24} className="fill-yellow-500 text-yellow-400 filter drop-shadow" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
              <button
                onClick={handlePrevious}
                className="p-3 rounded-full bg-gray-800/80 text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-gray-800/80 text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-8 bg-blue-500 shadow-lg shadow-blue-500/30' 
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;