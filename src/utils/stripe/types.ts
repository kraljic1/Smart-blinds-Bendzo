/**
 * TypeScript type definitions for Stripe payment processing
 */

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    shippingAddress?: string;
    needsR1Invoice?: boolean;
    companyName?: string;
    companyOib?: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    options?: Record<string, unknown>;
  }>;
  metadata?: Record<string, string>;
}

export interface CreatePaymentIntentResponse {
  success: boolean;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    shippingAddress: string;
    paymentMethod: string;
    shippingMethod: string;
    needsR1Invoice?: boolean;
    companyName?: string;
    companyOib?: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    options?: Record<string, unknown>;
  }>;
  notes?: string;
  totalAmount: number;
  taxAmount?: number;
  shippingCost?: number;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  orderId?: string;
  paymentStatus?: string;
  message?: string;
  error?: string;
} 