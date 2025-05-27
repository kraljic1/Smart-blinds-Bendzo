import React from 'react';
import { useBasketContext } from '../../hooks/useBasketContext';
import { useCheckoutForm } from './useCheckoutForm';
import { createPaymentIntent } from '../../utils/stripeUtils';
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
  const { items, getTotalPrice } = useBasketContext();
  const {
    formData,
    formStatus,
    phoneValidation,
    handleChange,
    setError,
    setSubmitting,
    setPaymentState
  } = useCheckoutForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!phoneValidation.isValid) {
      setError('Please enter a valid phone number');
      return;
    }

    try {
      setSubmitting(true);
      
      const paymentIntentData = {
        amount: getTotalPrice(),
        currency: 'eur',
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.phoneCode}${formData.phoneNumber}`,
          address: `${formData.address}, ${formData.postalCode} ${formData.city}`,
          shippingAddress: formData.sameAsBilling 
            ? `${formData.address}, ${formData.postalCode} ${formData.city}`
            : `${formData.shippingAddress}, ${formData.shippingPostalCode} ${formData.shippingCity}`,
          needsR1Invoice: formData.needsR1Invoice,
          companyName: formData.needsR1Invoice ? formData.companyName : undefined,
          companyOib: formData.needsR1Invoice ? formData.companyOib : undefined
        },
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          options: {}
        })),
        metadata: {
          shippingMethod: formData.shippingMethod,
          additionalNotes: formData.additionalNotes || ''
        }
      };

      const paymentData = await createPaymentIntent(paymentIntentData);

      if (paymentData.success && paymentData.clientSecret && paymentData.paymentIntentId) {
        setPaymentState({
          clientSecret: paymentData.clientSecret,
          paymentIntentId: paymentData.paymentIntentId,
          showStripeForm: true,
          processingPayment: false
        });
      } else {
        setError(paymentData.error || 'Failed to initialize payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment setup error:', error);
      setError('Failed to initialize payment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-form-container">
      <div className="enhanced-checkout-form">
        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
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
          
          <CompanyInfoSection 
            formData={formData} 
            handleChange={handleChange} 
          />
          
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
    </div>
  );
} 