import { useState } from 'react';
import Price from '../UI/Price';
import pricingData from '../../data/pricingData';
import { validateDimensionInput, validateDimension, DEMO_DIMENSION_CONSTRAINTS } from '../../utils/dimensionValidation';
import '../../styles/PriceDemo.css';

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
    
    if (name === 'width' || name === 'height') {
      const validatedValue = validateDimensionInput(value);
      setMeasurements(prev => ({
        ...prev,
        [name]: validatedValue || 0
      }));
    } else {
      setMeasurements(prev => ({
        ...prev,
        [name]: parseInt(value, 10) || 0
      }));
    }
  };

  const handleMeasurementBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'width' || name === 'height') {
      const constrainedValue = validateDimension(value, DEMO_DIMENSION_CONSTRAINTS);
      setMeasurements(prev => ({
        ...prev,
        [name]: constrainedValue || 0
      }));
    }
  };

  const handlePriceChange = (price: number) => {
    setTotalPrice(price);
  };

  return (
    <div className="price-demo-container">
      <div className="price-demo-controls">
        <h2 className="demo-title">Price Calculator Demo</h2>
        
        <div className="control-group">
          <label htmlFor="product-type-select" className="control-label">
            Product Type:
            <select 
              id="product-type-select"
              name="productType"
              className="product-select" 
              value={productType} 
              onChange={handleProductChange}
              aria-label="Select product type"
            >
              <option value="roller-blinds">Roller Blinds</option>
              <option value="zebra-blinds">Zebra Blinds</option>
              <option value="curtain-tracks">Curtain Tracks</option>
            </select>
          </label>
        </div>
        
        <div className="control-group measurements">
          <label htmlFor="width-input" className="control-label">
            Width (cm):
            <input
              type="number"
              id="width-input"
              name="width"
              value={measurements.width}
              onChange={handleMeasurementChange}
              onBlur={handleMeasurementBlur}
              min={DEMO_DIMENSION_CONSTRAINTS.min}
              max={DEMO_DIMENSION_CONSTRAINTS.max}
              className="measurement-input"
              aria-label="Product width in centimeters"
              required
            />
          </label>
          
          <label htmlFor="height-input" className="control-label">
            Height (cm):
            <input
              type="number"
              id="height-input"
              name="height"
              value={measurements.height}
              onChange={handleMeasurementChange}
              onBlur={handleMeasurementBlur}
              min={DEMO_DIMENSION_CONSTRAINTS.min}
              max={DEMO_DIMENSION_CONSTRAINTS.max}
              className="measurement-input"
              aria-label="Product height in centimeters"
              required
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