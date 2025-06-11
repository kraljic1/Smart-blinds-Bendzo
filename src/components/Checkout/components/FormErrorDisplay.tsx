import React from 'react';
import { FormStatus } from '../CheckoutFormTypes';

interface FormErrorDisplayProps {
 formStatus: FormStatus;
}

/**
 * FormErrorDisplay component shows form-level error messages
 * with an appropriate error icon and styling
 */
const FormErrorDisplay: React.FC<FormErrorDisplayProps> = ({ formStatus }) => {
 if (!formStatus.error) {
 return null;
 }

 return (
 <div className="checkout-error"role="alert">
 <svg 
 xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 >
 <circle cx="12"cy="12"r="10"></circle>
 <line x1="12"y1="8"x2="12"y2="12"></line>
 <line x1="12"y1="16"x2="12.01"y2="16"></line>
 </svg>
 {formStatus.error}
 </div>
 );
};

export default FormErrorDisplay; 