import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { services } from '../constants';
import { 
  Code, 
  PenTool, 
  Layout, 
  Database, 
  Smartphone, 
  Settings,
  ArrowRight
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

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && sliderRef.current) {
        const cardWidth = 350;
        const gap = 32;
        sliderRef.current.scrollBy({
          left: cardWidth + gap,
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
    <section className="py-32 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-pink-500/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-12 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"></span>
            <span className="text-blue-400 text-lg tracking-wider">My Services</span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-blue-400 to-purple-400"></span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl font-serif text-white mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Crafting Exceptional Solutions for My Clients
          </motion.h2>
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
                  className="min-w-[350px] max-w-[350px] bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 hover:bg-gray-900/60 transition-all duration-300 relative group overflow-hidden"
                  style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* 3D Card Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gray-900/40 rounded-2xl"></div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-8 left-8 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-500"></div>
                  </div>

                  <div className="relative z-10">
                    <motion.div 
                      className="mb-6 inline-block p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={48} className="text-blue-400" />
                    </motion.div>
                    
                    <a 
                      href={`/services/${service.id}`} 
                      className="block group-hover:text-blue-400 transition-colors duration-300"
                    >
                      <h3 className="text-2xl font-semibold text-white mb-6 group-hover:translate-x-4 transition-transform duration-300">
                        {service.title}
                      </h3>
                    </a>
                    
                    <ul className="space-y-3">
                      {service.skills.map((skill, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 group/item"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-blue-400 group-hover/item:scale-150 transition-transform duration-300">•</span>
                          <span className="text-sm">{skill}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div 
                      className="mt-8 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Learn More</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
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
                  currentIndex === index 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-125' 
                    : 'bg-gray-600'
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