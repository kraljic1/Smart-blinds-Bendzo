import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';

const ShippingMethodSection: React.FC<Pick<CheckoutFormProps, 'formData' | 'handleChange'>> = ({
  formData,
  handleChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor="shippingMethod">Način dostave</label>
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
    </div>
  );
};

export default ShippingMethodSection; 