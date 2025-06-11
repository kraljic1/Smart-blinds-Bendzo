import React from 'react';
import { PaymentSection } from '../../PaymentSection';
import { PaymentState } from '../../CheckoutFormTypes';
import { BrowserInfo } from '../../../../utils/browserDetection';

interface PaymentSectionWrapperProps {
 paymentState: PaymentState;
 totalAmount: number;
 onPaymentSuccess: (paymentIntentId: string) => void;
 onPaymentError: (error: unknown) => void;
 onClosePayment: () => void;
 onBrowserDetected: (browserInfo: BrowserInfo) => void;
}

const PaymentSectionWrapper = ({
 paymentState,
 totalAmount,
 onPaymentSuccess,
 onPaymentError,
 onClosePayment,
 onBrowserDetected
}: PaymentSectionWrapperProps) => {
 return (
 <PaymentSection
 paymentState={paymentState}
 totalAmount={totalAmount}
 onPaymentSuccess={onPaymentSuccess}
 onPaymentError={onPaymentError}
 onClosePayment={onClosePayment}
 onBrowserDetected={onBrowserDetected}
 />
 );
};

export default PaymentSectionWrapper; 