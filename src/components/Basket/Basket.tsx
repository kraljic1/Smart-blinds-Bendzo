import React from 'react';
import { useBasketContext } from '../../hooks/useBasketContext';
import { BasketItem } from './BasketItem';
import { Link, useNavigate } from 'react-router-dom';
import './Basket.css';

export function Basket() {
  const { items, clearBasket, getTotalPrice, getItemCount } = useBasketContext();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  const itemCount = getItemCount();

  const handleContinueShopping = () => {
    navigate('/products/roller-blinds');
  };

  if (items.length === 0) {
    return (
      <div className="basket-empty">
        <h2>Vaša košarica je prazna</h2>
        <p>Dodajte proizvode u košaricu da biste ih vidjeli ovdje.</p>
        <Link to="/products/roller-blinds" className="basket-continue-btn">Pregledajte naše proizvode</Link>
      </div>
    );
  }

  return (
    <div className="basket">
      <div className="basket-header">
        <h2 className="basket-title">Vaša košarica ({itemCount} {itemCount === 1 ? 'proizvod' : 'proizvoda'})</h2>
        <button 
          onClick={clearBasket} 
          className="basket-clear-btn"
          aria-label="Isprazni košaricu"
        >
          Ukloni sve
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
          <span>Ukupno:</span>
          <span className="basket-total-price">€{totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="basket-actions">
          <button onClick={handleContinueShopping} className="basket-continue-btn">Nastavi kupovinu</button>
          <Link to="/checkout" className="basket-checkout-btn">Nastavi s narudžbom</Link>
        </div>
      </div>
    </div>
  );
} 