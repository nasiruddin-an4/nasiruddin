import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Nasir Uddin</span>
            </h1>
            <h2 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-6">
              Frontend Developer & UI/UX Designer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-lg">
              I specialize in creating beautiful, responsive websites and applications
              with modern technologies. Let's work together to bring your ideas to life.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="btn btn-primary"
              >
                Get in Touch
                <ArrowRight size={18} />
              </a>
              <a 
                href="#" 
                className="btn btn-secondary"
              >
                Download CV
                <Download size={18} />
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              <div className="aspect-square rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400 shadow-xl animate-float">
                <img 
                  src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Nasir Uddin" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg font-semibold text-blue-600 dark:text-blue-400">
                5+ Years Experience
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;