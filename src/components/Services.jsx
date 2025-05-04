import { motion } from 'framer-motion';
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

  // Clone items for infinite loop
  const items = [...services, ...services, ...services];

  useEffect(() => {
    if (sliderRef.current) {
      // Set initial scroll position to show the middle set of items
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

        // If we reach the cloned end items, jump to original items without animation
        if (scrollPosition >= maxScroll - totalWidth) {
          sliderRef.current.style.scrollBehavior = 'auto';
          sliderRef.current.scrollLeft = totalWidth * services.length;
          sliderRef.current.style.scrollBehavior = 'smooth';
        }
        // If we reach the beginning, jump to cloned items without animation
        else if (scrollPosition <= totalWidth) {
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
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging]);

  // Mouse handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-32 bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-20">
          <p className="text-gray-400 text-lg mb-4">|| My Services</p>
          <h2 className="text-5xl font-serif text-white mb-8">
            Service Provide For My Clients.
          </h2>
        </div>

        <div className="overflow-hidden px-4">
          <div 
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto snap-none no-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {items.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={`${service.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="min-w-[350px] bg-gray-900/50 rounded-lg p-8 hover:bg-gray-900 transition-all duration-300 relative group overflow-hidden cursor-text select-none"
                >
                  {/* Decorative Circles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Top right circle */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-gray-700 rounded-full"></div>
                    {/* Center circle */}
                    <div className="absolute top-1/2 -right-16 w-24 h-24 border-2 border-gray-700 rounded-full transform -translate-y-1/2"></div>
                    {/* Bottom left circle */}
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-gray-700 rounded-full"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <Icon size={40} className="text-white" />
                    </div>
                    
                    <a 
                      href={`/services/${service.id}`} 
                      className="inline-block hover:text-blue-400 transition-colors"
                    >
                      <h3 className="text-2xl font-semibold text-white mb-8">
                        {service.title}
                      </h3>
                    </a>
                    
                    <ul className="space-y-4">
                      {service.skills.map((skill, index) => (
                        <li 
                          key={index}
                          className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                        >
                          <span className="text-sm">»</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;