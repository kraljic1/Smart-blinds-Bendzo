/**
 * Stripe payment processing utilities
 */

import { safeLog, sanitizeErrorMessage } from '../errorHandler';
import { getStripe } from './stripeInstance';

/**
 * Processes a Stripe payment using Payment Elements
 */
export async function processStripePayment(
  clientSecret: string,
  paymentMethodId: string,
  returnUrl: string = `${window.location.origin}/thank-you`
): Promise<{ success: boolean; error?: string }> {
  try {
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId,
      return_url: returnUrl,
    });

    if (error) {
      return {
        success: false,
        error: sanitizeErrorMessage(error, 'payment')
      };
    }

    if (paymentIntent?.status === 'succeeded') {
      return { success: true };
    } else {
      return {
        success: false,
        error: sanitizeErrorMessage(null, 'payment')
      };
    }
  } catch (error) {
    safeLog.error('Error processing Stripe payment', error);
    return {
      success: false,
      error: sanitizeErrorMessage(error, 'payment')
    };
  }
} 