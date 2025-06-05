/**
 * Order-related type definitions
 */

// Interface for the transformed order data that matches the expected format
export interface TransformedOrderData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress?: string;
  totalAmount: number;
  taxAmount?: number;
  shippingCost?: number;
  discountAmount?: number;
  discountCode?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  shippingMethod?: string;
  trackingNumber?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    width?: number;
    height?: number;
    options: Record<string, string | number | boolean>;
  }>;
}

// Re-export types from orderTypes for convenience
export type { SupabaseOrderData, SupabaseOrderItem } from '../orderTypes'; 