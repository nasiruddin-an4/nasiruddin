import { Link } from 'react-router-dom';
import { Code, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and brief */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              <Code size={24} />
              <span>Nasir Uddin</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Frontend developer specializing in creating beautiful, responsive, and user-friendly websites 
              and applications using modern technologies.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:contact@example.com" aria-label="Email"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a></li>
              <li><a href="#experience" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</a></li>
              <li><a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <a 
              href="#contact" 
              className="btn btn-primary"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>© {currentYear} Nasir Uddin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;