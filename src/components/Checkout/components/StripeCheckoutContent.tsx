import { Elements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';
import { StripePaymentForm } from '../StripePaymentForm';
import { createStripeOptions } from '../utils/stripeOptions';
import { getBrowserCompatibilityInfo } from '../../../config/stripe';
import { StripeStateRenderer } from './StripeStateRenderer';

interface PaymentFormProps {
 amount: number;
 currency: string;
 clientSecret: string;
 onPaymentSuccess: (paymentMethodId: string) => void;
 onPaymentError: (error: string) => void;
 disabled: boolean;
}

interface StripeCheckoutContentProps extends PaymentFormProps {
 cookieConsent: string;
 browserInfo: ReturnType<typeof getBrowserCompatibilityInfo> | null;
 stripeLoaded: boolean;
 stripeAvailable: boolean;
 stripePromise: Promise<Stripe | null> | null;
 initializationError: string | null;
 showTroubleshooting: boolean;
 handleCookieAccept: () => void;
 handleCookieDecline: () => void;
 handleRetry: () => void;
 handleRetryFromDeclined: () => void;
 handleShowTroubleshooting: () => void;
 handleCloseTroubleshooting: () => void;
}

export const StripeCheckoutContent = (props: StripeCheckoutContentProps) => {
 const { amount, currency, clientSecret, onPaymentSuccess, onPaymentError, disabled, stripePromise } = props;

 // Check for special states first - these conditions match StripeStateRenderer logic
 if (props.cookieConsent === 'pending' && props.browserInfo?.isPrivacyMode) {
 return <StripeStateRenderer {...props} />;
 }
 
 if (props.showTroubleshooting) {
 return <StripeStateRenderer {...props} />;
 }
 
 if (props.cookieConsent === 'declined') {
 return <StripeStateRenderer {...props} />;
 }
 
 if (!props.stripeLoaded) {
 return <StripeStateRenderer {...props} />;
 }
 
 if (!props.stripeAvailable || !props.stripePromise) {
 return <StripeStateRenderer {...props} />;
 }

 // Normal flow: render Stripe payment form
 const options = createStripeOptions({ amount, currency });

 return (
 <Elements stripe={stripePromise} options={options}>
 <StripePaymentForm
 amount={amount}
 currency={currency}
 clientSecret={clientSecret}
 onPaymentSuccess={onPaymentSuccess}
 onPaymentError={onPaymentError}
 disabled={disabled}
 />
 </Elements>
 );
}; 