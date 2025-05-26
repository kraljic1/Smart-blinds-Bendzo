import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe, checkStripeAvailability } from '../../config/stripe';
import { StripePaymentForm } from './StripePaymentForm';
import { BraveBrowserGuide } from './BraveBrowserGuide';

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
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        setIsLoading(true);
        const available = await checkStripeAvailability();
        
        if (available) {
          setStripeLoaded(true);
          setStripeError(null);
        } else {
          setStripeLoaded(false);
          setStripeError('Stripe could not be loaded. This may be due to browser privacy settings.');
        }
      } catch {
        setStripeLoaded(false);
        setStripeError('Failed to initialize payment system.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeStripe();
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        background: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '3px solid #e2e8f0',
            borderTop: '3px solid #4f46e5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <p style={{ color: '#64748b', margin: 0 }}>Učitavam sustav za plaćanje...</p>
      </div>
    );
  }

  if (!stripeLoaded || stripeError) {
    return (
      <BraveBrowserGuide 
        onRetry={() => window.location.reload()} 
      />
    );
  }

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