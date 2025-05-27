import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';

const ShippingMethodSection: React.FC<Pick<CheckoutFormProps, 'formData' | 'handleChange'>> = ({
  formData,
  handleChange
}) => {
  return (
    <>
      <h3>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5M21 3l-7 7M13 13l7-7M8 21l4-4-4-4M3 16l4 4-4 4"/>
        </svg>
        Dostava
      </h3>
      
      <div className="form-group">
        <label htmlFor="shippingMethod">Način dostave</label>
        <div className="input-wrapper select-wrapper">
          <select
            id="shippingMethod"
            name="shippingMethod"
            value={formData.shippingMethod}
            onChange={handleChange}
            required
            autoComplete="off"
          >
            <option value="Standard delivery">Standardna dostava</option>
            <option value="Express delivery">Brza dostava (+€10)</option>
            <option value="Same day delivery">Dostava isti dan (+€20)</option>
          </select>
          <span className="select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
      </div>
    </>
  );
};

export default ShippingMethodSection; 