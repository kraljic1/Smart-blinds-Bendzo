import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BasketIcon } from './Basket/BasketIcon';
import { LikedIcon } from './Liked/LikedIcon';
import { Menu, X, Home, ShoppingBag, HelpCircle, Settings } from 'lucide-react';
import MobileMenuWrapper from './MobileMenuWrapper';
import BlackOverlay from './BlackOverlay';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
      
      // Check for and clean up any leftover elements when scrolling
      // This helps prevent the white square issue
      if (!isMenuOpen) {
        const existingPanel = document.getElementById('mobile-menu-panel');
        const existingOverlay = document.getElementById('pure-black-overlay');
        
        if (existingPanel || existingOverlay) {
          // If we find orphaned elements when menu is closed, clean them up
          if (existingPanel && existingPanel.parentNode) {
            existingPanel.parentNode.removeChild(existingPanel);
          }
          
          if (existingOverlay && existingOverlay.parentNode) {
            existingOverlay.parentNode.removeChild(existingOverlay);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

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
            {/* Liked Icon */}
            <div className={`relative transition-all duration-300 ${
              scrolled 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-900 dark:text-white'
            }`}>
              <LikedIcon />
            </div>
            
            {/* Basket Icon */}
            <div className={`relative transition-all duration-300 ${
              scrolled 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-900 dark:text-white'
            }`}>
              <BasketIcon />
            </div>
            
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
      <BlackOverlay isOpen={isMenuOpen} onClose={handleCloseMenu} />
      <MobileMenuWrapper isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </header>
  );
};

export default Header; 