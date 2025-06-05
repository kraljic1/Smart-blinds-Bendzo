import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../../config/stripe';
import { StripePaymentForm } from './StripePaymentForm';
import { BraveCompatibilityWarning } from '../Payment/BraveCompatibilityWarning';
import { PaymentState } from './CheckoutFormTypes';
import { BrowserInfo } from '../../utils/browserDetection';

interface PaymentSectionProps {
  paymentState: PaymentState;
  totalAmount: number;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: unknown) => void;
  onClosePayment: () => void;
  onBrowserDetected: (info: BrowserInfo) => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentState,
  totalAmount,
  onPaymentSuccess,
  onPaymentError,
  onClosePayment,
  onBrowserDetected
}) => {
  if (!paymentState.showStripeForm) {
    return null;
  }

  return (
    <div className="payment-section">
      <BraveCompatibilityWarning 
        onBrowserDetected={onBrowserDetected}
        className="mb-4"
      />
      <Elements stripe={getStripe()}>
        <StripePaymentForm 
          amount={totalAmount}
          currency="EUR"
          clientSecret={paymentState.clientSecret}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
          onClose={onClosePayment}
        />
      </Elements>
    </div>
  );
}; 