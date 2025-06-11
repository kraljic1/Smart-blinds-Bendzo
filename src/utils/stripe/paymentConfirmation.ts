/**
 * Payment confirmation utilities for Stripe
 */

import { safeLog, sanitizeErrorMessage } from '../errorHandler';
import { getApiBaseUrl } from './config';
import type { ConfirmPaymentRequest, ConfirmPaymentResponse } from './types';

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
 safeLog.error('Error confirming payment', error);
 return {
 success: false,
 error: sanitizeErrorMessage(error, 'payment')
 };
 }
} 