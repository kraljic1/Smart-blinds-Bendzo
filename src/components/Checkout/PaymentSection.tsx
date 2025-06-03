import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../../config/stripe';
import { StripePaymentForm } from './StripePaymentForm';
import { BraveCompatibilityWarning } from '../Payment/BraveCompatibilityWarning';
import { ManualPaymentOption } from '../Payment/ManualPaymentOption';
import { PaymentState } from './CheckoutFormTypes';
import { BrowserInfo } from '../../utils/browserDetection';

interface PaymentSectionProps {
  paymentState: PaymentState;
  browserInfo: BrowserInfo | null;
  showManualPayment: boolean;
  totalAmount: number;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: unknown) => void;
  onClosePayment: () => void;
  onBrowserDetected: (info: BrowserInfo) => void;
  onShowManualPayment: () => void;
  onContactSupport: () => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentState,
  browserInfo,
  showManualPayment,
  totalAmount,
  onPaymentSuccess,
  onPaymentError,
  onClosePayment,
  onBrowserDetected,
  onShowManualPayment,
  onContactSupport
}) => {
  if (!paymentState.showStripeForm && !showManualPayment) {
    return null;
  }

  return (
    <div className="payment-section">
      {paymentState.showStripeForm && (
        <>
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
          
          {/* Show manual payment option for Brave users */}
          {browserInfo?.isBrave && (
            <div className="mt-6">
              <div className="text-center mb-4">
                <button
                  onClick={onShowManualPayment}
                  className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
                >
                  Having trouble with payment? Try alternative payment methods
                </button>
              </div>
            </div>
          )}
        </>
      )}
      
      {showManualPayment && (
        <div className="payment-section mt-6">
          <ManualPaymentOption
            orderTotal={totalAmount}
            currency="EUR"
            onContactSupport={onContactSupport}
            className="max-w-2xl mx-auto"
          />
        </div>
      )}
    </div>
  );
}; 