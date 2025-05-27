import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import './StripePaymentForm.css';

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  onPaymentSuccess: (paymentMethodId: string) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export function StripePaymentForm({ 
  amount, 
  currency, 
  onPaymentSuccess, 
  onPaymentError, 
  disabled = false 
}: StripePaymentFormProps) {
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
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (isProcessing || disabled) {
      return;
    }

    setIsProcessing(true);
    setCardError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setCardError('Card element not found');
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setCardError(error.message || 'An error occurred');
        onPaymentError(error.message || 'Payment method creation failed');
      } else if (paymentMethod) {
        onPaymentSuccess(paymentMethod.id);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setCardError(errorMessage);
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-payment-form">
      <div className="payment-amount">
        <h3>Ukupno za plaćanje: {amount.toFixed(2)} {currency.toUpperCase()}</h3>
      </div>
      
      <div className="card-element-container">
        <label>
          Podaci o kartici
        </label>
        <CardElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleCardChange}
        />
        
        {cardError && (
          <div className="card-error" role="alert">
            {cardError}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe || !cardComplete || isProcessing || disabled}
        className={`payment-submit-button ${isProcessing ? 'processing' : ''}`}
      >
        {isProcessing ? 'Obrađujem...' : 'Plati karticom'}
      </button>
    </form>
  );
} 