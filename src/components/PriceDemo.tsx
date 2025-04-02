import { useState } from 'react';
import Price from './Price';
import pricingData from '../data/pricingData';
import '../styles/PriceDemo.css';

const PriceDemo = () => {
  const [productType, setProductType] = useState<string>('roller-blinds');
  const [measurements, setMeasurements] = useState({
    width: 100,
    height: 150
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductType(e.target.value);
  };

  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: parseInt(value, 10) || 0
    }));
  };

  const handlePriceChange = (price: number) => {
    setTotalPrice(price);
  };

  return (
    <div className="price-demo-container">
      <div className="price-demo-controls">
        <h2 className="demo-title">Price Calculator Demo</h2>
        
        <div className="control-group">
          <label className="control-label">
            Product Type:
            <select 
              className="product-select" 
              value={productType} 
              onChange={handleProductChange}
            >
              <option value="roller-blinds">Roller Blinds</option>
              <option value="zebra-blinds">Zebra Blinds</option>
              <option value="curtain-tracks">Curtain Tracks</option>
            </select>
          </label>
        </div>
        
        <div className="control-group measurements">
          <label className="control-label">
            Width (cm):
            <input
              type="number"
              name="width"
              value={measurements.width}
              onChange={handleMeasurementChange}
              min="20"
              max="300"
              className="measurement-input"
            />
          </label>
          
          <label className="control-label">
            Height (cm):
            <input
              type="number"
              name="height"
              value={measurements.height}
              onChange={handleMeasurementChange}
              min="20"
              max="300"
              className="measurement-input"
            />
          </label>
        </div>
        
        <div className="price-summary">
          <span className="summary-label">Estimated Price:</span>
          <span className="summary-value">€{totalPrice.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="price-demo-result">
        {pricingData[productType] && (
          <Price
            measurements={measurements}
            priceData={pricingData[productType]}
            onPriceChange={handlePriceChange}
          />
        )}
      </div>
    </div>
  );
};

export default PriceDemo; 