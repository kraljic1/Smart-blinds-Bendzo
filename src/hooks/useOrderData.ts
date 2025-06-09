import { useState, useEffect, useCallback } from 'react';
import { SupabaseOrderData } from '../utils/orderTypes';
import { transformOrderData, ApiOrderResponse } from '../utils/order/orderTransformer';
import { fetchOrdersFromNetlify, fetchOrdersFromSupabase } from '../utils/order/orderService';

/**
 * Custom hook for managing order data with simplified logic
 */
export const useOrderData = () => {
  const [orders, setOrders] = useState<SupabaseOrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Attempts to fetch orders from Netlify function first, then falls back to Supabase
   */
  const fetchOrders = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const ordersData = await fetchOrdersWithFallback();
      const transformedOrders: SupabaseOrderData[] = ordersData.map(transformOrderData);
      setOrders(transformedOrders);
      
    } catch (err) {
      handleFetchError(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  /**
   * Tries Netlify function first, then falls back to direct Supabase access
   */
  const fetchOrdersWithFallback = async (): Promise<ApiOrderResponse[]> => {
    try {
      return await fetchOrdersFromNetlify();
    } catch (netlifyError) {
      console.warn('Netlify function not available, falling back to direct Supabase:', netlifyError);
      return await fetchOrdersFromSupabase();
    }
  };

  /**
   * Handles and formats fetch errors
   */
  const handleFetchError = (err: unknown): void => {
    console.error('Greška pri dohvaćanju narudžbi:', err);
    setError('Greška pri učitavanju narudžbi. Molimo pokušajte ponovno kasnije.');
  };

  /**
   * Refreshes order data
   */
  const handleRefresh = (): void => {
    setIsRefreshing(true);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    isLoading,
    error,
    isRefreshing,
    fetchOrders,
    handleRefresh
  };
}; 