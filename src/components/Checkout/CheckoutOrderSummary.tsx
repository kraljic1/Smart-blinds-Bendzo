import React from 'react';
import { BasketItem } from '../../hooks/useBasket';

interface CheckoutOrderSummaryProps {
  items: BasketItem[];
  totalPrice: number;
}

const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({ items, totalPrice }) => {
  return (
    <div className="checkout-summary" aria-label="Order summary">
      <h3>Order Summary</h3>
      <div className="checkout-items">
        {items.map((item, index) => (
          <div key={index} className="checkout-item">
            <div className="checkout-item-name">
              {item.product.name} × {item.quantity}
            </div>
            <div className="checkout-item-price">
              €{((item.calculatedPrice ?? item.product.price) * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-total">
        <span>Total:</span>
        <span>€{totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary; 