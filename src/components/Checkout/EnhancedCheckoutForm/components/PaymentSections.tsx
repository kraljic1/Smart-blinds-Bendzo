import React from 'react';
import PaymentSectionWrapper from './PaymentSectionWrapper';
import PaymentSuccessWrapper from './PaymentSuccessWrapper';
import { PaymentState } from '../../CheckoutFormTypes';
import { BrowserInfo } from '../../../../utils/browserDetection';
import { PaymentSuccessProps } from '../../PaymentSuccessTypes';

interface PaymentStateHooks {
  paymentState: PaymentState;
  handleClosePayment: () => void;
  setBrowserInfo: (browserInfo: BrowserInfo) => void;
}

interface PaymentHandlingHooks {
  paymentState: {
    orderComplete: boolean;
    orderDetails: PaymentSuccessProps['orderDetails'] | null;
  };
  handlePaymentSuccess: (paymentIntentId: string) => void;
  handlePaymentError: (error: unknown) => void;
  handleContinueShopping: () => void;
}

interface PaymentSectionsProps {
  paymentStateHooks: PaymentStateHooks;
  paymentHandlingHooks: PaymentHandlingHooks;
  calculateTotalWithShipping: () => number;
}

const PaymentSections = ({
  paymentStateHooks,
  paymentHandlingHooks,
  calculateTotalWithShipping
}: PaymentSectionsProps) => {
  return (
    <>
      <PaymentSectionWrapper
        paymentState={paymentStateHooks.paymentState}
        totalAmount={calculateTotalWithShipping()}
        onPaymentSuccess={paymentHandlingHooks.handlePaymentSuccess}
        onPaymentError={paymentHandlingHooks.handlePaymentError}
        onClosePayment={paymentStateHooks.handleClosePayment}
        onBrowserDetected={paymentStateHooks.setBrowserInfo}
      />
      
      <PaymentSuccessWrapper
        orderComplete={paymentHandlingHooks.paymentState.orderComplete}
        orderDetails={paymentHandlingHooks.paymentState.orderDetails}
        onContinueShopping={paymentHandlingHooks.handleContinueShopping}
      />
    </>
  );
};

export default PaymentSections; 