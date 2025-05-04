import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive'; // Add this import
import { 
  Download, 
  Facebook, 
  Settings, 
  Linkedin,
  Paintbrush 
} from 'lucide-react';

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Add responsive hook

  return (
    <section className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto relative z-10 h-screen px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 h-full relative pt-20 lg:pt-0">
          {/* Left Content */}
          <motion.div 
            className="w-full lg:w-[55%] flex flex-col justify-center text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif">
              Hello! I'm <br />
              <p className="font-bold mt-3 lg:mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
                Nasir Uddin
              </p>
            </h2>
            <p className="text-gray-400 mb-6 lg:mb-8 max-w-2xl text-sm sm:text-md mt-4 lg:mt-5 mx-auto lg:mx-0">
              Frontend Developer specializing in React & Modern Web Technologies.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <a 
                href="/resume.pdf" 
                className="px-6 sm:px-8 py-3 sm:py-4 text-gray-400 rounded-full flex items-center gap-2 hover:bg-gray-800 hover:text-gray-300 transition-colors border border-gray-700 duration-300 text-sm sm:text-base"
              >
                Get Resume <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            className="w-full lg:w-[45%] relative lg:absolute lg:bottom-0 lg:right-0 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="public/nasiruddin.png" 
              alt="Professional portrait" 
              className="w-full max-w-md lg:max-w-2xl mx-auto"
            />
          </motion.div>
        </div>
      </div>


      {/* Background Elements - Adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500 rounded-full filter blur-[100px] sm:blur-[150px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500 rounded-full filter blur-[100px] sm:blur-[150px] opacity-20"></div>
      </div>
    </section>
  );
};

export default Hero;