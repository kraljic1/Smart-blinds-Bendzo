import { safeLog } from '../../../../utils/errorHandler';
import { FormData, PhoneValidation, PaymentState } from '../../CheckoutFormTypes';
import { validateAllFields } from '../validation/formValidator';
import { buildPaymentIntentData, BasketItem } from '../payment/paymentDataBuilder';
import { processPaymentIntent } from '../payment/paymentProcessor';

export interface SubmissionHandlers {
  setError: (error: string) => void;
  setSubmitting: (submitting: boolean) => void;
  setPaymentState: (state: PaymentState) => void;
}

export interface SubmissionDependencies {
  items: BasketItem[];
  getTotalPrice: () => number;
}

/**
 * Handles form submission process
 */
export const handleFormSubmission = async (
  formData: FormData,
  phoneValidation: PhoneValidation,
  handlers: SubmissionHandlers,
  dependencies: SubmissionDependencies
): Promise<void> => {
  console.log('[CHECKOUT] Form submitted!');
  safeLog.info('Form submitted!');
  
  // Validate all fields
  const validation = validateAllFields(formData, phoneValidation);
  if (!validation.isValid) {
    handlers.setError(validation.message || 'Validation failed');
    return;
  }

  handlers.setSubmitting(true);
  handlers.setError('');

  safeLog.info('Starting payment intent creation...');

  try {
    // Build payment intent data
    const paymentIntentData = buildPaymentIntentData(
      formData,
      dependencies.items,
      dependencies.getTotalPrice()
    );

    // Process payment intent
    const result = await processPaymentIntent(paymentIntentData);
    
    if (result.success && result.paymentState) {
      handlers.setPaymentState(result.paymentState);
    } else {
      handlers.setError(result.error || 'Payment processing failed');
    }

  } catch (error) {
    safeLog.error('Form submission error', error);
    handlers.setError('An unexpected error occurred');
  }

  safeLog.info('Setting submitting to false');
  handlers.setSubmitting(false);
}; 