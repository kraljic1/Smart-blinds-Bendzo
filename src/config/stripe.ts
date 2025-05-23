/**
 * Stripe configuration
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe publishable key (starts with pk_)
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('⚠️ VITE_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
  console.warn('Please create a .env file with your Stripe keys. See STRIPE_SETUP.md for details.');
}

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey || '');
  }
  return stripePromise;
};

export { stripePublishableKey }; 