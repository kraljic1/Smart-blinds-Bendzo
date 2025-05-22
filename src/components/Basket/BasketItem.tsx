import React from 'react';
import { BasketItem as BasketItemType } from '../../hooks/useBasket';
import { useBasketContext } from '../../hooks/useBasketContext';
import { formatOptionLabel, formatOptionValue } from '../../utils/formattingUtils';
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
    
    // Group options by category
    const dimensionOptions: [string, string | number | boolean][] = [];
    const styleOptions: [string, string | number | boolean][] = [];
    const motorOptions: [string, string | number | boolean][] = [];
    const otherOptions: [string, string | number | boolean][] = [];
    
    Object.entries(options).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey.includes('width') || lowerKey.includes('height') || lowerKey.includes('size')) {
        dimensionOptions.push([key, value]);
      } else if (lowerKey.includes('color') || lowerKey.includes('fabric') || lowerKey.includes('transparency')) {
        styleOptions.push([key, value]);
      } else if (lowerKey.includes('motor') || lowerKey.includes('remote') || lowerKey.includes('system')) {
        motorOptions.push([key, value]);
      } else {
        otherOptions.push([key, value]);
      }
    });
    
    return (
      <div className="basket-item-options">
        {dimensionOptions.length > 0 && (
          <div className="basket-item-option-group">
            {dimensionOptions.map(([key, value]) => (
              <span key={key} className="basket-item-option">
                <strong>{formatOptionLabel(key)}:</strong> {typeof value === 'string' ? formatOptionValue(value) : value}
              </span>
            ))}
          </div>
        )}
        
        {styleOptions.length > 0 && (
          <div className="basket-item-option-group">
            {styleOptions.map(([key, value]) => (
              <span key={key} className="basket-item-option">
                <strong>{formatOptionLabel(key)}:</strong> {typeof value === 'string' ? formatOptionValue(value) : value}
              </span>
            ))}
          </div>
        )}
        
        {motorOptions.length > 0 && (
          <div className="basket-item-option-group">
            {motorOptions.map(([key, value]) => (
              <span key={key} className="basket-item-option">
                <strong>{formatOptionLabel(key)}:</strong> {typeof value === 'string' ? formatOptionValue(value) : value}
              </span>
            ))}
          </div>
        )}
        
        {otherOptions.length > 0 && (
          <div className="basket-item-option-group">
            {otherOptions.map(([key, value]) => (
              <span key={key} className="basket-item-option">
                <strong>{formatOptionLabel(key)}:</strong> {typeof value === 'string' ? formatOptionValue(value) : value}
              </span>
            ))}
          </div>
        )}
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
        <div className="basket-item-price">€{product.price.toFixed(2)}</div>
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
          id={`quantity-${product.id}-${index}`}
          name={`quantity-${product.id}-${index}`}
          autoComplete="off"
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
        €{(product.price * quantity).toFixed(2)}
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