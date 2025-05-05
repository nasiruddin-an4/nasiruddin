import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Menu, X, Code, ChevronDown, ArrowRight, 
  Monitor, Database, Layers, Paintbrush,
  Lightbulb, FileCode, Bell, User,
  FolderGit, Code2, Briefcase
} from 'lucide-react';
import { navLinks } from '../constants';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  const { mainNav } = navLinks;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        isScrolled 
          ? 'bg-gray-800/95 backdrop-blur-sm shadow-md py-3 sm:py-4 lg:py-5' 
          : 'bg-transparent py-6 sm:py-8 lg:py-10'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link 
            to="/" 
            className="flex items-center gap-1 sm:gap-2 text-xl sm:text-2xl font-bold text-gray-400"
          >
            <Code size={20} className="sm:w-6 sm:h-6" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Nasir Uddin
            </span>
          </Link>

          {/* Desktop Navigation - Middle */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-10">
            <ul className="flex gap-14">
              {mainNav.map((link, index) => (
                <li key={link.name} className="relative group" ref={dropdownRef}>
                  <Link 
                    to={link.href}
                    className="font-medium text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1 duration-300 py-2"
                  >
                    {link.name}
                    {link.dropdownItems && (
                      <ChevronDown 
                        size={16} 
                        className="transition-transform group-hover:rotate-180"
                      />
                    )}
                  </Link>
                  {link.dropdownItems && (
                    <div className="absolute top-full -left-5 mt-2 min-w-[230px] bg-mainBG rounded-md shadow-lg 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                      transition-all duration-300 ease-out
                      origin-top transform 
                      scale-y-0 group-hover:scale-y-100">
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center px-5 py-3 text-[15px] text-gray-400 hover:text-gray-100 
                            border-b border-gray-700 last:border-none
                            transition-colors first:animate-slideDown"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section - Hire Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full border border-gray-700 text-gray-300 hover:bg-blue-400/10 font-medium transition-colors flex items-center gap-2 duration-300"
            >
              Hire Me
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={20} className="text-gray-300" />
              ) : (
                <Menu size={20} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm shadow-lg animate-fade-in border-t border-gray-800">
          <ul className="py-4 px-4 sm:px-6 flex flex-col gap-2">
            {mainNav.map((link, index) => (
              <li key={link.name}>
                <div>
                  <button
                    className="w-full text-left py-3 font-medium text-gray-400 hover:text-blue-400 transition-colors flex items-center justify-between"
                    onClick={() => link.dropdownItems && toggleDropdown(index)}
                  >
                    {link.name}
                    {link.dropdownItems && (
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                  
                  {link.dropdownItems && activeDropdown === index && (
                    <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-700">
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block py-2.5 text-sm text-gray-300 hover:text-blue-400 transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="block w-full text-center py-3 mt-4 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-400/10 font-medium transition-colors flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Hire Me
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;