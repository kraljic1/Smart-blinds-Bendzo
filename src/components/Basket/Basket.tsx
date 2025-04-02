import React from 'react';
import { useBasketContext } from '../../hooks/useBasketContext';
import { BasketItem } from './BasketItem';
import './Basket.css';

export function Basket() {
  const { items, clearBasket, getTotalPrice, getItemCount } = useBasketContext();
  const totalPrice = getTotalPrice();
  const itemCount = getItemCount();

  if (items.length === 0) {
    return (
      <div className="basket-empty">
        <h2>Your basket is empty</h2>
        <p>Add some products to your basket to see them here.</p>
      </div>
    );
  }

  return (
    <div className="basket">
      <div className="basket-header">
        <h2 className="basket-title">Your Basket ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h2>
        <button 
          onClick={clearBasket} 
          className="basket-clear-btn"
          aria-label="Clear basket"
        >
          Clear All
        </button>
      </div>

      <div className="basket-items">
        {items.map((item, index) => (
          <BasketItem 
            key={`${item.product.id}-${index}`} 
            item={item} 
            index={index} 
          />
        ))}
      </div>

      <div className="basket-summary">
        <div className="basket-total">
          <span>Total:</span>
          <span className="basket-total-price">${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="basket-actions">
          <button className="basket-continue-btn">Continue Shopping</button>
          <button className="basket-checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
} 