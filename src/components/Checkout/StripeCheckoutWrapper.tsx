import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe, checkStripeAvailability } from '../../config/stripe';
import { StripePaymentForm } from './StripePaymentForm';
import { BraveBrowserGuide } from './BraveBrowserGuide';
import { CookieConsentNotice } from './CookieConsentNotice';
import { CookieTroubleshootingGuide } from './CookieTroubleshootingGuide';

interface StripeCheckoutWrapperProps {
  amount: number;
  currency?: string;
  onPaymentSuccess: (paymentMethodId: string) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
}

export function StripeCheckoutWrapper({
  amount,
  currency = 'eur',
  onPaymentSuccess,
  onPaymentError,
  disabled = false
}: StripeCheckoutWrapperProps) {
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [stripeAvailable, setStripeAvailable] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof getStripe> | null>(null);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  useEffect(() => {
    // Check existing cookie consent
    const consent = localStorage.getItem('stripe-cookie-consent');
    if (consent === 'accepted') {
      setCookieConsent('accepted');
      initializeStripe();
    } else if (consent === 'declined') {
      setCookieConsent('declined');
    }
  }, []);

  const initializeStripe = async () => {
    try {
      setInitializationError(null);
      const stripe = getStripe();
      setStripePromise(stripe);
      
      const available = await checkStripeAvailability();
      setStripeAvailable(available);
      setStripeLoaded(true);
      
      if (!available) {
        setInitializationError('Stripe nije dostupan. Možda su kolačići blokirani.');
        onPaymentError('Stripe nije dostupan. Molimo koristite drugi način plaćanja.');
      }
    } catch (error) {
      console.error('Stripe initialization error:', error);
      setStripeLoaded(true);
      setStripeAvailable(false);
      setInitializationError('Greška pri učitavanju Stripe servisa. Možda su kolačići blokirani.');
      onPaymentError('Greška pri učitavanju Stripe servisa.');
    }
  };

  const handleCookieAccept = () => {
    setCookieConsent('accepted');
    initializeStripe();
  };

  const handleCookieDecline = () => {
    setCookieConsent('declined');
    onPaymentError('Plaćanje karticom nije dostupno bez prihvatanja kolačića. Molimo izaberite gotovinu kao način plaćanja.');
  };

  const handleRetry = () => {
    setShowTroubleshooting(false);
    // Clear any stored consent to show the consent notice again
    localStorage.removeItem('stripe-cookie-consent');
    setCookieConsent('pending');
    setStripeLoaded(false);
    setStripeAvailable(false);
    setInitializationError(null);
  };

  // Show cookie consent notice if pending
  if (cookieConsent === 'pending') {
    return (
      <CookieConsentNotice
        onAccept={handleCookieAccept}
        onDecline={handleCookieDecline}
      />
    );
  }

  // Show troubleshooting guide if requested
  if (showTroubleshooting) {
    return (
      <CookieTroubleshootingGuide
        onClose={() => setShowTroubleshooting(false)}
        onRetry={handleRetry}
      />
    );
  }

  // Show message if cookies were declined
  if (cookieConsent === 'declined') {
    return (
      <div className="stripe-unavailable">
        <h3>Plaćanje karticom nije dostupno</h3>
        <p>
          Niste prihvatili kolačiće potrebne za plaćanje karticom. 
          Molimo izaberite gotovinu kao način plaćanja.
        </p>
        <div className="unavailable-actions">
          <button 
            onClick={() => {
              localStorage.removeItem('stripe-cookie-consent');
              setCookieConsent('pending');
            }}
            className="retry-button"
          >
            Pokušaj ponovo
          </button>
          <button 
            onClick={() => setShowTroubleshooting(true)}
            className="help-button"
          >
            Pomoć sa kolačićima
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (!stripeLoaded) {
    return (
      <div className="stripe-loading">
        <div className="loading-spinner"></div>
        <p>Učitavam Stripe...</p>
      </div>
    );
  }

  // Show error if Stripe is not available
  if (!stripeAvailable || !stripePromise) {
    return (
      <div className="stripe-error">
        <h3>Problem sa učitavanjem plaćanja</h3>
        <p>{initializationError || 'Stripe servis trenutno nije dostupan.'}</p>
        <div className="error-actions">
          <button onClick={handleRetry} className="retry-button">
            Pokušaj ponovo
          </button>
          <button 
            onClick={() => setShowTroubleshooting(true)}
            className="help-button"
          >
            Rešavanje problema
          </button>
        </div>
        <BraveBrowserGuide onRetry={handleRetry} />
      </div>
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