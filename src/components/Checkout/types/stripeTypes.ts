export interface StripePaymentFormProps {
 amount: number;
 currency: string;
 clientSecret: string;
 onPaymentSuccess: (paymentIntentId: string) => void;
 onPaymentError: (error: string) => void;
 onClose?: () => void;
 disabled?: boolean;
} 