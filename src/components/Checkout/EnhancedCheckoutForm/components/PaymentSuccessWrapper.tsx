import React from 'react';
import { PaymentSuccess } from '../../PaymentSuccess';
import { PaymentSuccessProps } from '../../PaymentSuccessTypes';

interface PaymentSuccessWrapperProps {
 orderComplete: boolean;
 orderDetails: PaymentSuccessProps['orderDetails'] | null;
 onContinueShopping: () => void;
}

const PaymentSuccessWrapper = ({
 orderComplete,
 orderDetails,
 onContinueShopping
}: PaymentSuccessWrapperProps) => {
 if (!orderComplete || !orderDetails) {
 return null;
 }

 return (
 <PaymentSuccess 
 orderDetails={orderDetails}
 onContinueShopping={onContinueShopping}
 />
 );
};

export default PaymentSuccessWrapper; 