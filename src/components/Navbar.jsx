import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Menu, X, Code, ChevronDown, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  const navLinks = [
    { 
      name: 'Home', 
      href: '#' 
    },
    {
      name: 'Service',
      href: '#'
    },
    {
      name: 'Blog',
      href: '#'
    },
    {
      name: 'Page',
      href: '#',
      dropdownItems: [
        { name: 'Web Development', href: '#projects?category=web' },
        { name: 'UI/UX Design', href: '#projects?category=design' },
        { name: 'Mobile Apps', href: '#projects?category=mobile' }
      ]
    },
    {
      name: 'Contact',
      href: '#contact'
    },
  ];

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-mainBG backdrop-blur-sm shadow-md py-5' 
          : 'bg-transparent py-10'
      }`}
    >
      <div className="container mx-aut0">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-2xl font-bold text-gray-400"
          >
            <Code size={24} />
            <span>Nasir Uddin</span>
          </Link>

          {/* Desktop Navigation - Middle */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-10">
            <ul className="flex gap-14">
              {navLinks.map((link, index) => (
                <li key={link.name} className="relative" ref={dropdownRef}>
                  <div className="flex items-center">
                    <a 
                      href={link.href}
                      className="font-medium text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1 duration-300"
                      onClick={() => link.dropdownItems && toggleDropdown(index)}
                    >
                      {link.name}
                      {link.dropdownItems && (
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`}
                        />
                      )}
                    </a>
                    {link.dropdownItems && activeDropdown === index && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 animate-fade-in">
                        {link.dropdownItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-400 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section - Hire Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border border-gray-700 text-gray-300 hover:bg-blue-400/10 font-medium transition-colors flex items-center gap-2 duration-300"
            >
              Hire Me
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 shadow-lg animate-fade-in">
          <ul className="py-4 px-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <li key={link.name}>
                <div>
                  <button
                    className="w-full text-left py-2 font-medium text-gray-400 hover:text-blue-400 transition-colors flex items-center justify-between"
                    onClick={() => link.dropdownItems && toggleDropdown(index)}
                  >
                    {link.name}
                    {link.dropdownItems && (
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                  
                  {link.dropdownItems && activeDropdown === index && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-700">
                      {link.dropdownItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="block w-full text-center py-2.5 mt-4 rounded-full border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 font-medium transition-colors flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Hire Me
                <ArrowRight size={18} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;