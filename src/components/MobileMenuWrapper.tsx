import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileMenuWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuWrapper: React.FC<MobileMenuWrapperProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [animationReady, setAnimationReady] = useState(false);
  
  // Set up animation timing
  useEffect(() => {
    if (isOpen) {
      // Shorter delay for snappier animations
      const timer = setTimeout(() => {
        setAnimationReady(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setAnimationReady(false);
    }
  }, [isOpen]);

  // Menu items data with modern icons
  const menuItems = [
    { 
      path: '/products/roller-blinds', 
      label: 'Roller Blinds',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3H21V7.5H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 7.5H21V21H3V7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 13.5L12 16.5L15 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    { 
      path: '/products/zebra-blinds', 
      label: 'Zebra Blinds',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3H21V7.5H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 7.5H21V12H3V7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12H21V16.5H3V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 16.5H21V21H3V16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    { 
      path: '/products/curtain-blinds', 
      label: 'Curtain Blinds',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3V21M18 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 4C6 4 9 8 12 8C15 8 18 4 18 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 21C6 21 9 16 12 16C15 16 18 21 18 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    { 
      path: '/products/accessories', 
      label: 'Accessories',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10H3M16 2V6M8 2V6M6.8 22H17.2C18.8802 22 19.7202 22 20.362 21.673C20.9265 21.3854 21.3854 20.9265 21.673 20.362C22 19.7202 22 18.8802 22 17.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V17.2C2 18.8802 2 19.7202 2.32698 20.362C2.6146 20.9265 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    { 
      path: '/how-it-works', 
      label: 'How It Works',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    { 
      path: '/support', 
      label: 'Support',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12V12.01M12 16V16.01M18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604C9.15076 2.12132 14.8492 2.12132 18.364 5.63604" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    }
  ];

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`w-[350px] max-w-[90%] h-full fixed right-0 top-0 bottom-0 z-[60] flex flex-col p-8 pt-24 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-2xl rounded-l-3xl overflow-y-auto transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* Close button */}
        <button
          className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            isOpen && animationReady ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          } ${
            isDark ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-gray-100/80 hover:bg-gray-200/80'
          } ${
            isDark ? 'text-white' : 'text-gray-900'
          } backdrop-blur ${
            isDark ? 'shadow-md shadow-black/20' : 'shadow-md shadow-gray-200/60'
          }`}
          onClick={onClose}
          aria-label="Close menu"
          style={{ transitionDelay: '80ms' }}
        >
          <X size={18} strokeWidth={2.5} className="transition-transform duration-200 ease-in-out hover:rotate-90" />
        </button>

        {/* Brand Logo */}
        <div className="mb-10">
          <div 
            className={`font-bold text-2xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent inline-block transition-all duration-250 transform ${
              isOpen && animationReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Smartblinds
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-3 w-full">
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-250 ease-out transform ${
                isOpen && animationReady ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              } ${
                isDark ? 'bg-gray-800/30 hover:bg-gray-800/50' : 'bg-gray-50/70 hover:bg-gray-100/80'
              } ${
                isDark ? 'text-white' : 'text-gray-900'
              } ${
                isDark ? 'border border-gray-700/50' : 'border border-gray-200/80'
              } backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 hover:translate-x-0.5`}
              onClick={() => {
                onClose();
              }}
              style={{ transitionDelay: `${120 + index * 30}ms` }}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                isDark ? 'bg-blue-500/20 group-hover:bg-blue-500/30' : 'bg-blue-500/10 group-hover:bg-blue-500/20'
              } ${
                isDark ? 'text-blue-400' : 'text-blue-500'
              }`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
              <svg className="ml-auto transition-transform duration-200 ease-in-out transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div 
          className={`mt-auto pt-6 flex justify-between items-center transition-all duration-250 transform ${
            isOpen && animationReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${
            isDark ? 'border-t border-gray-800/30' : 'border-t border-gray-200/80'
          }`}
          style={{ transitionDelay: `${120 + menuItems.length * 30 + 50}ms` }}
        >
          <span className={`text-sm font-medium ${
            isDark ? 'text-gray-400/80' : 'text-gray-500/80'
          }`}>
            © {new Date().getFullYear()} Smartblinds
          </span>
          
          <div className="flex gap-2">
            <a 
              href="#" 
              className={`text-sm transition-colors duration-200 ${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Privacy
            </a>
            <a 
              href="#" 
              className={`text-sm transition-colors duration-200 ${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuWrapper; 