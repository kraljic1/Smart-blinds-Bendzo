import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../../styles/PriceCalculator.css';

interface PriceCalculatorProps {
  basePrice: number;
  width: number;
  height: number;
  additionalCosts: { name: string; price: number }[];
  onCheckout: (quantity: number, calculatedPrice: number) => void;
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
  const [quantity, setQuantity] = useState(1);
  
  const areaDimension = width && height ? (width * height) / 10000 : 0; // Convert to square meters
  const areaCost = isAccessory ? basePrice : basePrice * areaDimension;
  
  const additionalCostsTotal = additionalCosts.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = areaCost + additionalCostsTotal; // Price per unit including all costs
  const totalPrice = unitPrice * quantity;

  // Debug logging
  console.log('PriceCalculator Debug:', {
    basePrice,
    width,
    height,
    areaDimension,
    areaCost,
    additionalCosts,
    additionalCostsTotal,
    unitPrice,
    totalPrice,
    isAccessory
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleCheckout = () => {
    onCheckout(quantity, unitPrice); // Pass the calculated unit price
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
            <span>€{unitPrice.toFixed(2)}</span>
          </div>
          
          <div className="price-calculator-tax">
            <span>Including VAT</span>
            <span>€{(unitPrice * 0.21).toFixed(2)}</span>
          </div>
        </div>
      )}
      
      <div className="price-calculator-actions">
        <div className="price-calculator-quantity">
          <button className="quantity-button" onClick={decreaseQuantity} aria-label="Decrease quantity">-</button>
          <input 
            type="text" 
            id="product-quantity" 
            name="product-quantity" 
            className="quantity-input" 
            value={quantity} 
            readOnly 
            aria-label="Product quantity" 
            autoComplete="off"
          />
          <button className="quantity-button" onClick={increaseQuantity} aria-label="Increase quantity">+</button>
        </div>
        <button className="checkout-button" onClick={handleCheckout}>
          ADD TO MY CART
        </button>
      </div>
    </div>
  );
};

export default PriceCalculator; 