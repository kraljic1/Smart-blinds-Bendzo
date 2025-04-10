import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, Sun, Moon, Home, ShoppingBag, HelpCircle, Settings, Heart } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import ModalBackground from './ModalBackground';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isDark, toggle } = useTheme();
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
      <div 
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          maxWidth: '20rem',
          backgroundColor: isDark ? '#111827' : '#ffffff',
          zIndex: 41,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          padding: '5rem 1.5rem 1.5rem 1.5rem' 
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              padding: '0.5rem',
              borderRadius: '9999px',
              backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
              color: isDark ? '#e5e7eb' : '#1f2937'
            }}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          
          {/* Menu items */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', gap: '0.25rem' }}>
            {navItems.map((item, index) => {
              const isActive = isActiveRoute(item.path);
              
              return (
                <Link
                  key={index}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    backgroundColor: isActive 
                      ? (isDark ? '#1e3a8a' : '#eff6ff') 
                      : 'transparent',
                    color: isActive 
                      ? (isDark ? '#93c5fd' : '#2563eb') 
                      : (isDark ? '#e5e7eb' : '#374151'),
                    fontWeight: 500,
                    transition: 'all 300ms'
                  }}
                  onClick={onClose}
                >
                  <div style={{ 
                    marginRight: '0.75rem', 
                    color: isActive 
                      ? (isDark ? '#93c5fd' : '#2563eb') 
                      : (isDark ? '#9ca3af' : '#6b7280')
                  }}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                  <ChevronRight size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </Link>
              );
            })}
          </div>
          
          {/* Footer */}
          <div style={{ 
            marginTop: 'auto', 
            paddingTop: '1rem', 
            borderTop: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 1)'}`
          }}>
            <div style={{ 
              fontSize: '0.875rem', 
              color: isDark ? '#9ca3af' : '#6b7280',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>© {new Date().getFullYear()} Smartblinds</span>
              <button 
                onClick={toggle} 
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
                  color: isDark ? '#e5e7eb' : '#1f2937'
                }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu; 