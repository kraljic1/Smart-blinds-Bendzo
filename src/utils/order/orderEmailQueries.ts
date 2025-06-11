import { supabase } from '../supabaseClient';
import { ExtendedOrderData } from '../../types/adminOrder';
import { OrderItemResponse } from './types';

/**
 * Get orders by customer email (optimized with composite index)
 */
export async function getOrdersByEmailOptimized(email: string): Promise<ExtendedOrderData[]> {
 try {
 // Use the optimized composite index for email + date ordering
 const { data: orders, error } = await supabase
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
 .eq('customer_email', email)
 .order('created_at', { ascending: false });

 if (error) {
 console.error('Error fetching orders by email:', error);
 throw error;
 }

 return (orders || []).map(transformOrderData);
 } catch (error) {
 console.error('Failed to fetch orders by email:', error);
 throw error;
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
 items: ((order.order_items as OrderItemResponse[]) || []).map((item: OrderItemResponse) => ({
 productId: item.product_id || `product-${item.id}`,
 productName: item.product_name || 'Proizvod bez naziva',
 quantity: item.quantity,
 unitPrice: item.unit_price,
 subtotal: item.subtotal,
 width: item.width,
 height: item.height,
 options: item.options || {}
 }))
 };
} 