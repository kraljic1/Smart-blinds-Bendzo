import { supabase } from '../supabaseClient';
import { ExtendedOrderData } from '../../types/adminOrder';
import { OptimizedOrderSummary, OrderItemResponse } from './types';

/**
 * Optimized order query functions
 */

/**
 * Get orders using optimized materialized view
 * This should be 80-90% faster than the original query
 */
export async function getOrdersOptimized(
  limit: number = 50,
  offset: number = 0,
  status?: string,
  email?: string
): Promise<OptimizedOrderSummary[]> {
  try {
    // Use the optimized function that queries the materialized view
    const { data, error } = await supabase.rpc('get_orders_optimized', {
      p_limit: limit,
      p_offset: offset,
      p_status: status || null,
      p_email: email || null
    });

    if (error) {
      console.error('Error fetching optimized orders:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch optimized orders:', error);
    throw error;
  }
}

/**
 * Get order count for pagination (optimized)
 */
export async function getOrderCountOptimized(
  status?: string,
  email?: string
): Promise<number> {
  try {
    let query = supabase
      .from('admin_order_summary')
      .select('id', { count: 'exact', head: true });

    if (status) {
      query = query.eq('status', status);
    }

    if (email) {
      query = query.eq('customer_email', email);
    }

    const { count, error } = await query;

    if (error) {
      console.error('Error getting order count:', error);
      throw error;
    }

    return count || 0;
  } catch (error) {
    console.error('Failed to get order count:', error);
    throw error;
  }
}

/**
 * Get single order with items (optimized with better indexing)
 */
export async function getOrderByIdOptimized(orderId: string): Promise<ExtendedOrderData | null> {
  try {
    // Use hash index for exact order_id lookups (much faster)
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          product_name,
          quantity,
          unit_price,
          subtotal,
          width,
          height,
          options
        )
      `)
      .eq('order_id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order by ID:', error);
      return null;
    }

    if (!order) return null;

    // Transform to expected format
    return transformOrderData(order);
  } catch (error) {
    console.error('Failed to fetch order by ID:', error);
    return null;
  }
}

/**
 * Transform order data to expected format
 */
function transformOrderData(order: Record<string, unknown>): ExtendedOrderData {
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
    items: transformOrderItems(order.order_items as OrderItemResponse[] || [])
  };
}

/**
 * Transform order items to expected format
 */
function transformOrderItems(items: OrderItemResponse[]) {
  return items.map((item: OrderItemResponse) => ({
    productId: item.product_id || `product-${item.id}`,
    productName: item.product_name || 'Proizvod bez naziva',
    quantity: item.quantity,
    unitPrice: item.unit_price,
    subtotal: item.subtotal,
    width: item.width,
    height: item.height,
    options: item.options || {}
  }));
} 