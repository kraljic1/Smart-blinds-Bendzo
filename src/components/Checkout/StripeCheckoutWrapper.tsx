import { useStripeInitialization } from '../../hooks/useStripeInitialization';
import { useCookieConsent } from '../../hooks/useCookieConsent';
import { useStripeRetryHandlers } from './hooks/useStripeRetryHandlers';
import { StripeCheckoutContent } from './components/StripeCheckoutContent';

interface StripeCheckoutWrapperProps {
 amount: number;
 currency?: string;
 clientSecret: string;
 onPaymentSuccess: (paymentMethodId: string) => void;
 onPaymentError: (error: string) => void;
 disabled?: boolean;
}

export function StripeCheckoutWrapper(props: StripeCheckoutWrapperProps) {
 const { amount, currency = 'eur', clientSecret, onPaymentSuccess, onPaymentError, disabled = false } = props;

 const stripeHooks = useStripeInitialization({ onPaymentError });
 const cookieHooks = useCookieConsent({
 isPrivacyMode: stripeHooks.browserInfo?.isPrivacyMode || false,
 onInitializeStripe: stripeHooks.initializeStripe,
 onPaymentError
 });
 const retryHooks = useStripeRetryHandlers({
 resetConsent: cookieHooks.resetConsent,
 resetStripe: stripeHooks.resetStripe
 });

 return (
 <StripeCheckoutContent
 amount={amount}
 currency={currency}
 clientSecret={clientSecret}
 onPaymentSuccess={onPaymentSuccess}
 onPaymentError={onPaymentError}
 disabled={disabled}
 cookieConsent={cookieHooks.cookieConsent}
 browserInfo={stripeHooks.browserInfo}
 stripeLoaded={stripeHooks.stripeLoaded}
 stripeAvailable={stripeHooks.stripeAvailable}
 stripePromise={stripeHooks.stripePromise}
 initializationError={stripeHooks.initializationError}
 showTroubleshooting={retryHooks.showTroubleshooting}
 handleCookieAccept={cookieHooks.handleCookieAccept}
 handleCookieDecline={cookieHooks.handleCookieDecline}
 handleRetry={retryHooks.handleRetry}
 handleRetryFromDeclined={retryHooks.handleRetryFromDeclined}
 handleShowTroubleshooting={retryHooks.handleShowTroubleshooting}
 handleCloseTroubleshooting={retryHooks.handleCloseTroubleshooting}
 />
 );
} 