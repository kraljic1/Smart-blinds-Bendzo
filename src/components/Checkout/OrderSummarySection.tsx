import React from 'react';
import { useBasketContext } from '../../hooks/useBasketContext';
import { getShippingCost } from '../../utils/shippingCosts';

interface OrderSummarySectionProps {
  shippingMethod?: string;
}

const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({ 
  shippingMethod = 'Standard delivery' 
}) => {
  const { items, getTotalPrice } = useBasketContext();
  const subtotal = getTotalPrice(); // This is VAT-inclusive
  const shippingCost = getShippingCost(shippingMethod);
  
  // Calculate VAT from VAT-inclusive prices: VAT = price × (25/125) = price × 0.2
  const vatAmount = subtotal * 0.2;
  const total = subtotal + shippingCost;

  return (
    <div className="checkout-summary" aria-label="Sažetak narudžbe">
      <h3>Sažetak narudžbe</h3>
      <div className="checkout-items">
        {items.map((item, index) => {
          // Use calculated price if available, otherwise fall back to product price
          const itemPrice = item.calculatedPrice ?? item.product.price;
          
          return (
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
                €{(itemPrice * item.quantity).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="checkout-subtotal">
        <span>Međuzbroj:</span>
        <span>€{subtotal.toFixed(2)}</span>
      </div>
      
      <div className="checkout-shipping">
        <span>Dostava:</span>
        <span>€{shippingCost.toFixed(2)}</span>
      </div>
      
      <div className="checkout-tax">
        <span>PDV (25%):</span>
        <span>€{vatAmount.toFixed(2)}</span>
      </div>
      
      <div className="checkout-total">
        <span>Ukupno:</span>
        <span>€{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummarySection; 