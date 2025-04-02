import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { BasketIcon } from './Basket/BasketIcon';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
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

  // Navigation link style with nav-font class for typography
  const navLinkStyle = "px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white nav-font";
  const mobileNavLinkStyle = "block w-full px-3 py-4 text-xl font-medium text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white nav-font";

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
                Smartblinds
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <Link to="/products/roller-blinds" className={navLinkStyle}>
                Roller Blinds
              </Link>
              <Link to="/products/zebra-blinds" className={navLinkStyle}>
                Zebra Blinds
              </Link>
              <Link to="/products/curtain-blinds" className={navLinkStyle}>
                Curtain Blinds
              </Link>
              <Link to="/products/accessories" className={navLinkStyle}>
                Accessories
              </Link>
              <Link to="/how-it-works" className={navLinkStyle}>
                How It Works
              </Link>
              <Link to="/support" className={navLinkStyle}>
                Support
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <BasketIcon />
            
            <button 
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1
0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <div className="ml-3 sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white z-50"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full overlay menu system */}
      {isMenuOpen && (
        <>
          {/* Completely opaque background overlay */}
          <div 
            className="fixed inset-0 bg-gray-900 dark:bg-gray-900 z-40" 
            onClick={handleCloseMenu}
          />
          
          {/* Menu content */}
          <div 
            className="fixed inset-0 pt-16 z-40 sm:hidden flex flex-col items-center justify-center text-center"
          >
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
        </>
      )}
    </header>
  );
};

export default Header; 