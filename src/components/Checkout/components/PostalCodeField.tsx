import React from 'react';

interface PostalCodeFieldProps {
 value: string;
 onChange: (value: string) => void;
 fieldPrefix: string;
 disabled: boolean;
}

export const PostalCodeField: React.FC<PostalCodeFieldProps> = ({
 value,
 onChange,
 fieldPrefix,
 disabled
}) => {
 return (
 <div className="form-group">
 <label htmlFor={`${fieldPrefix}postalCode`}>Postal Code</label>
 <div className="input-wrapper">
 <input
 type="text"
 id={`${fieldPrefix}postalCode`}
 name={`${fieldPrefix}postalCode`}
 value={value}
 onChange={(e) => onChange(e.target.value)}
 required
 placeholder="e.g., 51511"
 aria-required="true"
 autoComplete={`${fieldPrefix ? 'shipping ' : ''}postal-code`}
 pattern="[0-9]{5}"
 title="Please enter a 5-digit postal code"
 disabled={disabled}
 />
 <span className="input-icon">
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M3 3h18v18H3zM12 8v8m-4-4h8"></path>
 </svg>
 </span>
 </div>
 </div>
 );
}; 