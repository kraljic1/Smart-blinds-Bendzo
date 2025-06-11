import { createPaymentIntent } from '../../../../utils/stripeUtils';
import { safeLog, sanitizeErrorMessage } from '../../../../utils/errorHandler';
import { PaymentIntentData } from './paymentDataBuilder';
import { PaymentState } from '../../CheckoutFormTypes';

export interface PaymentProcessorResult {
 success: boolean;
 paymentState?: PaymentState;
 error?: string;
}

/**
 * Processes payment intent creation
 */
export const processPaymentIntent = async (
 paymentIntentData: PaymentIntentData
): Promise<PaymentProcessorResult> => {
 safeLog.info('Payment intent data prepared');

 try {
 const paymentData = await createPaymentIntent(paymentIntentData);
 safeLog.info('Payment response received');

 if (!paymentData.success || !paymentData.clientSecret) {
 throw new Error(paymentData.error || 'Failed to create payment intent');
 }

 // Return successful payment state
 const paymentState: PaymentState = {
 clientSecret: paymentData.clientSecret,
 paymentIntentId: paymentData.paymentIntentId || '',
 showStripeForm: true,
 processingPayment: false
 };

 return {
 success: true,
 paymentState
 };

 } catch (error) {
 safeLog.error('Payment setup error', error);
 return {
 success: false,
 error: sanitizeErrorMessage(error, 'payment')
 };
 }
}; 