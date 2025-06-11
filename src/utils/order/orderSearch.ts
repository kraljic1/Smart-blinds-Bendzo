import { supabase } from '../supabaseClient';
import { OptimizedOrderSummary } from './types';

/**
 * Search orders with optimized full-text search
 */
export async function searchOrdersOptimized(
 searchTerm: string,
 limit: number = 50,
 offset: number = 0
): Promise<OptimizedOrderSummary[]> {
 try {
 // Use the materialized view for faster searching
 const { data, error } = await supabase
 .from('admin_order_summary')
 .select('*')
 .or(`order_id.ilike.%${searchTerm}%,customer_name.ilike.%${searchTerm}%,customer_email.ilike.%${searchTerm}%,status.ilike.%${searchTerm}%`)
 .order('created_at', { ascending: false })
 .range(offset, offset + limit - 1);

 if (error) {
 console.error('Error searching orders:', error);
 throw error;
 }

 return data || [];
 } catch (error) {
 console.error('Failed to search orders:', error);
 throw error;
 }
}

/**
 * Get order statistics (optimized with materialized view)
 */
export async function getOrderStatsOptimized(): Promise<{
 totalOrders: number;
 totalRevenue: number;
 averageOrderValue: number;
 ordersByStatus: Record<string, number>;
}> {
 try {
 // Use materialized view for faster aggregations
 const { data: stats, error: statsError } = await supabase
 .from('admin_order_summary')
 .select('total_amount, status');

 if (statsError) {
 console.error('Error fetching order stats:', statsError);
 throw statsError;
 }

 const totalOrders = stats?.length || 0;
 const totalRevenue = stats?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
 const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
 
 const ordersByStatus = stats?.reduce((acc, order) => {
 acc[order.status] = (acc[order.status] || 0) + 1;
 return acc;
 }, {} as Record<string, number>) || {};

 return {
 totalOrders,
 totalRevenue,
 averageOrderValue,
 ordersByStatus
 };
 } catch (error) {
 console.error('Failed to get order stats:', error);
 throw error;
 }
} 