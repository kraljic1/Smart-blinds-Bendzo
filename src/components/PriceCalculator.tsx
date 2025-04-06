import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../styles/PriceCalculator.css';

interface PriceCalculatorProps {
  basePrice: number;
  width: number;
  height: number;
  additionalCosts: { name: string; price: number }[];
  onCheckout: () => void;
  isAccessory?: boolean;
}

const PriceCalculator = ({
  basePrice,
  width,
  height,
  additionalCosts,
  onCheckout,
  isAccessory = false
}: PriceCalculatorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const areaDimension = width && height ? (width * height) / 10000 : 0; // Convert to square meters
  const areaCost = isAccessory ? basePrice : basePrice * areaDimension;
  
  const additionalCostsTotal = additionalCosts.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = areaCost + additionalCostsTotal;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="price-calculator">
      <div className="price-calculator-summary" onClick={toggleExpand}>
        <div className="price-calculator-total">
          <span className="price-calculator-label">Your total price</span>
          <span className="price-calculator-amount">€{totalPrice.toFixed(2)}</span>
        </div>
        <button className="price-calculator-toggle">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="price-calculator-details">
          <div className="price-calculator-item">
            <span className="price-calculator-item-name">
              {isAccessory 
                ? "Base price" 
                : `Base price (${width} x ${height} cm)`}
            </span>
            <span className="price-calculator-item-price">€{areaCost.toFixed(2)}</span>
          </div>
          
          {additionalCosts.map((item, index) => (
            <div key={index} className="price-calculator-item">
              <span className="price-calculator-item-name">{item.name}</span>
              <span className="price-calculator-item-price">+€{item.price.toFixed(2)}</span>
            </div>
          ))}
          
          <div className="price-calculator-subtotal">
            <span>Subtotal</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="price-calculator-tax">
            <span>Including VAT</span>
            <span>€{(totalPrice * 0.21).toFixed(2)}</span>
          </div>
        </div>
      )}
      
      <div className="price-calculator-actions">
        <div className="price-calculator-quantity">
          <button className="quantity-button">-</button>
          <input type="text" className="quantity-input" value="1" readOnly />
          <button className="quantity-button">+</button>
        </div>
        <button className="checkout-button" onClick={onCheckout}>
          ADD TO MY CART
        </button>
      </div>
    </div>
  );
};

export default PriceCalculator; 