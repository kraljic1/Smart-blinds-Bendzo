import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { BasketIcon } from './Basket/BasketIcon';
import { X, Menu, ChevronRight, Sun, Moon, Home, ShoppingBag, HelpCircle, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const { isDark, toggle } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // When menu is open, prevent scrolling on the body
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Handle closing the menu
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Check if a route is active
  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Navigation items
  const navItems = [
    { label: 'Roller Blinds', path: '/products/roller-blinds', icon: <Home size={16} /> },
    { label: 'Zebra Blinds', path: '/products/zebra-blinds', icon: <Home size={16} /> },
    { label: 'Curtain Blinds', path: '/products/curtain-blinds', icon: <Home size={16} /> },
    { label: 'Accessories', path: '/products/accessories', icon: <ShoppingBag size={16} /> },
    { label: 'How It Works', path: '/how-it-works', icon: <HelpCircle size={16} /> },
    { label: 'Support', path: '/support', icon: <Settings size={16} /> },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
        : 'bg-white/80 dark:bg-transparent backdrop-blur-md border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`flex items-center transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              <div className="relative px-3 py-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-sm"></div>
                <span className="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Smartblinds
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="relative px-2 py-1 rounded-full backdrop-blur-sm bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 flex items-center space-x-1">
              {navItems.map((item, index) => {
                const isActive = isActiveRoute(item.path);
                
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium nav-font transition-all duration-300 flex items-center group ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : scrolled
                          ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                          : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-white'
                    }`}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Active/hover background */}
                    {(isActive || hoverIndex === index) && (
                      <span 
                        className={`absolute inset-0 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-white/90 dark:bg-gray-800/90 shadow-md'
                            : 'bg-white/20 dark:bg-gray-700/20'
                        }`}
                      ></span>
                    )}
                    
                    {/* Bottom indicator line for active state */}
                    {isActive && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
                        <div className="w-1 h-1 rounded-full bg-blue-600"></div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Basket Icon */}
            <div className={`relative transition-all duration-300 ${
              scrolled 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-900 dark:text-white'
            }`}>
              <BasketIcon />
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggle}
              className={`group p-2 rounded-full transition-colors duration-300 relative ${
                scrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  : 'bg-gray-100 dark:bg-gray-800/30 text-gray-800 dark:text-gray-200'
              }`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isDark ? (
                <Sun className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              ) : (
                <Moon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className={`group p-2 rounded-full relative ${
                  scrolled
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    : 'bg-gray-100 dark:bg-gray-800/30 text-gray-800 dark:text-gray-200'
                }`}
                aria-expanded={isMenuOpen}
              >
                <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open main menu'}</span>
                {isMenuOpen ? (
                  <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                ) : (
                  <Menu className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-all duration-500 lg:hidden ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleCloseMenu}
      >
        <div 
          className={`absolute inset-y-0 right-0 max-w-sm w-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full pt-20 pb-6 px-6">
            <button
              onClick={handleCloseMenu}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col space-y-1 flex-1">
              {navItems.map((item, index) => {
                const isActive = isActiveRoute(item.path);
                
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={`group px-4 py-3 rounded-xl flex items-center transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={handleCloseMenu}
                  >
                    <div className={`mr-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {item.icon}
                    </div>
                    <span className="font-medium text-base nav-font">{item.label}</span>
                    <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700/30">
              <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
                <span>© {new Date().getFullYear()} Smartblinds</span>
                <button 
                  onClick={toggle} 
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 