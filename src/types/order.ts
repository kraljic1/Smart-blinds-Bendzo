// Order data type definition
export interface OrderData {
  id?: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  billing_address: string;
  shipping_address?: string;
  notes?: string;
  total_amount: number;
  tax_amount?: number;
  shipping_cost?: number;
  discount_amount?: number;
  discount_code?: string;
  payment_method?: string;
  payment_status?: string;
  shipping_method?: string;
  tracking_number?: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

// Order item data type definition
export interface OrderItemData {
  id?: number;
  order_id: number;
  product_id: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  width?: number;
  height?: number;
  options?: Record<string, string | number | boolean>;
  created_at?: string;
} 