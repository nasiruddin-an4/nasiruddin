import { motion } from 'framer-motion';
import { BadgeCheck, Code, Palette, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          My background, experience, and what drives me as a developer
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3931553/pexels-photo-3931553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Nasir working on a computer" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <img 
                  src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Working on code" 
                  className="w-40 h-40 object-cover rounded"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Frontend Developer with a passion for creating beautiful user experiences
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm a frontend developer with a Computer Science & Engineering background and a strong 
              passion for creating beautiful, functional, and user-centered digital experiences.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Computer Science Background</h4>
                  <p className="text-gray-600 dark:text-gray-400">Solid foundation in algorithms, data structures, and software engineering principles</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Code size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Frontend Development</h4>
                  <p className="text-gray-600 dark:text-gray-400">Expertise in modern frameworks and libraries like React, and UI tools like Tailwind CSS</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Palette size={20} />
                </div>
                <div>
                  <h4 className="font-medium">UI/UX Design</h4>
                  <p className="text-gray-600 dark:text-gray-400">Skilled in creating intuitive interfaces with tools like Figma and Canva</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <BadgeCheck size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Problem Solver</h4>
                  <p className="text-gray-600 dark:text-gray-400">Passionate about finding elegant solutions to complex problems</p>
                </div>
              </div>
            </div>
            
            <a href="#contact" className="btn btn-primary">
              Let's Connect
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;