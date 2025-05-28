/**
 * Utility functions for Stripe payment processing
 */

import { getStripe } from '../config/stripe';

// Get the correct base URL for API calls
const getApiBaseUrl = (): string => {
  // In development, use the Netlify dev server URL
  if (import.meta.env.DEV) {
    return 'http://localhost:8901';
  }
  // In production, use the configured app URL or current origin
  return import.meta.env.VITE_APP_URL || window.location.origin;
};

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    shippingAddress?: string;
    needsR1Invoice?: boolean;
    companyName?: string;
    companyOib?: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    options?: Record<string, unknown>;
  }>;
  metadata?: Record<string, string>;
}

export interface CreatePaymentIntentResponse {
  success: boolean;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    shippingAddress: string;
    paymentMethod: string;
    shippingMethod: string;
    needsR1Invoice?: boolean;
    companyName?: string;
    companyOib?: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    options?: Record<string, unknown>;
  }>;
  notes?: string;
  totalAmount: number;
  taxAmount?: number;
  shippingCost?: number;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  orderId?: string;
  paymentStatus?: string;
  message?: string;
  error?: string;
}

/**
 * Creates a payment intent with Stripe
 */
export async function createPaymentIntent(
  data: CreatePaymentIntentRequest
): Promise<CreatePaymentIntentResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/.netlify/functions/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Confirms a payment and processes the order
 */
export async function confirmPayment(
  data: ConfirmPaymentRequest
): Promise<ConfirmPaymentResponse> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/.netlify/functions/confirm-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error confirming payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

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
        error: error.message || 'Payment failed'
      };
    }

    if (paymentIntent?.status === 'succeeded') {
      return { success: true };
    } else {
      return {
        success: false,
        error: `Payment status: ${paymentIntent?.status || 'unknown'}`
      };
    }
  } catch (error) {
    console.error('Error processing Stripe payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Formats amount for display (converts cents to currency)
 */
export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

/**
 * Converts amount to cents for Stripe
 */
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Converts cents to amount for display
 */
export function fromCents(cents: number): number {
  return cents / 100;
} 