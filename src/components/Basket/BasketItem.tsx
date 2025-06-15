import React, { useState } from 'react';
import { BasketItem as BasketItemType } from '../../hooks/useBasket';
import { useBasketContext } from '../../hooks/useBasketContext';
import './BasketItem.css';

interface BasketItemProps {
 item: BasketItemType;
 index: number;
}

export function BasketItem({ item, index }: BasketItemProps) {
 const { product, quantity, options, calculatedPrice } = item;
 const { updateQuantity, removeItem } = useBasketContext();
 const [localQuantity, setLocalQuantity] = useState(quantity);

 // Use calculated price if available, otherwise fall back to product price
 const itemPrice = calculatedPrice ?? product.price;

 const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const newQuantity = parseInt(e.target.value) || 1;
 setLocalQuantity(newQuantity);
 updateQuantity(index, newQuantity);
 };

 const handleIncrement = () => {
 const newQuantity = localQuantity + 1;
 setLocalQuantity(newQuantity);
 updateQuantity(index, newQuantity);
 };

 const handleDecrement = () => {
 if (localQuantity > 1) {
 const newQuantity = localQuantity - 1;
 setLocalQuantity(newQuantity);
 updateQuantity(index, newQuantity);
 }
 };

 const formatOptions = () => {
 if (!options || Object.keys(options).length === 0) {
 return null;
 }

 const optionGroups: { [key: string]: string[] } = {};

 Object.entries(options).forEach(([key, value]) => {
 if (key === 'width' || key === 'height') {
 if (!optionGroups['Dimensions']) {
 optionGroups['Dimensions'] = [];
 }
 optionGroups['Dimensions'].push(`${key}: ${value}cm`);
 } else if (typeof value === 'string') {
 // For color and other string options, we might want to format them nicely
 const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
 if (!optionGroups[formattedKey]) {
 optionGroups[formattedKey] = [];
 }
 optionGroups[formattedKey].push(String(value));
 }
 });

 return (
 <div className="basket-item-options">
 {Object.entries(optionGroups).map(([groupName, groupValues]) => (
 <div key={groupName} className="basket-item-option-group">
 {groupValues.map((value, idx) => (
 <span key={idx} className="basket-item-option">
 <strong>{groupName}:</strong> {value}
 </span>
 ))}
 </div>
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
 <div className="basket-item-price">€{itemPrice.toFixed(2)}</div>
 </div>
 
 <div className="basket-item-quantity">
 <button 
 className="quantity-btn"
 onClick={handleDecrement}
 aria-label="Smanji količinu"
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
 aria-label="Povećaj količinu"
 >
 +
 </button>
 </div>
 
 <div className="basket-item-subtotal">
 €{(itemPrice * quantity).toFixed(2)}
 </div>
 
 <button 
 className="basket-item-remove"
 onClick={() => removeItem(index)}
 aria-label="Ukloni proizvod"
 >
 ×
 </button>
 </div>
 );
} 