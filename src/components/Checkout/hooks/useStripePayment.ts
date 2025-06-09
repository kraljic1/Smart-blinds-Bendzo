import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';

interface UseStripePaymentProps {
  clientSecret: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
}

interface UseStripePaymentReturn {
  isProcessing: boolean;
  cardError: string | null;
  cardComplete: boolean;
  handleCardChange: (event: StripeCardElementChangeEvent) => void;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  canSubmit: boolean;
}

export function useStripePayment({
  clientSecret,
  onPaymentSuccess,
  onPaymentError,
  disabled = false
}: UseStripePaymentProps): UseStripePaymentReturn {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardError(event.error ? event.error.message : null);
    setCardComplete(event.complete);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    console.log('[STRIPE] Payment form submitted');
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('[STRIPE] Stripe or elements not available');
      return;
    }

    if (isProcessing || disabled) {
      console.log('[STRIPE] Already processing or disabled');
      return;
    }

    console.log('[STRIPE] Starting payment processing...');
    setIsProcessing(true);
    setCardError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log('[STRIPE] Card element not found');
      setCardError('Card element not found');
      setIsProcessing(false);
      return;
    }

    try {
      console.log('[STRIPE] Confirming card payment with client configuration');
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (error) {
        console.error('[STRIPE] Payment confirmation error:', error);
        setCardError(error.message || 'An error occurred');
        onPaymentError(error.message || 'Payment confirmation failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('[STRIPE] Payment completed successfully');
        onPaymentSuccess(paymentIntent.id);
      } else {
        console.log('[STRIPE] Payment intent status:', paymentIntent?.status);
        setCardError('Payment was not completed successfully');
        onPaymentError('Payment was not completed successfully');
      }
    } catch (error) {
      console.error('[STRIPE] Payment processing failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setCardError(errorMessage);
      onPaymentError(errorMessage);
    } finally {
      console.log('[STRIPE] Setting processing to false');
      setIsProcessing(false);
    }
  };

  const canSubmit = Boolean(stripe && cardComplete && !isProcessing && !disabled);

  return {
    isProcessing,
    cardError,
    cardComplete,
    handleCardChange,
    handleSubmit,
    canSubmit
  };
} 