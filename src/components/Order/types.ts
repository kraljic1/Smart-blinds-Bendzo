// Type for order items
export interface OrderItemDisplay {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  width?: number;
  height?: number;
  options?: Record<string, string | number | boolean>;
}

// Extended type that matches the structure returned by getOrderById from orderUtils
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
  // Company fields for R1 invoices
  companyName?: string;
  companyOib?: string;
  needsR1Invoice?: boolean;
  items: OrderItemDisplay[];
} 