import { useState } from 'react';
import { PaymentState } from '../CheckoutFormTypes';
import { BrowserInfo } from '../../../utils/browserDetection';

export const usePaymentState = () => {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    clientSecret: '',
    paymentIntentId: '',
    showStripeForm: false,
    processingPayment: false
  });

  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);

  const handleClosePayment = () => {
    setPaymentState({
      clientSecret: '',
      paymentIntentId: '',
      showStripeForm: false,
      processingPayment: false
    });
  };

  const updatePaymentState = (updates: Partial<PaymentState>) => {
    setPaymentState(prev => ({ ...prev, ...updates }));
  };

  return {
    paymentState,
    setPaymentState,
    browserInfo,
    setBrowserInfo,
    handleClosePayment,
    updatePaymentState
  };
}; 