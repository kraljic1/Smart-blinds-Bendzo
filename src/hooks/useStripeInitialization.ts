import { useState, useEffect, useCallback } from 'react';
import { getStripe, checkStripeAvailability, getBrowserCompatibilityInfo } from '../config/stripe';

interface UseStripeInitializationProps {
  onPaymentError: (error: string) => void;
}

export const useStripeInitialization = ({ onPaymentError }: UseStripeInitializationProps) => {
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [stripeAvailable, setStripeAvailable] = useState(false);
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof getStripe> | null>(null);
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
  }, []);

  const resetStripe = () => {
    setStripeLoaded(false);
    setStripeAvailable(false);
    setInitializationError(null);
    setStripePromise(null);
  };

  return {
    stripeLoaded,
    stripeAvailable,
    stripePromise,
    initializationError,
    browserInfo,
    initializeStripe,
    resetStripe
  };
}; 