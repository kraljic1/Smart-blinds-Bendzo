import React, { useEffect } from 'react';
import { useBasketContext } from '../../hooks/useBasketContext';
import { getShippingCost } from '../../utils/shippingCosts';
import { useCheckoutForm } from './useCheckoutForm';
import { usePaymentHandling } from './hooks/usePaymentHandling';
import { usePaymentState } from './hooks/usePaymentState';
import { useFormSubmission } from './hooks/useFormSubmission';
import { useRealTimeValidation } from '../../hooks/useRealTimeValidation';
import { ValidatedInput } from '../UI/ValidatedInput';
import { PaymentSection } from './PaymentSection';
import { PaymentSuccess } from './PaymentSuccess';
import PhoneNumberSection from './PhoneNumberSection';
import CompanyInfoSection from './CompanyInfoSection';
import ShippingAddressSection from './ShippingAddressSection';
import PaymentMethodSection from './PaymentMethodSection';
import ShippingMethodSection from './ShippingMethodSection';
import AdditionalNotesSection from './AdditionalNotesSection';
import OrderSummarySection from './OrderSummarySection';
import './CheckoutForm.css';

export function EnhancedCheckoutForm() {
  console.log('[CHECKOUT] EnhancedCheckoutForm component mounted');
  
  const { getTotalPrice } = useBasketContext();
  
  // Calculate total including shipping
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

  // Real-time validation hook
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

  // Cleanup on unmount
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

  // Enhanced change handler with real-time validation
  const handleEnhancedChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    // Update form data
    handleChange(e);
    
    // Trigger real-time validation
    handleFieldChange(name, fieldValue);
  }, [handleChange, handleFieldChange]);

  // Enhanced blur handler
  const handleEnhancedBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleFieldBlur(name, value);
  }, [handleFieldBlur]);

  // Enhanced submit handler with comprehensive validation
  const handleEnhancedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if form is valid using real-time validation
    if (!isFormValid()) {
      setError('Molimo ispravite greške u formi prije slanja.');
      return;
    }
    
    // Proceed with original submit logic
    handleSubmit(e);
  };

  const handlePaymentButtonClickWrapper = () => {
    // Validate form before proceeding to payment
    if (!isFormValid()) {
      setError('Molimo ispravite greške u formi prije nastavka na plaćanje.');
      return;
    }
    
    handlePaymentButtonClick(stripePaymentState);
  };

  return (
    <div className="checkout-form-container">
      <div className="enhanced-checkout-form">
        <form onSubmit={handleEnhancedSubmit} className="checkout-form">
          {/* Enhanced customer info with real-time validation */}
          <div className="form-section">
            <h3>Podaci o kupcu</h3>
            <ValidatedInput
              name="fullName"
              label="Puno ime"
              value={formData.fullName}
              onChange={handleEnhancedChange}
              onBlur={handleEnhancedBlur}
              placeholder="Unesite vaše puno ime"
              required
              showError={!!shouldShowError('fullName')}
              showSuccess={!!shouldShowSuccess('fullName')}
              showWarning={!!shouldShowWarning('fullName')}
              isValidating={getFieldState('fullName').isValidating}
              errorMessage={getFieldError('fullName')}
              warningMessage={getFieldWarning('fullName')}
              autoComplete="name"
            />
            
            <ValidatedInput
              name="email"
              label="Email adresa"
              type="email"
              value={formData.email}
              onChange={handleEnhancedChange}
              onBlur={handleEnhancedBlur}
              placeholder="vaš@email.com"
              required
              showError={!!shouldShowError('email')}
              showSuccess={!!shouldShowSuccess('email')}
              showWarning={!!shouldShowWarning('email')}
              isValidating={getFieldState('email').isValidating}
              errorMessage={getFieldError('email')}
              warningMessage={getFieldWarning('email')}
              autoComplete="email"
            />
          </div>
          
          <div className="form-section">
            <PhoneNumberSection 
              formData={formData} 
              phoneValidation={phoneValidation}
              handleChange={handleEnhancedChange}
            />
          </div>
          
          {/* Enhanced billing address */}
          <div className="form-section">
            <h3>Adresa naplate</h3>
            <ValidatedInput
              name="address"
              label="Adresa"
              value={formData.address}
              onChange={handleEnhancedChange}
              onBlur={handleEnhancedBlur}
              placeholder="Unesite vašu adresu"
              required
              showError={!!shouldShowError('address')}
              showSuccess={!!shouldShowSuccess('address')}
              showWarning={!!shouldShowWarning('address')}
              isValidating={getFieldState('address').isValidating}
              errorMessage={getFieldError('address')}
              warningMessage={getFieldWarning('address')}
              autoComplete="street-address"
            />
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <ValidatedInput
                name="city"
                label="Grad"
                value={formData.city}
                onChange={handleEnhancedChange}
                onBlur={handleEnhancedBlur}
                placeholder="Grad"
                required
                showError={!!shouldShowError('city')}
                showSuccess={!!shouldShowSuccess('city')}
                showWarning={!!shouldShowWarning('city')}
                isValidating={getFieldState('city').isValidating}
                errorMessage={getFieldError('city')}
                warningMessage={getFieldWarning('city')}
                autoComplete="address-level2"
              />
              
              <ValidatedInput
                name="postalCode"
                label="Poštanski broj"
                value={formData.postalCode}
                onChange={handleEnhancedChange}
                onBlur={handleEnhancedBlur}
                placeholder="10000"
                required
                pattern="[0-9]{5}"
                title="Unesite 5-znamenkasti poštanski broj"
                showError={!!shouldShowError('postalCode')}
                showSuccess={!!shouldShowSuccess('postalCode')}
                showWarning={!!shouldShowWarning('postalCode')}
                isValidating={getFieldState('postalCode').isValidating}
                errorMessage={getFieldError('postalCode')}
                warningMessage={getFieldWarning('postalCode')}
                autoComplete="postal-code"
              />
            </div>
          </div>
          
          <div className="form-section">
            <CompanyInfoSection 
              formData={formData} 
              handleChange={handleEnhancedChange}
            />
          </div>
          
          <ShippingAddressSection 
            formData={formData} 
            handleChange={handleEnhancedChange}
          />
          
          <div className="form-section">
            <PaymentMethodSection />
          </div>
          
          <div className="form-section">
            <ShippingMethodSection 
              formData={formData} 
              handleChange={handleEnhancedChange} 
            />
          </div>
          
          <div className="form-section">
            <AdditionalNotesSection 
              formData={formData} 
              handleChange={handleEnhancedChange}
            />
          </div>
          
          {formStatus.error && (
            <div className="checkout-error" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {formStatus.error}
            </div>
          )}
          
          <button 
            type="submit" 
            className={`checkout-submit-btn ${!isFormValid() ? 'disabled' : ''}`}
            disabled={formStatus.submitting || !isFormValid()}
            aria-busy={formStatus.submitting ? "true" : "false"}
            onClick={handlePaymentButtonClickWrapper}
          >
            {formStatus.submitting ? (
              <>
                <span className="loading-spinner"></span>
                <span>Obrađuje se...</span>
              </>
            ) : (
              <>
                <span>Nastavi na plaćanje</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>
        
        <OrderSummarySection shippingMethod={formData.shippingMethod} />
      </div>
      
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