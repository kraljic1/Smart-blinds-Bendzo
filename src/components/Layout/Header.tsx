import React from 'react';
import { useHeaderEffects } from './hooks/useHeaderEffects';
import { HeaderLogo, DesktopNavigation, HeaderActions } from './Header/index';
import { MobileMenuWrapper } from '../Navigation';

const Header: React.FC = () => {
  const {
    scrolled,
    isMobile,
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu
  } = useHeaderEffects();

  return (
    <>
      <header className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-white/80 dark:bg-transparent backdrop-blur-md border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <HeaderLogo scrolled={scrolled} />
            <DesktopNavigation scrolled={scrolled} />
            <HeaderActions 
              scrolled={scrolled}
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Menu - Only render on mobile devices */}
      {isMobile && (
        <MobileMenuWrapper 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />
      )}
    </>
  );
};

export default Header; 