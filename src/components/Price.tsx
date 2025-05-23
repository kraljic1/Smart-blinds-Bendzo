import { useState } from 'react';
import '../styles/Price.css';

interface PriceProps {
  measurements: {
    width: number;
    height: number;
  };
  priceData: {
    baseRate: number;
    minimumCharge: number;
    additionalOptions: { id: string; name: string; price: number }[];
  };
  onPriceChange?: (totalPrice: number) => void;
}

const Price = ({ measurements, priceData, onPriceChange }: PriceProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
  // Calculate area in square meters
  const area = (measurements.width * measurements.height) / 10000;
  
  // Calculate base price (with minimum charge)
  const basePrice = Math.max(area * priceData.baseRate, priceData.minimumCharge);
  
  // Calculate additional costs from selected options
  const additionalCosts = priceData.additionalOptions
    .filter(option => selectedOptions.includes(option.id))
    .reduce((sum, option) => sum + option.price, 0);
  
  // Calculate total price
  const totalPrice = basePrice + additionalCosts;
  
  // Notify parent component of price change
  if (onPriceChange) {
    onPriceChange(totalPrice);
  }
  
  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };
  
  return (
    <div className="price-container">
      <h3 className="price-title">Price Calculation</h3>
      
      <div className="price-breakdown">
        <div className="price-row">
          <span className="price-label">Dimensions:</span>
          <span className="price-value">{measurements.width} × {measurements.height} cm</span>
        </div>
        
        <div className="price-row">
          <span className="price-label">Area:</span>
          <span className="price-value">{area.toFixed(2)} m²</span>
        </div>
        
        <div className="price-row">
          <span className="price-label">Base Price:</span>
          <span className="price-value">€{basePrice.toFixed(2)}</span>
        </div>
        
        {priceData.additionalOptions.length > 0 && (
          <div className="additional-options">
            <h4 className="options-title">Additional Options</h4>
            
            {priceData.additionalOptions.map(option => (
              <div key={option.id} className="option-row">
                <label className="option-label" htmlFor={`price-option-${option.id}`}>
                  <input
                    type="checkbox"
                    id={`price-option-${option.id}`}
                    name={`price-option-${option.id}`}
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => toggleOption(option.id)}
                  />
                  <span className="option-name">{option.name}</span>
                </label>
                <span className="option-price">+€{option.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="price-total">
          <span className="total-label">Total Price:</span>
          <span className="total-value">€{totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="price-tax-info">
          <span>Including VAT: €{(totalPrice * 0.21).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Price; 