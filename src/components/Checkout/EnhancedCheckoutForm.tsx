import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useBasketContext } from '../../hooks/useBasketContext';
import { useCheckoutForm } from './useCheckoutForm';
import { createPaymentIntent } from '../../utils/stripeUtils';
import { getStripe } from '../../config/stripe';
import { FormData } from './CheckoutFormTypes';
import CustomerInfoSection from './CustomerInfoSection';
import PhoneNumberSection from './PhoneNumberSection';
import BillingAddressSection from './BillingAddressSection';
import CompanyInfoSection from './CompanyInfoSection';
import ShippingAddressSection from './ShippingAddressSection';
import PaymentMethodSection from './PaymentMethodSection';
import ShippingMethodSection from './ShippingMethodSection';
import AdditionalNotesSection from './AdditionalNotesSection';
import OrderSummarySection from './OrderSummarySection';
import { StripePaymentForm } from './StripePaymentForm';
import { PaymentSuccess } from './PaymentSuccess';
import './CheckoutForm.css';

export function EnhancedCheckoutForm() {
  const { items, getTotalPrice } = useBasketContext();
  const {
    formData,
    formStatus,
    phoneValidation,
    paymentState,
    handleChange,
    setError,
    setSubmitting,
    setPaymentState
  } = useCheckoutForm();

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    paymentIntentId: string;
    amount: number;
    currency: string;
    customerEmail: string;
    customerName: string;
  } | null>(null);

  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log('Payment successful:', paymentIntentId);
    
    // Set order details for success page
    setOrderDetails({
      paymentIntentId,
      amount: getTotalPrice(),
      currency: 'EUR',
      customerEmail: formData.email,
      customerName: formData.fullName
    });
    
    // Show success page
    setOrderComplete(true);
    
    // Hide payment form
    setPaymentState(prev => ({
      ...prev,
      showStripeForm: false,
      processingPayment: false
    }));
  };

  const handlePaymentError = (error: string) => {
    console.log('Payment error:', error);
    setError(error);
    
    // Hide payment form on error so user can try again
    setPaymentState(prev => ({
      ...prev,
      showStripeForm: false,
      processingPayment: false
    }));
  };

  const handleContinueShopping = () => {
    // Reset everything and redirect to home
    setOrderComplete(false);
    setOrderDetails(null);
    setPaymentState({
      clientSecret: '',
      paymentIntentId: '',
      showStripeForm: false,
      processingPayment: false
    });
    
    // Navigate to home page
    window.location.href = '/';
  };

  // Show success page if order is complete
  if (orderComplete && orderDetails) {
    return (
      <PaymentSuccess 
        orderDetails={orderDetails}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted!');
    console.log('Form data:', formData);
    console.log('Phone validation:', phoneValidation);
    
    // Validate ALL required fields
    const allRequiredFields = [
      { field: 'fullName', message: 'Molimo unesite vaše puno ime' },
      { field: 'email', message: 'Molimo unesite email adresu' },
      { field: 'phoneNumber', message: 'Molimo unesite broj telefona' },
      { field: 'address', message: 'Molimo unesite adresu' },
      { field: 'city', message: 'Molimo unesite grad' },
      { field: 'postalCode', message: 'Molimo unesite poštanski broj' }
    ];

    // Add shipping fields to required if different from billing
    if (!formData.sameAsBilling) {
      allRequiredFields.push(
        { field: 'shippingAddress', message: 'Molimo unesite adresu dostave' },
        { field: 'shippingCity', message: 'Molimo unesite grad dostave' },
        { field: 'shippingPostalCode', message: 'Molimo unesite poštanski broj dostave' }
      );
    }

    // Validate all required fields
    for (const { field, message } of allRequiredFields) {
      const fieldValue = formData[field as keyof FormData];
      if (!fieldValue || !fieldValue.toString().trim()) {
        console.log(`Required field missing: ${field}`);
        setError(message);
        return;
      }
    }

    // Validate company fields if R1 invoice is requested
    if (formData.needsR1Invoice) {
      if (!formData.companyName.trim()) {
        console.log('Company name missing for R1 invoice');
        setError('Molimo unesite naziv tvrtke za R1 račun');
        return;
      }
      if (!formData.companyOib.trim()) {
        console.log('Company OIB missing for R1 invoice');
        setError('Molimo unesite OIB tvrtke za R1 račun');
        return;
      }
    }
    
    if (!phoneValidation.isValid) {
      console.log('Phone validation failed:', phoneValidation);
      setError('Molimo unesite važeći broj telefona');
      return;
    }

    try {
      console.log('Starting payment intent creation...');
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

      console.log('Payment intent data:', paymentIntentData);
      const paymentData = await createPaymentIntent(paymentIntentData);
      console.log('Payment response:', paymentData);

      if (paymentData.success && paymentData.clientSecret && paymentData.paymentIntentId) {
        setPaymentState({
          clientSecret: paymentData.clientSecret,
          paymentIntentId: paymentData.paymentIntentId,
          showStripeForm: true,
          processingPayment: false
        });
      } else {
        setError(paymentData.error || 'Neuspješno pokretanje plaćanja. Molimo pokušajte ponovno.');
      }
    } catch (error) {
      console.error('Payment setup error:', error);
      console.log('Error details:', error);
      setError('Neuspješno pokretanje plaćanja. Molimo pokušajte ponovno.');
    } finally {
      console.log('Setting submitting to false');
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
            onClick={() => {
              console.log('Button clicked!');
              console.log('Form status:', formStatus);
              console.log('Phone validation:', phoneValidation);
            }}
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
      
      {paymentState.showStripeForm && (
        <Elements stripe={getStripe()}>
          <StripePaymentForm 
            amount={getTotalPrice()}
            currency="EUR"
            clientSecret={paymentState.clientSecret}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </Elements>
      )}
    </div>
  );
} 