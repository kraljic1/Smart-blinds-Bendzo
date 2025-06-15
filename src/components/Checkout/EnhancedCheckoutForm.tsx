import React from 'react';
import { useEnhancedCheckout } from './EnhancedCheckoutForm/hooks';
import { CheckoutFormSection, PaymentSections } from './EnhancedCheckoutForm/components';
import './Checkout.css';

export function EnhancedCheckoutForm() {
 const {
 formData,
 formStatus,
 phoneValidation,
 calculateTotalWithShipping,
 validationHooks,
 paymentStateHooks,
 paymentHandlingHooks,
 handleEnhancedChange,
 handleEnhancedBlur,
 handleEnhancedSubmit,
 handlePaymentButtonClickWrapper
 } = useEnhancedCheckout();

 return (
 <div className="checkout-form-container">
 <CheckoutFormSection
 formData={formData}
 formStatus={formStatus}
 phoneValidation={phoneValidation}
 handleEnhancedChange={handleEnhancedChange}
 handleEnhancedBlur={handleEnhancedBlur}
 handleEnhancedSubmit={handleEnhancedSubmit}
 handlePaymentButtonClickWrapper={() => handlePaymentButtonClickWrapper(paymentStateHooks.paymentState)}
 validationHooks={validationHooks}
 />
 
 <PaymentSections
 paymentStateHooks={paymentStateHooks}
 paymentHandlingHooks={paymentHandlingHooks}
 calculateTotalWithShipping={calculateTotalWithShipping}
 />
 </div>
 );
} 