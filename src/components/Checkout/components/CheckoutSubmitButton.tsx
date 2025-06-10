import React from 'react';
import { FormStatus } from '../CheckoutFormTypes';

interface CheckoutSubmitButtonProps {
  formStatus: FormStatus;
  isFormValid: () => boolean;
  handlePaymentButtonClick: () => void;
}

/**
 * CheckoutSubmitButton component handles the payment submission button
 * with loading states and form validation checks
 */
const CheckoutSubmitButton: React.FC<CheckoutSubmitButtonProps> = ({
  formStatus,
  isFormValid,
  handlePaymentButtonClick
}) => {
  const isDisabled = formStatus.submitting || !isFormValid();

  return (
    <button 
      type="submit" 
      className={`checkout-submit-btn ${!isFormValid() ? 'disabled' : ''}`}
      disabled={isDisabled}
      aria-busy={formStatus.submitting ? "true" : "false"}
      onClick={handlePaymentButtonClick}
    >
      {formStatus.submitting ? (
        <>
          <span className="loading-spinner"></span>
          <span>Obrađuje se...</span>
        </>
      ) : (
        <>
          <span>Nastavi na plaćanje</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14m-7-7l7 7-7 7"/>
          </svg>
        </>
      )}
    </button>
  );
};

export default CheckoutSubmitButton; 