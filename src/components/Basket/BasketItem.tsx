import React from 'react';
import { BasketItem as BasketItemType } from '../../hooks/useBasket';
import { useBasketContext } from '../../hooks/useBasketContext';
import './BasketItem.css';

interface BasketItemProps {
  item: BasketItemType;
  index: number;
}

export function BasketItem({ item, index }: BasketItemProps) {
  const { updateQuantity, removeItem } = useBasketContext();
  const { product, quantity, options } = item;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      updateQuantity(index, newQuantity);
    }
  };

  const handleIncrement = () => {
    updateQuantity(index, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(index, quantity - 1);
    } else {
      removeItem(index);
    }
  };

  const formatOptions = () => {
    if (!options) return null;
    
    return (
      <div className="basket-item-options">
        {Object.entries(options).map(([key, value]) => (
          <span key={key} className="basket-item-option">
            {key}: {value}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="basket-item">
      <div className="basket-item-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="basket-item-details">
        <h3 className="basket-item-name">{product.name}</h3>
        {formatOptions()}
        <div className="basket-item-price">${product.price.toFixed(2)}</div>
      </div>
      
      <div className="basket-item-quantity">
        <button 
          className="quantity-btn" 
          onClick={handleDecrement}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="quantity-input"
        />
        <button 
          className="quantity-btn" 
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      
      <div className="basket-item-subtotal">
        ${(product.price * quantity).toFixed(2)}
      </div>
      
      <button 
        className="basket-item-remove" 
        onClick={() => removeItem(index)}
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  );
} 