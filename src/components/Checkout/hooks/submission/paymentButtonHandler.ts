import { safeLog } from '../../../../utils/errorHandler';
import { PaymentState } from '../../CheckoutFormTypes';

/**
 * Handles payment button click logic
 */
export const handlePaymentButtonClick = (
  paymentState: PaymentState,
  onSubmit: () => void
): void => {
  console.log('[CHECKOUT] Payment button clicked!');
  console.log('[CHECKOUT] Current payment state:', paymentState);
  safeLog.info('Button clicked!');
  
  if (!paymentState.showStripeForm) {
    console.log('[CHECKOUT] Stripe form not shown, calling handleSubmit');
    onSubmit();
  } else {
    console.log('[CHECKOUT] Stripe form already shown');
  }
}; 