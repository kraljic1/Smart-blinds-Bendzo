/**
 * Configuration utilities for Stripe payment processing
 */

/**
 * Get the correct base URL for API calls
 */
export const getApiBaseUrl = (): string => {
  // In development, use the Netlify dev server URL
  if (import.meta.env.DEV) {
    return 'http://localhost:8901';
  }
  // In production, use the configured app URL or current origin
  return import.meta.env.VITE_APP_URL || window.location.origin;
};

/**
 * Get Stripe publishable key from environment
 */
export const getStripePublishableKey = (): string | undefined => {
  return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
}; 