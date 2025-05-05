import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { services } from '../constants';
import { 
  Code, 
  PenTool, 
  Layout, 
  Database, 
  Smartphone, 
  Settings 
} from 'lucide-react';

const iconMap = {
  Code: Code,
  PenTool: PenTool,
  Layout: Layout,
  Database: Database,
  Smartphone: Smartphone,
  Settings: Settings
};

const Services = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Clone items for infinite loop
  const items = [...services, ...services, ...services];

  // Calculate items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1280) setItemsPerView(3);
      else if (width >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Set initial scroll position
  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = 350;
      const gap = 32;
      const initialScroll = services.length * (cardWidth + gap);
      sliderRef.current.scrollLeft = initialScroll;
    }
  }, []);

  // Infinite scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const cardWidth = 350;
        const gap = 32;
        const totalWidth = cardWidth + gap;
        const scrollPosition = sliderRef.current.scrollLeft;
        const maxScroll = totalWidth * services.length * 2;

        // Update current index for dots
        const newIndex = Math.round(scrollPosition / totalWidth) % services.length;
        setCurrentIndex(newIndex);

        // Handle infinite scroll
        if (scrollPosition >= maxScroll - totalWidth) {
          sliderRef.current.style.scrollBehavior = 'auto';
          sliderRef.current.scrollLeft = totalWidth * services.length;
          sliderRef.current.style.scrollBehavior = 'smooth';
        } else if (scrollPosition <= totalWidth) {
          sliderRef.current.style.scrollBehavior = 'auto';
          sliderRef.current.scrollLeft = maxScroll - totalWidth * 2;
          sliderRef.current.style.scrollBehavior = 'smooth';
        }
      }
    };

    sliderRef.current?.addEventListener('scroll', handleScroll);
    return () => sliderRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoplay functionality - slide one card at a time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && sliderRef.current) {
        const cardWidth = 350;
        const gap = 32;
        sliderRef.current.scrollBy({
          left: cardWidth + gap, // Move one card at a time
          behavior: 'smooth'
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  // Mouse and touch handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    const pageX = e.pageX || e.touches[0].pageX;
    setStartX(pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    const x = pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Navigate to specific slide
  const goToSlide = (index) => {
    if (sliderRef.current) {
      const cardWidth = 350;
      const gap = 32;
      const totalWidth = cardWidth + gap;
      const targetScroll = totalWidth * (index + services.length);
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-32 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-blue-400 text-lg mb-4 tracking-wider">
            || My Services
          </p>
          <h2 className="text-5xl font-serif text-white mb-8 leading-tight">
            Crafting Exceptional Solutions for My Clients
          </h2>
        </motion.div>

        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-text active:cursor-grabbing select-none"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {items.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={`${service.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % services.length) * 0.1 }}
                  className="min-w-[350px] max-w-[350px] bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-900 transition-all duration-300 relative group overflow-hidden shadow-xl"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  {/* Floating Particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-8 left-8 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                  </div>

                  <div className="relative z-10">
                    <motion.div 
                      className="mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={48} className="text-blue-400" />
                    </motion.div>
                    
                    <a 
                      href={`/services/${service.id}`} 
                      className="inline-block hover:text-blue-400 transition-colors duration-300"
                    >
                      <h3 className="text-2xl font-semibold text-white mb-6">
                        {service.title}
                      </h3>
                    </a>
                    
                    <ul className="space-y-3">
                      {service.skills.map((skill, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-blue-400">•</span>
                          <span className="text-sm">{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-blue-400 scale-125' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;