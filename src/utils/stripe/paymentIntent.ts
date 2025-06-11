/**
 * Payment intent creation utilities for Stripe
 */

import { safeLog, sanitizeErrorMessage } from '../errorHandler';
import { getApiBaseUrl } from './config';
import type { CreatePaymentIntentRequest, CreatePaymentIntentResponse } from './types';

/**
 * Creates a payment intent with Stripe
 */
export async function createPaymentIntent(
 data: CreatePaymentIntentRequest
): Promise<CreatePaymentIntentResponse> {
 try {
 console.log('[STRIPE-UTILS] Creating payment intent with data:', data);
 const baseUrl = getApiBaseUrl();
 console.log('[STRIPE-UTILS] Using base URL:', baseUrl);
 
 const url = `${baseUrl}/.netlify/functions/create-payment-intent`;
 console.log('[STRIPE-UTILS] Making request to:', url);
 
 const response = await fetch(url, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(data),
 });

 console.log('[STRIPE-UTILS] Response status:', response.status);
 console.log('[STRIPE-UTILS] Response ok:', response.ok);

 if (!response.ok) {
 const errorText = await response.text();
 console.log('[STRIPE-UTILS] Error response text:', errorText);
 throw new Error(`HTTP error! status: ${response.status}`);
 }

 const result = await response.json();
 console.log('[STRIPE-UTILS] Payment intent result:', result);
 return result;
 } catch (error) {
 console.log('[STRIPE-UTILS] Error creating payment intent:', error);
 safeLog.error('Error creating payment intent', error);
 return {
 success: false,
 error: sanitizeErrorMessage(error, 'payment')
 };
 }
} 