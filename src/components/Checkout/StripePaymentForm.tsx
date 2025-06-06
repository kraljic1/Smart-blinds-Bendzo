import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import './StripePaymentForm.css';

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  clientSecret: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  onClose?: () => void;
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
  onClose,
  disabled = false 
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    // Add class to body to prevent scrolling
    document.body.classList.add('modal-open');
    
    // Handle Escape key to close modal
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        document.body.classList.remove('modal-open');
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    // Cleanup function to remove class and event listener when component unmounts
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

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
      // Confirm the payment intent
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
        document.body.classList.remove('modal-open');
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close modal if clicking on the overlay (not the modal content)
    if (e.target === e.currentTarget && onClose) {
      document.body.classList.remove('modal-open');
      onClose();
    }
  };

  return (
    <div className="stripe-payment-form-overlay" onClick={handleOverlayClick}>
      <div className="stripe-payment-form-container">
        <form onSubmit={handleSubmit} className="stripe-payment-form">
          <div className="payment-header">
            <div className="payment-header-top">
              <h2>Završi plaćanje</h2>
              {onClose && (
                <button 
                  type="button" 
                  onClick={() => {
                    document.body.classList.remove('modal-open');
                    onClose();
                  }}
                  className="close-button"
                  aria-label="Zatvori"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <div className="payment-amount">
              <span>Ukupno: {amount.toFixed(2)} {currency.toUpperCase()}</span>
            </div>
          </div>
          
          <div className="card-element-container">
            <label htmlFor="card-element">
              Podaci o kartici
            </label>
            <div id="card-element">
              <CardElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardChange}
              />
            </div>
            
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