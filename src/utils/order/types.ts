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
 // Company fields for R1 invoices
 companyName?: string;
 companyOib?: string;
 needsR1Invoice?: boolean;
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

// Type definitions for optimized order service

export interface OrderItemResponse {
 id: number;
 product_id?: string;
 product_name: string;
 quantity: number;
 unit_price: number;
 subtotal: number;
 width?: number;
 height?: number;
 options?: Record<string, string | number | boolean>;
}

export interface PerformanceResult {
 query_type: string;
 avg_time_ms: number;
 calls: number;
 status: string;
}

export interface OptimizedOrderSummary {
 id: number;
 order_id: string;
 customer_name: string;
 customer_email: string;
 customer_phone: string;
 total_amount: number;
 status: string;
 payment_status: string;
 created_at: string;
 item_count: number;
 total_quantity: number;
} 