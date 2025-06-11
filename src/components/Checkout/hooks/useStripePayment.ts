import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

interface UseStripePaymentProps {
 clientSecret: string;
 onPaymentSuccess: (paymentIntentId: string) => void;
 onPaymentError: (error: string) => void;
 disabled?: boolean;
}

interface UseStripePaymentReturn {
 isProcessing: boolean;
 cardError: string | null;
 cardComplete: boolean;
 handleCardChange: (event: StripeCardElementChangeEvent) => void;
 handleSubmit: (event: React.FormEvent) => Promise<void>;
 canSubmit: boolean;
}

// Helper functions for payment processing
const validatePaymentPrerequisites = (
 stripe: Stripe | null,
 elements: StripeElements | null,
 isProcessing: boolean,
 disabled: boolean
): { isValid: boolean; errorMessage?: string } => {
 if (!stripe || !elements) {
 console.log('[STRIPE] Stripe or elements not available');
 return { isValid: false, errorMessage: 'Payment system not available' };
 }

 if (isProcessing || disabled) {
 console.log('[STRIPE] Already processing or disabled');
 return { isValid: false };
 }

 return { isValid: true };
};

const getCardElement = (elements: StripeElements): { cardElement: StripeCardElement | null; error?: string } => {
 const cardElement = elements.getElement(CardElement);
 
 if (!cardElement) {
 console.log('[STRIPE] Card element not found');
 return { cardElement: null, error: 'Card element not found' };
 }

 return { cardElement };
};

const processStripePayment = async (
 stripe: Stripe,
 clientSecret: string,
 cardElement: StripeCardElement
) => {
 console.log('[STRIPE] Confirming card payment with client configuration');
 
 return await stripe.confirmCardPayment(clientSecret, {
 payment_method: {
 card: cardElement,
 }
 });
};

const handlePaymentResult = (
 error: unknown,
 paymentIntent: unknown,
 onPaymentSuccess: (id: string) => void,
 onPaymentError: (error: string) => void
): string | null => {
 if (error) {
 console.error('[STRIPE] Payment confirmation error:', error);
 const errorMessage = (error as { message?: string }).message || 'Payment confirmation failed';
 onPaymentError(errorMessage);
 return errorMessage;
 }

 if (paymentIntent && (paymentIntent as { status?: string }).status === 'succeeded') {
 console.log('[STRIPE] Payment completed successfully');
 onPaymentSuccess((paymentIntent as { id: string }).id);
 return null;
 }

 console.log('[STRIPE] Payment intent status:', (paymentIntent as { status?: string })?.status);
 const errorMessage = 'Payment was not completed successfully';
 onPaymentError(errorMessage);
 return errorMessage;
};

const handlePaymentError = (
 error: unknown,
 setCardError: (error: string) => void,
 onPaymentError: (error: string) => void
): void => {
 console.error('[STRIPE] Payment processing failed:', error);
 const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
 setCardError(errorMessage);
 onPaymentError(errorMessage);
};

export function useStripePayment({
 clientSecret,
 onPaymentSuccess,
 onPaymentError,
 disabled = false
}: UseStripePaymentProps): UseStripePaymentReturn {
 const stripe = useStripe();
 const elements = useElements();
 const [isProcessing, setIsProcessing] = useState(false);
 const [cardError, setCardError] = useState<string | null>(null);
 const [cardComplete, setCardComplete] = useState(false);

 const handleCardChange = (event: StripeCardElementChangeEvent) => {
 setCardError(event.error ? event.error.message : null);
 setCardComplete(event.complete);
 };

 const handleSubmit = async (event: React.FormEvent) => {
 console.log('[STRIPE] Payment form submitted');
 event.preventDefault();

 // Validate prerequisites
 const validation = validatePaymentPrerequisites(stripe, elements, isProcessing, disabled);
 if (!validation.isValid) {
 if (validation.errorMessage) setCardError(validation.errorMessage);
 return;
 }

 // At this point we know stripe and elements are not null
 if (!stripe || !elements) return;

 // Get card element
 const { cardElement, error: cardElementError } = getCardElement(elements);
 if (cardElementError || !cardElement) {
 setCardError(cardElementError || 'Card element not available');
 return;
 }

 // Start processing
 console.log('[STRIPE] Starting payment processing...');
 setIsProcessing(true);
 setCardError(null);

 try {
 // Process payment
 const { error, paymentIntent } = await processStripePayment(stripe, clientSecret, cardElement);
 
 // Handle result
 const resultError = handlePaymentResult(error, paymentIntent, onPaymentSuccess, onPaymentError);
 if (resultError) setCardError(resultError);
 } catch (error) {
 handlePaymentError(error, setCardError, onPaymentError);
 } finally {
 console.log('[STRIPE] Setting processing to false');
 setIsProcessing(false);
 }
 };

 const canSubmit = Boolean(stripe && cardComplete && !isProcessing && !disabled);

 return {
 isProcessing,
 cardError,
 cardComplete,
 handleCardChange,
 handleSubmit,
 canSubmit
 };
} 