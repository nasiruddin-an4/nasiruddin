import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-3"
            >
              <Code size={28} className="text-blue-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Nasir Uddin
              </span>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {currentYear} Nasir Uddin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;