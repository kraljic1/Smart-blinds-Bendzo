import React, { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/products', label: 'Products' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/support', label: 'Support' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 border-b transition-all duration-300 ${
      isAtTop 
        ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-lg' 
        : 'bg-white dark:bg-gray-900/95 backdrop-blur-sm border-gray-100 dark:border-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0 font-bold text-2xl text-blue-600 dark:text-blue-400 relative">
            <span className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/20 blur-md rounded-lg"></span>
            <span className="relative">SmartBlinds</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActive(link.path)
                    ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-md relative'
                    : 'text-gray-900 dark:text-gray-300 font-semibold bg-gray-50 dark:bg-gray-800/50 px-3 py-1 rounded-md hover:text-blue-600 dark:hover:text-blue-400'
                } transition flex items-center gap-2`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-3 pb-4 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  isActive(link.path)
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold'
                    : 'bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;