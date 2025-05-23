import React from 'react';

interface AddressInputProps {
  streetAddress: string;
  city: string;
  postalCode: string;
  onStreetAddressChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onPostalCodeChange: (value: string) => void;
  disabled?: boolean;
  fieldPrefix?: string;
  title?: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  streetAddress,
  city,
  postalCode,
  onStreetAddressChange,
  onCityChange,
  onPostalCodeChange,
  disabled = false,
  fieldPrefix = '',
  title = 'Address'
}) => {
  const handleChange = (field: string, value: string) => {
    switch (field) {
      case 'streetAddress':
        onStreetAddressChange(value);
        break;
      case 'city':
        onCityChange(value);
        break;
      case 'postalCode':
        onPostalCodeChange(value);
        break;
    }
  };

  return (
    <div className="address-section">
      <h3>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        {title}
      </h3>
      
      <div className="form-group">
        <label htmlFor={`${fieldPrefix}address`}>Street Address</label>
        <div className="input-wrapper">
          <input
            type="text"
            id={`${fieldPrefix}address`}
            name={`${fieldPrefix}address`}
            value={streetAddress}
            onChange={(e) => handleChange('streetAddress', e.target.value)}
            required
            placeholder="Street address (e.g., Praska ulica 3)"
            aria-required="true"
            autoComplete={`${fieldPrefix ? 'shipping ' : ''}street-address`}
            disabled={disabled}
          />
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9,22 9,12 15,12 15,22"></polyline>
            </svg>
          </span>
        </div>
      </div>
      
      <div className="form-row address-row">
        <div className="form-group">
          <label htmlFor={`${fieldPrefix}postalCode`}>Postal Code</label>
          <div className="input-wrapper">
            <input
              type="text"
              id={`${fieldPrefix}postalCode`}
              name={`${fieldPrefix}postalCode`}
              value={postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              required
              placeholder="e.g., 51511"
              aria-required="true"
              autoComplete={`${fieldPrefix ? 'shipping ' : ''}postal-code`}
              pattern="[0-9]{5}"
              title="Please enter a 5-digit postal code"
              disabled={disabled}
            />
            <span className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h18v18H3zM12 8v8m-4-4h8"></path>
              </svg>
            </span>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor={`${fieldPrefix}city`}>City</label>
          <div className="input-wrapper">
            <input
              type="text"
              id={`${fieldPrefix}city`}
              name={`${fieldPrefix}city`}
              value={city}
              onChange={(e) => handleChange('city', e.target.value)}
              required
              placeholder="e.g., Malinska"
              aria-required="true"
              autoComplete={`${fieldPrefix ? 'shipping ' : ''}address-level2`}
              disabled={disabled}
            />
            <span className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18m-2-18v18m-8-18v18m-4-18v18M3 9l9-7 9 7"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 