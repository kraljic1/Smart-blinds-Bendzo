import React from 'react';
import { useBasketContext } from '../../hooks/useBasketContext';
import { useCheckoutForm } from './useCheckoutForm';
import { usePaymentHandling } from './hooks/usePaymentHandling';
import { usePaymentState } from './hooks/usePaymentState';
import { useFormSubmission } from './hooks/useFormSubmission';
import { PaymentSection } from './PaymentSection';
import { PaymentSuccess } from './PaymentSuccess';
import CustomerInfoSection from './CustomerInfoSection';
import PhoneNumberSection from './PhoneNumberSection';
import BillingAddressSection from './BillingAddressSection';
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
  
  const {
    formData,
    formStatus,
    phoneValidation,
    handleChange,
    setError,
    setSubmitting
  } = useCheckoutForm();

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

  const handlePaymentButtonClickWrapper = () => {
    handlePaymentButtonClick(stripePaymentState);
  };

  return (
    <div className="checkout-form-container">
      <div className="enhanced-checkout-form">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <CustomerInfoSection 
              formData={formData} 
              handleChange={handleChange} 
            />
          </div>
          
          <div className="form-section">
            <PhoneNumberSection 
              formData={formData} 
              phoneValidation={phoneValidation}
              handleChange={handleChange} 
            />
          </div>
          
          <BillingAddressSection 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <div className="form-section">
            <CompanyInfoSection 
              formData={formData} 
              handleChange={handleChange} 
            />
          </div>
          
          <ShippingAddressSection 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <div className="form-section">
            <PaymentMethodSection />
          </div>
          
          <div className="form-section">
            <ShippingMethodSection 
              formData={formData} 
              handleChange={handleChange} 
            />
          </div>
          
          <div className="form-section">
            <AdditionalNotesSection 
              formData={formData} 
              handleChange={handleChange} 
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
            className="checkout-submit-btn"
            disabled={formStatus.submitting}
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
        
        <OrderSummarySection />
      </div>
      
      <PaymentSection
        paymentState={stripePaymentState}
        totalAmount={getTotalPrice()}
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