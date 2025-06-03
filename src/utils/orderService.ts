import { supabase } from './supabaseClient';
import { ExtendedOrderData, ApiOrderItem, SupabaseOrderItem } from '../types/adminOrder';

// Function to get order by ID using the Netlify function with fallback
export const getOrderById = async (orderId: string): Promise<ExtendedOrderData | null> => {
  try {
    // Try Netlify function first
    try {
      const response = await fetch(`/.netlify/functions/get-orders?orderId=${encodeURIComponent(orderId)}`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.orders.length > 0) {
          const order = result.orders[0];
          
          // Transform the API response to match the expected format
          return {
            orderId: order.order_id || order.orderId,
            customerName: order.customer_name || order.customerName,
            email: order.customer_email || order.email,
            phone: order.customer_phone || order.phone,
            billingAddress: order.billing_address || order.billingAddress,
            shippingAddress: order.shipping_address || order.shippingAddress,
            totalAmount: order.total_amount || order.totalAmount,
            taxAmount: order.tax_amount || order.taxAmount,
            shippingCost: order.shipping_cost || order.shippingCost,
            discountAmount: order.discount_amount || order.discountAmount,
            discountCode: order.discount_code || order.discountCode,
            paymentMethod: order.payment_method || order.paymentMethod,
            paymentStatus: order.payment_status || order.paymentStatus,
            shippingMethod: order.shipping_method || order.shippingMethod,
            trackingNumber: order.tracking_number || order.trackingNumber,
            status: order.status,
            notes: order.notes,
            createdAt: order.created_at || order.createdAt,
            updatedAt: order.updated_at || order.updatedAt,
            items: (order.order_items || []).map((item: ApiOrderItem) => ({
              productId: item.product_id || item.productId || 'unknown',
              productName: item.product_name || item.productName,
              quantity: item.quantity,
              unitPrice: item.unit_price || item.unitPrice,
              subtotal: item.subtotal,
              width: item.width,
              height: item.height,
              options: item.options || {}
            }))
          };
        }
      }
    } catch (netlifyError) {
      console.warn('Netlify function not available for order details, falling back to direct Supabase:', netlifyError);
    }
    
    // Fallback to direct Supabase client
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
    
    // Transform Supabase response to match expected format
    return {
      orderId: order.order_id,
      customerName: order.customer_name,
      email: order.customer_email,
      phone: order.customer_phone,
      billingAddress: order.billing_address,
      shippingAddress: order.shipping_address,
      totalAmount: order.total_amount,
      taxAmount: order.tax_amount,
      shippingCost: order.shipping_cost,
      discountAmount: order.discount_amount,
      discountCode: order.discount_code,
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status,
      shippingMethod: order.shipping_method,
      trackingNumber: order.tracking_number,
      status: order.status,
      notes: order.notes,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      items: (order.order_items || []).map((item: SupabaseOrderItem) => ({
        productId: `product-${item.id}`,
        productName: item.product_name,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        subtotal: item.subtotal,
        width: item.width,
        height: item.height,
        options: item.options || {}
      }))
    };
    
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
}; 