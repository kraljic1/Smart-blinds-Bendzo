import React from 'react';
import { ProcessedValidationState } from './hooks/useValidationState';

interface ValidationMessageProps {
 name: string;
 validationState: ProcessedValidationState;
}

const ErrorIcon: React.FC = () => (
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <circle cx="12"cy="12"r="10"></circle>
 <line x1="12"y1="8"x2="12"y2="12"></line>
 <line x1="12"y1="16"x2="12.01"y2="16"></line>
 </svg>
);

const WarningIcon: React.FC = () => (
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
 <line x1="12"y1="9"x2="12"y2="13"></line>
 <line x1="12"y1="17"x2="12.01"y2="17"></line>
 </svg>
);

const SuccessIcon: React.FC = () => (
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
 <polyline points="22,4 12,14.01 9,11.01"></polyline>
 </svg>
);

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ 
 name, 
 validationState 
}) => {
 const { hasError, hasWarning, hasSuccess, errorMessage, warningMessage } = validationState;

 // Error message
 if (hasError && errorMessage) {
 return (
 <div id={`${name}-error`} className="validation-message error"role="alert">
 <ErrorIcon />
 {errorMessage}
 </div>
 );
 }

 // Warning message
 if (hasWarning && warningMessage) {
 return (
 <div id={`${name}-warning`} className="validation-message warning">
 <WarningIcon />
 {warningMessage}
 </div>
 );
 }

 // Success message
 if (hasSuccess) {
 return (
 <div className="validation-message success">
 <SuccessIcon />
 Polje je ispravno uneseno
 </div>
 );
 }

 return null;
}; 