import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, Home, ShoppingBag, HelpCircle, Settings, Heart } from 'lucide-react';

import ModalBackground from '../UI/ModalBackground';
import './MobileMenu.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

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
    { label: 'My Favorites', path: '/liked', icon: <Heart size={16} /> },
  ];

  return (
    <>
      <ModalBackground onClick={onClose} />
      
      {/* Menu panel */}
      <div className="mobile-menu-panel light" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-content">
          {/* Close button */}
          <button
            onClick={onClose}
            className="mobile-menu-close light"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          
          {/* Menu items */}
          <div className="mobile-menu-items">
            {navItems.map((item, index) => {
              const isActive = isActiveRoute(item.path);
              
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`mobile-menu-item ${isActive ? 'active' : 'inactive'} light`}
                  onClick={onClose}
                >
                  <div className={`mobile-menu-item-icon ${isActive ? 'active' : 'inactive'} light`}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="mobile-menu-item-chevron" />
                </Link>
              );
            })}
          </div>
          
          {/* Footer */}
          <div className="mobile-menu-footer light">
            <div className="mobile-menu-footer-content light">
              <span>© {new Date().getFullYear()} Smartblinds</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu; 