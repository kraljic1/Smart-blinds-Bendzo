/**
 * Stripe instance management utilities
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { safeLog } from '../errorHandler';
import { getStripePublishableKey } from './config';

let stripePromise: Promise<Stripe | null>;

/**
 * Get Stripe instance with secure error handling
 */
export const getStripe = (): Promise<Stripe | null> => {
 if (!stripePromise) {
 const publishableKey = getStripePublishableKey();
 
 if (!publishableKey) {
 safeLog.warn('Stripe publishable key not configured');
 return Promise.resolve(null);
 }
 
 stripePromise = loadStripe(publishableKey);
 }
 
 return stripePromise;
}; 