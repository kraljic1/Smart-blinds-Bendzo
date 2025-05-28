import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import './StripePaymentForm.css';

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  clientSecret: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
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
  clientSecret,
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
      // Confirm the payment intent
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (error) {
        console.error('Payment confirmation error:', error);
        setCardError(error.message || 'An error occurred');
        onPaymentError(error.message || 'Payment confirmation failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
        onPaymentSuccess(paymentIntent.id);
      } else {
        console.log('Payment intent status:', paymentIntent?.status);
        setCardError('Payment was not completed successfully');
        onPaymentError('Payment was not completed successfully');
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setCardError(errorMessage);
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="stripe-payment-form-overlay">
      <div className="stripe-payment-form-container">
        <form onSubmit={handleSubmit} className="stripe-payment-form">
          <div className="payment-header">
            <h2>Završi plaćanje</h2>
            <div className="payment-amount">
              <span>Ukupno: {amount.toFixed(2)} {currency.toUpperCase()}</span>
            </div>
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

          <div className="payment-actions">
            <button
              type="submit"
              disabled={!stripe || !cardComplete || isProcessing || disabled}
              className={`payment-submit-button ${isProcessing ? 'processing' : ''}`}
            >
              {isProcessing ? (
                <>
                  <span className="loading-spinner"></span>
                  Obrađujem plaćanje...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  Plati {amount.toFixed(2)} {currency.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 