import React from 'react';

interface CityFieldProps {
 value: string;
 onChange: (value: string) => void;
 fieldPrefix: string;
 disabled: boolean;
}

export const CityField: React.FC<CityFieldProps> = ({
 value,
 onChange,
 fieldPrefix,
 disabled
}) => {
 return (
 <div className="form-group">
 <label htmlFor={`${fieldPrefix}city`}>City</label>
 <div className="input-wrapper">
 <input
 type="text"
 id={`${fieldPrefix}city`}
 name={`${fieldPrefix}city`}
 value={value}
 onChange={(e) => onChange(e.target.value)}
 required
 placeholder="e.g., Malinska"
 aria-required="true"
 autoComplete={`${fieldPrefix ? 'shipping ' : ''}address-level2`}
 disabled={disabled}
 />
 <span className="input-icon">
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M3 21h18m-2-18v18m-8-18v18m-4-18v18M3 9l9-7 9 7"></path>
 </svg>
 </span>
 </div>
 </div>
 );
}; 