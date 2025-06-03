// Type definitions for admin order management

export interface OrderItemDisplay {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  options?: Record<string, string | number | boolean>;
  width?: number;
  height?: number;
}

// Interface for API response order item format
export interface ApiOrderItem {
  id?: number;
  product_id?: string;
  productId?: string;
  product_name?: string;
  productName?: string;
  quantity: number;
  unit_price?: number;
  unitPrice?: number;
  subtotal: number;
  width?: number;
  height?: number;
  options?: Record<string, string | number | boolean>;
}

// Interface for Supabase order item format
export interface SupabaseOrderItem {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  width?: number;
  height?: number;
  options?: Record<string, string | number | boolean>;
}

// Extended order data type that matches the API response structure
export interface ExtendedOrderData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress: string;
  totalAmount: number;
  taxAmount?: number;
  shippingCost?: number;
  discountAmount?: number;
  discountCode?: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
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
    options?: Record<string, string | number | boolean>;
  }>;
} 