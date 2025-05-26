import React from 'react';
import { useBasketContext } from '../../hooks/useBasketContext';

const OrderSummarySection: React.FC = () => {
  const { items, getTotalPrice } = useBasketContext();

  return (
    <div className="checkout-summary" aria-label="Sažetak narudžbe">
      <h3>Sažetak narudžbe</h3>
      <div className="checkout-items">
        {items.map((item, index) => (
          <div key={index} className="checkout-item">
            <div className="checkout-item-image">
              <img src={item.product.image} alt={item.product.name} />
            </div>
            <div className="checkout-item-content">
              <div className="checkout-item-name">
                {item.product.name}
              </div>
              <div className="checkout-item-quantity">
                Količina: {item.quantity}
              </div>
            </div>
            <div className="checkout-item-price">
              €{(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-total">
        <span>Ukupno:</span>
        <span>€{getTotalPrice().toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummarySection; 