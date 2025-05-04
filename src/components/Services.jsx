import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Code, Layout, Palette, Globe, Server, Users } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Building modern, responsive websites and web applications using the latest technologies and best practices.',
    icon: Code,
    features: [
      'Custom Website Development',
      'Web Application Development',
      'E-commerce Solutions',
      'Website Maintenance'
    ]
  },
  {
    id: 2,
    title: 'Frontend Development',
    description: 'Creating beautiful, interactive user interfaces with modern frameworks and libraries.',
    icon: Layout,
    features: [
      'React/Next.js Development',
      'Responsive Design',
      'Performance Optimization',
      'Cross-browser Compatibility'
    ]
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'Designing intuitive and engaging user experiences that delight your customers.',
    icon: Palette,
    features: [
      'User Interface Design',
      'User Experience Design',
      'Wireframing & Prototyping',
      'Design Systems'
    ]
  },
  {
    id: 4,
    title: 'Backend Development',
    description: 'Building robust server-side applications and APIs to power your web applications.',
    icon: Server,
    features: [
      'API Development',
      'Database Design',
      'Server Configuration',
      'Performance Optimization'
    ]
  },
  {
    id: 5,
    title: 'Consulting',
    description: 'Providing expert advice and guidance for your web development projects.',
    icon: Users,
    features: [
      'Technical Consultation',
      'Code Review',
      'Architecture Planning',
      'Team Training'
    ]
  },
  {
    id: 6,
    title: 'Web Performance',
    description: 'Optimizing your web applications for speed, performance, and user experience.',
    icon: Globe,
    features: [
      'Performance Auditing',
      'Speed Optimization',
      'SEO Optimization',
      'Core Web Vitals'
    ]
  }
];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentServices = services.slice(
    currentIndex * itemsPerPage,
    (currentIndex * itemsPerPage) + itemsPerPage
  );

  return (
    <section className="py-20 bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">My Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive web development and design solutions tailored to your needs
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300"
                >
                  <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400 w-fit mb-6">
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;