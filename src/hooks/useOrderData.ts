import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { SupabaseOrderData } from '../utils/orderTypes';

// Interface for API response order format
interface ApiOrderResponse {
  id: number;
  order_id?: string;
  orderId?: string;
  customer_name?: string;
  customerName?: string;
  customer_email?: string;
  email?: string;
  customer_phone?: string;
  phone?: string;
  billing_address?: string;
  billingAddress?: string;
  shipping_address?: string;
  shippingAddress?: string;
  notes?: string;
  total_amount?: number;
  totalAmount?: number;
  tax_amount?: number;
  taxAmount?: number;
  shipping_cost?: number;
  shippingCost?: number;
  discount_amount?: number;
  discountAmount?: number;
  discount_code?: string;
  discountCode?: string;
  payment_method?: string;
  paymentMethod?: string;
  payment_status?: string;
  paymentStatus?: string;
  shipping_method?: string;
  shippingMethod?: string;
  tracking_number?: string;
  trackingNumber?: string;
  status: string;
  needs_r1_invoice?: boolean;
  needsR1Invoice?: boolean;
  company_name?: string;
  companyName?: string;
  company_oib?: string;
  companyOib?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

/**
 * Transform API response order to match expected format
 */
const transformOrderData = (order: ApiOrderResponse): SupabaseOrderData => ({
  id: order.id,
  order_id: order.order_id || order.orderId || '',
  customer_name: order.customer_name || order.customerName || '',
  customer_email: order.customer_email || order.email || '',
  customer_phone: order.customer_phone || order.phone || '',
  billing_address: order.billing_address || order.billingAddress || '',
  shipping_address: order.shipping_address || order.shippingAddress,
  notes: order.notes,
  total_amount: order.total_amount || order.totalAmount || 0,
  tax_amount: order.tax_amount || order.taxAmount,
  shipping_cost: order.shipping_cost || order.shippingCost,
  discount_amount: order.discount_amount || order.discountAmount,
  discount_code: order.discount_code || order.discountCode,
  payment_method: order.payment_method || order.paymentMethod,
  payment_status: order.payment_status || order.paymentStatus,
  shipping_method: order.shipping_method || order.shippingMethod,
  tracking_number: order.tracking_number || order.trackingNumber,
  status: order.status,
  needs_r1_invoice: order.needs_r1_invoice || order.needsR1Invoice,
  company_name: order.company_name || order.companyName,
  company_oib: order.company_oib || order.companyOib,
  created_at: order.created_at || order.createdAt || '',
  updated_at: order.updated_at || order.updatedAt
});

/**
 * Custom hook for managing order data
 */
export const useOrderData = () => {
  const [orders, setOrders] = useState<SupabaseOrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Try to use the Netlify function first
      try {
        const response = await fetch('/.netlify/functions/get-orders');
        
        if (response.ok) {
          const result = await response.json();
          
          if (result.success) {
            const transformedOrders = result.orders.map(transformOrderData);
            setOrders(transformedOrders);
            return; // Success, exit early
          }
        }
      } catch (netlifyError) {
        console.warn('Netlify function not available, falling back to direct Supabase:', netlifyError);
      }
      
      // Fallback to direct Supabase client if Netlify function fails
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setOrders(data || []);
      
    } catch (err) {
      console.error('Greška pri dohvaćanju narudžbi:', err);
      setError('Greška pri učitavanju narudžbi. Molimo pokušajte ponovno kasnije.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading,
    error,
    isRefreshing,
    fetchOrders,
    handleRefresh
  };
}; 