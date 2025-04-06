import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { BasketIcon } from './Basket/BasketIcon';
import { X, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { isDark, toggle } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // When menu is open, prevent scrolling on the body
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Navigation link style with enhanced hover effects
  const navLinkStyle = "px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative group nav-font";
  const mobileNavLinkStyle = "block w-full px-3 py-4 text-xl font-medium text-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 nav-font";
  const tabletNavLinkStyle = "block px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 nav-font";

  // Handle closing the menu
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                Smartblinds Croatia
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4">
              <Link to="/products/roller-blinds" className={navLinkStyle}>
                Roller Blinds
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-200"></span>
              </Link>
              <Link to="/products/zebra-blinds" className={navLinkStyle}>
                Zebra Blinds
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-200"></span>
              </Link>
              <Link to="/products/curtain-blinds" className={navLinkStyle}>
                Curtain Blinds
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-200"></span>
              </Link>
              <Link to="/products/accessories" className={navLinkStyle}>
                Accessories
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-200"></span>
              </Link>
              <Link to="/how-it-works" className={navLinkStyle}>
                How It Works
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-200"></span>
              </Link>
              <Link to="/support" className={navLinkStyle}>
                Support
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-200"></span>
              </Link>
            </nav>
            
            {/* Tablet Navigation */}
            <nav className="hidden md:ml-4 md:flex lg:hidden tablet-nav items-center">
              <Link to="/products/roller-blinds" className={tabletNavLinkStyle}>
                Roller
              </Link>
              <Link to="/products/zebra-blinds" className={tabletNavLinkStyle}>
                Zebra
              </Link>
              <Link to="/products/curtain-blinds" className={tabletNavLinkStyle}>
                Curtain
              </Link>
              <Link to="/products/accessories" className={tabletNavLinkStyle}>
                Accessories
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <BasketIcon />
            
            <button 
              onClick={toggle}
              className="ml-3 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* Mobile Menu Button - Now only shown on mobile, not tablet */}
            <div className="ml-3 md:hidden relative z-50">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open main menu'}</span>
                <Menu className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} />
              </button>
            </div>
            
            {/* More menu for tablet - shows additional links */}
            <div className="hidden md:block lg:hidden ml-2">
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">{isMenuOpen ? 'Close menu' : 'More'}</span>
                  <Menu className={`${isMenuOpen ? 'hidden' : 'block'} h-5 w-5`} />
                  <X className={`${isMenuOpen ? 'block' : 'hidden'} h-5 w-5`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full overlay menu system */}
      {isMenuOpen && (
        <>
          {/* Completely opaque background overlay */}
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-90 dark:bg-gray-900 z-40" 
            onClick={handleCloseMenu}
          />
          
          {/* Menu content - adjusted for both mobile and tablet */}
          <div 
            className="fixed inset-0 pt-16 z-40 sm:hidden flex flex-col items-center justify-center text-center"
          >
            {/* Dedicated close button for mobile */}
            <button
              onClick={handleCloseMenu}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          
            <div className="flex flex-col items-center w-full space-y-2">
              <Link 
                to="/products/roller-blinds"
                className={mobileNavLinkStyle}
                onClick={handleCloseMenu}
              >
                Roller Blinds
              </Link>
              <Link 
                to="/products/zebra-blinds"
                className={mobileNavLinkStyle}
                onClick={handleCloseMenu}
              >
                Zebra Blinds
              </Link>
              <Link 
                to="/products/curtain-blinds"
                className={mobileNavLinkStyle}
                onClick={handleCloseMenu}
              >
                Curtain Blinds
              </Link>
              <Link 
                to="/products/accessories"
                className={mobileNavLinkStyle}
                onClick={handleCloseMenu}
              >
                Accessories
              </Link>
              <Link 
                to="/how-it-works"
                className={mobileNavLinkStyle}
                onClick={handleCloseMenu}
              >
                How It Works
              </Link>
              <Link 
                to="/support"
                className={mobileNavLinkStyle}
                onClick={handleCloseMenu}
              >
                Support
              </Link>
              <Link 
                to="/basket"
                className={mobileNavLinkStyle}
                onClick={handleCloseMenu}
              >
                Basket
              </Link>
            </div>
          </div>
          
          {/* Tablet dropdown menu */}
          {isMenuOpen && (
            <div className="hidden md:block lg:hidden absolute right-0 top-16 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
              <Link 
                to="/how-it-works"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleCloseMenu}
              >
                How It Works
              </Link>
              <Link 
                to="/support"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleCloseMenu}
              >
                Support
              </Link>
              <Link 
                to="/basket"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleCloseMenu}
              >
                Basket
              </Link>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header; 