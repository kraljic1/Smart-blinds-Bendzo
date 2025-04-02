import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBasketContext } from '../../context/BasketContext';
import './BasketIcon.css';

export function BasketIcon() {
  const { getItemCount } = useBasketContext();
  const [showPreview, setShowPreview] = useState(false);
  const itemCount = getItemCount();

  return (
    <div 
      className="basket-icon-container"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <Link to="/basket" className="basket-icon-link">
        <div className="basket-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
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
      
      {showPreview && itemCount > 0 && (
        <div className="basket-preview">
          <div className="basket-preview-header">
            <span>{itemCount} {itemCount === 1 ? 'item' : 'items'} in your basket</span>
          </div>
          <Link to="/basket" className="basket-preview-view-btn">
            View Basket
          </Link>
        </div>
      )}
    </div>
  );
} 