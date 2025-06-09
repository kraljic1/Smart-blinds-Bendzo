import { useState, useMemo } from 'react';
import { SupabaseOrderData } from '../utils/orderTypes';

/**
 * Custom hook for filtering orders based on search term
 */
export const useOrderFilter = (orders: SupabaseOrderData[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) {
      return orders;
    }

    const searchLower = searchTerm.toLowerCase();
    
    return orders.filter(order => 
      order.order_id.toLowerCase().includes(searchLower) ||
      order.customer_name.toLowerCase().includes(searchLower) ||
      order.customer_email.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  }, [orders, searchTerm]);

  const handleClearFilter = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredOrders,
    handleClearFilter
  };
}; 