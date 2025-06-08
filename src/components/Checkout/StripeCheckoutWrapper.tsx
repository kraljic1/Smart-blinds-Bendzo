import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { StripePaymentForm } from './StripePaymentForm';
import { CookieConsentNotice } from './CookieConsentNotice';
import { CookieTroubleshootingGuide } from './CookieTroubleshootingGuide';
import StripeLoadingState from './StripeLoadingState';
import StripeErrorState from './StripeErrorState';
import CookieDeclinedState from './CookieDeclinedState';
import { useStripeInitialization } from '../../hooks/useStripeInitialization';
import { useCookieConsent } from '../../hooks/useCookieConsent';

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
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const {
    stripeLoaded,
    stripeAvailable,
    stripePromise,
    initializationError,
    browserInfo,
    initializeStripe,
    resetStripe
  } = useStripeInitialization({ onPaymentError });

  const {
    cookieConsent,
    handleCookieAccept,
    handleCookieDecline,
    resetConsent
  } = useCookieConsent({
    isPrivacyMode: browserInfo?.isPrivacyMode || false,
    onInitializeStripe: initializeStripe,
    onPaymentError
  });

  const handleRetry = () => {
    setShowTroubleshooting(false);
    resetConsent();
    resetStripe();
  };

  const handleRetryFromDeclined = () => {
    resetConsent();
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
      <CookieDeclinedState
        onRetry={handleRetryFromDeclined}
        onShowTroubleshooting={() => setShowTroubleshooting(true)}
      />
    );
  }

  // Show loading state
  if (!stripeLoaded) {
    return <StripeLoadingState browserInfo={browserInfo} />;
  }

  // Show error if Stripe is not available
  if (!stripeAvailable || !stripePromise) {
    return (
      <StripeErrorState
        initializationError={initializationError}
        browserInfo={browserInfo}
        onRetry={handleRetry}
        onShowTroubleshooting={() => setShowTroubleshooting(true)}
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
        clientSecret={clientSecret}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={disabled}
      />
    </Elements>
  );
} 