import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../../config/stripe';
import { StripePaymentForm } from './StripePaymentForm';

interface StripeCheckoutWrapperProps {
  amount: number;
  currency?: string;
  onPaymentSuccess: (paymentMethodId: string) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
}

const stripePromise = getStripe();

export function StripeCheckoutWrapper({
  amount,
  currency = 'eur',
  onPaymentSuccess,
  onPaymentError,
  disabled = false
}: StripeCheckoutWrapperProps) {
  const options = {
    mode: 'payment' as const,
    amount: Math.round(amount * 100), // Convert to cents
    currency: currency.toLowerCase(),
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#4f46e5',
        colorBackground: '#ffffff',
        colorText: '#333333',
        colorDanger: '#dc2626',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        spacingUnit: '4px',
        borderRadius: '6px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm
        amount={amount}
        currency={currency}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={disabled}
      />
    </Elements>
  );
} 