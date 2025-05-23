/**
 * TypeScript interfaces for Stripe payment processing
 */

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
  client_secret: string;
}

export interface StripePaymentData {
  paymentIntentId: string;
  amount: number;
  currency: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    shippingAddress: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    options?: Record<string, unknown>;
  }>;
  metadata?: {
    orderId?: string;
    notes?: string;
  };
}

export interface StripeCheckoutSession {
  id: string;
  url: string;
  payment_status: string;
}

export interface PaymentMethodResult {
  success: boolean;
  paymentMethod?: Record<string, unknown>;
  error?: string;
} 