import { supabase } from '../supabaseClient';
import type { OrderData } from '../../types/order';
import { PerformanceResult } from './types';

/**
 * Refresh the materialized view manually (for admin use)
 */
export async function refreshOrderSummary(): Promise<void> {
  try {
    const { error } = await supabase.rpc('refresh_admin_order_summary');
    
    if (error) {
      console.error('Error refreshing order summary:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to refresh order summary:', error);
    throw error;
  }
}

/**
 * Check query performance
 */
export async function checkQueryPerformance(): Promise<PerformanceResult[]> {
  try {
    const { data, error } = await supabase.rpc('check_query_performance');
    
    if (error) {
      console.error('Error checking performance:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to check performance:', error);
    throw error;
  }
}

/**
 * Create order (unchanged, but will benefit from optimized triggers)
 */
export async function createOrderOptimized(orderData: OrderData) {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select();
  
  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }
  
  return data?.[0];
} 