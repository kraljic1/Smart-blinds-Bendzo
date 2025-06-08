import React, { useEffect, useCallback } from 'react';
import { useBasketContext } from '../../hooks/useBasketContext';
import { getShippingCost } from '../../utils/shippingCosts';
import { useCheckoutForm } from './useCheckoutForm';
import { usePaymentHandling } from './hooks/usePaymentHandling';
import { usePaymentState } from './hooks/usePaymentState';
import { useFormSubmission } from './hooks/useFormSubmission';
import { useRealTimeValidation } from '../../hooks/useRealTimeValidation';
import { PaymentSection } from './PaymentSection';
import { PaymentSuccess } from './PaymentSuccess';
import EnhancedCheckoutFormContent from './EnhancedCheckoutFormContent';
import './CheckoutForm.css';

export function EnhancedCheckoutForm() {
  console.log('[CHECKOUT] EnhancedCheckoutForm component mounted');
  
  const { getTotalPrice } = useBasketContext();
  
  const calculateTotalWithShipping = () => {
    const subtotal = getTotalPrice();
    const shippingCost = getShippingCost(formData.shippingMethod || 'Standard delivery');
    return subtotal + shippingCost;
  };
  
  const {
    formData,
    formStatus,
    phoneValidation,
    handleChange,
    setError,
    setSubmitting
  } = useCheckoutForm();

  const {
    handleFieldChange,
    handleFieldBlur,
    shouldShowError,
    shouldShowSuccess,
    shouldShowWarning,
    getFieldError,
    getFieldWarning,
    getFieldState,
    isFormValid,
    cleanup
  } = useRealTimeValidation(formData, {
    debounceMs: 500,
    validateOnChange: true,
    validateOnBlur: true
  });

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const {
    paymentState: stripePaymentState,
    setBrowserInfo,
    handleClosePayment,
    updatePaymentState
  } = usePaymentState();

  const {
    paymentState: handlingState,
    handlePaymentSuccess,
    handlePaymentError,
    handleContinueShopping
  } = usePaymentHandling(formData, setError, setSubmitting);

  const {
    handleSubmit,
    handlePaymentButtonClick
  } = useFormSubmission(
    formData,
    phoneValidation,
    setError,
    setSubmitting,
    updatePaymentState
  );

  const handleEnhancedChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    handleChange(e);
    handleFieldChange(name, fieldValue);
  }, [handleChange, handleFieldChange]);

  const handleEnhancedBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleFieldBlur(name, value);
  }, [handleFieldBlur]);

  const handleEnhancedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setError('Molimo ispravite greške u formi prije slanja.');
      return;
    }
    
    handleSubmit(e);
  };

  const handlePaymentButtonClickWrapper = () => {
    if (!isFormValid()) {
      setError('Molimo ispravite greške u formi prije nastavka na plaćanje.');
      return;
    }
    
    handlePaymentButtonClick(stripePaymentState);
  };

  return (
    <div className="checkout-form-container">
      <EnhancedCheckoutFormContent
        formData={formData}
        formStatus={formStatus}
        phoneValidation={phoneValidation}
        handleEnhancedChange={handleEnhancedChange}
        handleEnhancedBlur={handleEnhancedBlur}
        handleEnhancedSubmit={handleEnhancedSubmit}
        handlePaymentButtonClickWrapper={handlePaymentButtonClickWrapper}
        shouldShowError={(fieldName: string) => !!shouldShowError(fieldName)}
        shouldShowSuccess={(fieldName: string) => !!shouldShowSuccess(fieldName)}
        shouldShowWarning={(fieldName: string) => !!shouldShowWarning(fieldName)}
        getFieldError={getFieldError}
        getFieldWarning={getFieldWarning}
        getFieldState={getFieldState}
        isFormValid={isFormValid}
      />
      
      <PaymentSection
        paymentState={stripePaymentState}
        totalAmount={calculateTotalWithShipping()}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        onClosePayment={handleClosePayment}
        onBrowserDetected={setBrowserInfo}
      />
      
      {handlingState.orderComplete && handlingState.orderDetails && (
        <PaymentSuccess 
          orderDetails={handlingState.orderDetails}
          onContinueShopping={handleContinueShopping}
        />
      )}
    </div>
  );
} 