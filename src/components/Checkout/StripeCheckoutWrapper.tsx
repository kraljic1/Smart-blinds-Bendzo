import { useState, useEffect, useCallback } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe, checkStripeAvailability, getBrowserCompatibilityInfo } from '../../config/stripe';
import { StripePaymentForm } from './StripePaymentForm';
import { BraveBrowserGuide } from './BraveBrowserGuide';
import { CookieConsentNotice } from './CookieConsentNotice';
import { CookieTroubleshootingGuide } from './CookieTroubleshootingGuide';

interface StripeCheckoutWrapperProps {
  amount: number;
  currency?: string;
  clientSecret: string;
  onPaymentSuccess: (paymentMethodId: string) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
}

export function StripeCheckoutWrapper({
  amount,
  currency = 'eur',
  clientSecret,
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
  const [browserInfo, setBrowserInfo] = useState<ReturnType<typeof getBrowserCompatibilityInfo> | null>(null);

  const initializeStripe = useCallback(async () => {
    try {
      setInitializationError(null);
      console.log('Initializing Stripe with enhanced loading...');
      
      const stripe = getStripe();
      setStripePromise(stripe);
      
      const available = await checkStripeAvailability();
      setStripeAvailable(available);
      setStripeLoaded(true);
      
      if (!available) {
        const errorMsg = browserInfo?.isPrivacyMode 
          ? 'Stripe nije dostupan u privatnom pregledniku. Možda su kolačići blokirani.'
          : 'Stripe nije dostupan. Molimo pokušajte ponovno.';
        setInitializationError(errorMsg);
        onPaymentError(errorMsg);
      } else {
        console.log('Stripe initialized successfully with enhanced loading');
      }
    } catch (error) {
      console.error('Stripe initialization error:', error);
      setStripeLoaded(true);
      setStripeAvailable(false);
      
      const errorMsg = browserInfo?.isPrivacyMode
        ? 'Greška pri učitavanju Stripe servisa u privatnom pregledniku. Možda su kolačići blokirani.'
        : 'Greška pri učitavanju Stripe servisa. Molimo pokušajte ponovno.';
      setInitializationError(errorMsg);
      onPaymentError(errorMsg);
    }
  }, [browserInfo?.isPrivacyMode, onPaymentError]);

  useEffect(() => {
    // Get browser compatibility information
    const compatInfo = getBrowserCompatibilityInfo();
    setBrowserInfo(compatInfo);
    
    console.log('Browser compatibility info:', compatInfo);
    
    // Check existing cookie consent
    const consent = localStorage.getItem('stripe-cookie-consent');
    if (consent === 'accepted') {
      setCookieConsent('accepted');
      initializeStripe();
    } else if (consent === 'declined') {
      setCookieConsent('declined');
    } else if (!compatInfo.isPrivacyMode) {
      // For non-privacy browsers, auto-accept and initialize
      setCookieConsent('accepted');
      localStorage.setItem('stripe-cookie-consent', 'accepted');
      initializeStripe();
    }
  }, [initializeStripe]);

  const handleCookieAccept = () => {
    setCookieConsent('accepted');
    localStorage.setItem('stripe-cookie-consent', 'accepted');
    initializeStripe();
  };

  const handleCookieDecline = () => {
    setCookieConsent('declined');
    localStorage.setItem('stripe-cookie-consent', 'declined');
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

  // Show cookie consent notice if pending and privacy browser detected
  if (cookieConsent === 'pending' && browserInfo?.isPrivacyMode) {
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
        <p>
          {browserInfo?.isPrivacyMode 
            ? 'Učitavam Stripe sa poboljšanom kompatibilnošću...' 
            : 'Učitavam Stripe...'
          }
        </p>
        {browserInfo?.isPrivacyMode && (
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '8px' }}>
            Detektovan je privatni preglednik. Koristim optimizovanu strategiju učitavanja.
          </p>
        )}
      </div>
    );
  }

  // Show error if Stripe is not available
  if (!stripeAvailable || !stripePromise) {
    return (
      <div className="stripe-error">
        <h3>Problem sa učitavanjem plaćanja</h3>
        <p>{initializationError || 'Stripe servis trenutno nije dostupan.'}</p>
        {browserInfo?.isPrivacyMode && (
          <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '6px', margin: '16px 0', fontSize: '0.9rem' }}>
            <strong>Privatni preglednik detektovan:</strong> {browserInfo.isBrave ? 'Brave' : browserInfo.isFirefoxStrict ? 'Firefox (strikt mod)' : 'Safari'}
            <br />
            Pokušavam sa poboljšanim strategijama učitavanja...
          </div>
        )}
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
        clientSecret={clientSecret}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={disabled}
      />
    </Elements>
  );
} 