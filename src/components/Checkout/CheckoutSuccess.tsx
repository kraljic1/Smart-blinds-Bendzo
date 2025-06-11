import React from 'react';

interface CheckoutSuccessProps {
 email: string;
}

const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ email }) => {
 return (
 <div className="checkout-success"role="alert"aria-live="polite">
 <h2>Thank You for Your Order!</h2>
 <p>We have received your inquiry and will get back to you shortly.</p>
 <p>You should receive a confirmation on <strong>{email}</strong> soon.</p>
 </div>
 );
};

export default CheckoutSuccess; 