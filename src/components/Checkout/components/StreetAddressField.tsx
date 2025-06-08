import React from 'react';

interface StreetAddressFieldProps {
  value: string;
  onChange: (value: string) => void;
  fieldPrefix: string;
  disabled: boolean;
}

export const StreetAddressField: React.FC<StreetAddressFieldProps> = ({
  value,
  onChange,
  fieldPrefix,
  disabled
}) => {
  return (
    <div className="form-group">
      <label htmlFor={`${fieldPrefix}address`}>Street Address</label>
      <div className="input-wrapper">
        <input
          type="text"
          id={`${fieldPrefix}address`}
          name={`${fieldPrefix}address`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
  );
}; 