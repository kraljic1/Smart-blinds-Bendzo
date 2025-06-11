import React from 'react';
import { PaymentSection } from '../PaymentSection';
import { PaymentSuccess } from '../PaymentSuccess';
import { PaymentState } from '../CheckoutFormTypes';
import { BrowserInfo } from '../../../utils/browserDetection';
import { OrderDetails } from '../utils/orderDetails';

interface PaymentHandlingState {
 orderComplete: boolean;
 orderDetails: OrderDetails | null;
}

interface PaymentProcessingSectionProps {
 stripePaymentState: PaymentState;
 totalAmount: number;
 handlingState: PaymentHandlingState;
 onPaymentSuccess: (paymentIntentId: string) => void;
 onPaymentError: (error: unknown) => void;
 onClosePayment: () => void;
 onBrowserDetected: (info: BrowserInfo) => void;
 onContinueShopping: () => void;
}

/**
 * PaymentProcessingSection component handles the payment flow
 * including Stripe payment processing and success display
 */
const PaymentProcessingSection: React.FC<PaymentProcessingSectionProps> = ({
 stripePaymentState,
 totalAmount,
 handlingState,
 onPaymentSuccess,
 onPaymentError,
 onClosePayment,
 onBrowserDetected,
 onContinueShopping
}) => {
 return (
 <>
 <PaymentSection
 paymentState={stripePaymentState}
 totalAmount={totalAmount}
 onPaymentSuccess={onPaymentSuccess}
 onPaymentError={onPaymentError}
 onClosePayment={onClosePayment}
 onBrowserDetected={onBrowserDetected}
 />
 
 {handlingState.orderComplete && handlingState.orderDetails && (
 <PaymentSuccess 
 orderDetails={handlingState.orderDetails}
 onContinueShopping={onContinueShopping}
 />
 )}
 </>
 );
};

export default PaymentProcessingSection; 