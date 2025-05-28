/**
 * Stripe configuration
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe publishable key (starts with pk_)
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Stripe API version - using stable version for reliability
const stripeApiVersion = import.meta.env.VITE_STRIPE_API_VERSION || '2024-06-20';

if (!stripePublishableKey) {
  console.warn('⚠️ VITE_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
  console.warn('Please create a .env file with your Stripe keys. See STRIPE_SETUP.md for details.');
}

// Initialize Stripe with privacy-browser friendly options
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey || '', {
      // Use locale to ensure proper loading
      locale: 'auto',
      // Enhanced privacy settings for third-party cookie compatibility
      // Note: stripeAccount is omitted (equivalent to undefined) - operations default to platform account
      apiVersion: stripeApiVersion,
    }).catch((error) => {
      console.warn('Stripe loading failed, this may be due to browser privacy settings:', error);
      // Return null instead of throwing to allow graceful degradation
      return null;
    });
  }
  return stripePromise;
};

export const checkStripeAvailability = async (): Promise<boolean> => {
  try {
    const stripe = await getStripe();
    return stripe !== null;
  } catch {
    return false;
  }
};

export { stripePublishableKey, stripeApiVersion }; 