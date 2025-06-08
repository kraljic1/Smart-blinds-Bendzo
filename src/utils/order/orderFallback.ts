import { supabase } from '../supabaseClient';
import { ExtendedOrderData, ApiOrderItem, SupabaseOrderItem } from '../../types/adminOrder';

/**
 * Order fallback service with Netlify function support
 */

/**
 * Transforms API order response to ExtendedOrderData format
 * @param order The order data from API
 */
function transformApiOrder(order: Record<string, unknown>): ExtendedOrderData {
  return {
    orderId: (order.order_id || order.orderId) as string,
    customerName: (order.customer_name || order.customerName) as string,
    email: (order.customer_email || order.email) as string,
    phone: (order.customer_phone || order.phone) as string,
    billingAddress: (order.billing_address || order.billingAddress) as string,
    shippingAddress: (order.shipping_address || order.shippingAddress) as string,
    totalAmount: (order.total_amount || order.totalAmount) as number,
    taxAmount: (order.tax_amount || order.taxAmount) as number,
    shippingCost: (order.shipping_cost || order.shippingCost) as number,
    discountAmount: (order.discount_amount || order.discountAmount) as number,
    discountCode: (order.discount_code || order.discountCode) as string,
    paymentMethod: (order.payment_method || order.paymentMethod) as string,
    paymentStatus: (order.payment_status || order.paymentStatus) as string,
    shippingMethod: (order.shipping_method || order.shippingMethod) as string,
    trackingNumber: (order.tracking_number || order.trackingNumber) as string,
    status: order.status as string,
    notes: order.notes as string,
    createdAt: (order.created_at || order.createdAt) as string,
    updatedAt: (order.updated_at || order.updatedAt) as string,
    // Company fields for R1 invoices
    companyName: (order.company_name || order.companyName) as string,
    companyOib: (order.company_oib || order.companyOib) as string,
    needsR1Invoice: (order.needs_r1_invoice || order.needsR1Invoice) as boolean,
    items: transformOrderItems(order.order_items as ApiOrderItem[] || [])
  };
}

/**
 * Transforms order items from API format
 * @param items Array of order items from API
 */
function transformOrderItems(items: ApiOrderItem[]) {
  return items.map((item: ApiOrderItem) => ({
    productId: item.product_id || item.productId || 'unknown',
    productName: item.product_name || item.productName || 'Proizvod bez naziva',
    quantity: item.quantity,
    unitPrice: item.unit_price || item.unitPrice || 0,
    subtotal: item.subtotal,
    width: item.width,
    height: item.height,
    options: item.options || {}
  }));
}

/**
 * Attempts to fetch order via Netlify function
 * @param orderId The order ID to fetch
 */
async function fetchViaNetlifyFunction(orderId: string): Promise<ExtendedOrderData | null> {
  try {
    const response = await fetch(`/.netlify/functions/get-orders?orderId=${encodeURIComponent(orderId)}`);
    
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.orders.length > 0) {
        return transformApiOrder(result.orders[0]);
      }
    }
  } catch (netlifyError) {
    console.warn('Netlify function not available for order details, falling back to direct Supabase:', netlifyError);
  }
  
  return null;
}

/**
 * Transforms Supabase order response to ExtendedOrderData format
 * @param order The order data from Supabase
 */
function transformSupabaseOrder(order: Record<string, unknown>): ExtendedOrderData {
  return {
    orderId: order.order_id as string,
    customerName: order.customer_name as string,
    email: order.customer_email as string,
    phone: order.customer_phone as string,
    billingAddress: order.billing_address as string,
    shippingAddress: order.shipping_address as string,
    totalAmount: order.total_amount as number,
    taxAmount: order.tax_amount as number,
    shippingCost: order.shipping_cost as number,
    discountAmount: order.discount_amount as number,
    discountCode: order.discount_code as string,
    paymentMethod: order.payment_method as string,
    paymentStatus: order.payment_status as string,
    shippingMethod: order.shipping_method as string,
    trackingNumber: order.tracking_number as string,
    status: order.status as string,
    notes: order.notes as string,
    createdAt: order.created_at as string,
    updatedAt: order.updated_at as string,
    // Company fields for R1 invoices
    companyName: order.company_name as string,
    companyOib: order.company_oib as string,
    needsR1Invoice: order.needs_r1_invoice as boolean,
    items: transformSupabaseOrderItems(order.order_items as SupabaseOrderItem[] || [])
  };
}

/**
 * Transforms Supabase order items
 * @param items Array of order items from Supabase
 */
function transformSupabaseOrderItems(items: SupabaseOrderItem[]) {
  return items.map((item: SupabaseOrderItem) => ({
    productId: `product-${item.id}`,
    productName: item.product_name || 'Proizvod bez naziva',
    quantity: item.quantity,
    unitPrice: item.unit_price,
    subtotal: item.subtotal,
    width: item.width,
    height: item.height,
    options: item.options || {}
  }));
}

/**
 * Fetches order via direct Supabase client
 * @param orderId The order ID to fetch
 */
async function fetchViaSupabase(orderId: string): Promise<ExtendedOrderData | null> {
  console.log('Using direct Supabase client as fallback for order details');
  
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        product_name,
        quantity,
        unit_price,
        subtotal,
        options,
        width,
        height
      )
    `)
    .eq('order_id', orderId)
    .single();
  
  if (error) {
    console.error('Supabase error:', error);
    return null;
  }
  
  if (!order) return null;
  
  return transformSupabaseOrder(order);
}

/**
 * Function to get order by ID using the Netlify function with fallback
 * @param orderId The order ID to fetch
 */
export const getOrderByIdFallback = async (orderId: string): Promise<ExtendedOrderData | null> => {
  try {
    // Try Netlify function first
    const netlifyResult = await fetchViaNetlifyFunction(orderId);
    if (netlifyResult) {
      return netlifyResult;
    }
    
    // Fallback to direct Supabase client
    return await fetchViaSupabase(orderId);
    
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
}; 