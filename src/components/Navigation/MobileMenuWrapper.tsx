import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Layers, Maximize, Package, HelpCircle, Settings } from 'lucide-react';
import './MobileMenu.css';

interface MobileMenuWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuWrapper: React.FC<MobileMenuWrapperProps> = ({ isOpen, onClose }) => {
  // Manage body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Menu items with icons
  const menuItems = [
    { path: '/products/roller-blinds', label: 'Roller Blinds', icon: <Layers size={18} className="mr-3 text-blue-600 dark:text-blue-400" /> },
    { path: '/products/zebra-blinds', label: 'Zebra Blinds', icon: <Layers size={18} className="mr-3 text-indigo-600 dark:text-indigo-400" /> },
    { path: '/products/curtain-blinds', label: 'Curtain Blinds', icon: <Maximize size={18} className="mr-3 text-purple-600 dark:text-purple-400" /> },
    { path: '/products/accessories', label: 'Accessories', icon: <Package size={18} className="mr-3 text-emerald-600 dark:text-emerald-400" /> },
    { path: '/how-it-works', label: 'How It Works', icon: <HelpCircle size={18} className="mr-3 text-amber-600 dark:text-amber-400" /> },
    { path: '/support', label: 'Support', icon: <Settings size={18} className="mr-3 text-rose-600 dark:text-rose-400" /> }
  ];

  const menuOpenClass = isOpen ? 'open' : '';

  return (
    <>
      {/* Overlay */}
      <div 
        className={`mobile-menu-overlay ${menuOpenClass}`}
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className={`mobile-menu ${menuOpenClass}`}>
        <button
          className="mobile-menu-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        
        <div className="mobile-menu-title">Smartblinds</div>
        
        <div className="mobile-menu-items">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="mobile-menu-item"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenuWrapper; 