import React from 'react';
import { Link } from 'react-router-dom';
import { useBasketContext } from '../../hooks/useBasketContext';
import { useTheme } from '../../hooks/useTheme';
import './BasketIcon.css';

export function BasketIcon() {
  const { getItemCount } = useBasketContext();
  const { isDark } = useTheme();
  const itemCount = getItemCount();

  // Define the stroke color based on the theme
  const strokeColor = isDark ? '#ffffff' : '#000000';

  return (
    <div className="basket-icon-container">
      <Link to="/basket" className="basket-icon-link">
        <div className={`basket-icon ${isDark ? 'dark-mode' : 'light-mode'}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {itemCount > 0 && (
            <span className="basket-icon-count">{itemCount}</span>
          )}
        </div>
      </Link>
    </div>
  );
} 