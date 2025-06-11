import React from 'react';
import { useCheckoutFormSubmission } from './CheckoutForm/hooks';
import { CheckoutFormWrapper, CheckoutFormContent } from './CheckoutForm/components';
import CheckoutSuccess from './CheckoutSuccess';

export function CheckoutForm() {
 const {
 formRef,
 formData,
 formStatus,
 items,
 getTotalPrice,
 handleChange,
 handleSubmit
 } = useCheckoutFormSubmission();
 
 if (formStatus.success) {
 return <CheckoutSuccess email={formData.email as string} />;
 }
 
 return (
 <div className="checkout-form-container">
 <h2>Checkout</h2>
 
 <CheckoutFormWrapper
 formRef={formRef}
 items={items}
 getTotalPrice={getTotalPrice}
 onSubmit={handleSubmit}
 >
 <CheckoutFormContent
 formData={formData}
 formStatus={formStatus}
 items={items}
 getTotalPrice={getTotalPrice}
 handleChange={handleChange}
 />
 </CheckoutFormWrapper>
 </div>
 );
} 