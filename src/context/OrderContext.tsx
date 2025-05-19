import { createContext, useState, useEffect, ReactNode } from 'react';
import { OrderResponse, getOrderHistory } from '../utils/orderUtils';
import { OrderData as SupabaseOrderData } from '../utils/supabaseClient';

interface OrderContextValue {
  lastOrder: OrderResponse | null;
  setLastOrder: (order: OrderResponse) => void;
  clearLastOrder: () => void;
  orderHistory: SupabaseOrderData[];
  loadOrderHistory: (email: string) => Promise<void>;
  isLoadingHistory: boolean;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lastOrder, setLastOrderState] = useState<OrderResponse | null>(() => {
    // Check if we have a stored order in localStorage
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      try {
        return JSON.parse(storedOrder);
      } catch (error) {
        console.error('Failed to parse stored order:', error);
        return null;
      }
    }
    return null;
  });

  const [orderHistory, setOrderHistory] = useState<SupabaseOrderData[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const setLastOrder = (order: OrderResponse) => {
    setLastOrderState(order);
    localStorage.setItem('lastOrder', JSON.stringify(order));
  };

  const clearLastOrder = () => {
    setLastOrderState(null);
    localStorage.removeItem('lastOrder');
  };

  const loadOrderHistory = async (email: string) => {
    if (!email) return;
    
    try {
      setIsLoadingHistory(true);
      const orders = await getOrderHistory(email);
      setOrderHistory(orders);
    } catch (error) {
      console.error('Failed to load order history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // If we have a stored customer email, load their order history
  useEffect(() => {
    const customerEmail = localStorage.getItem('customerEmail');
    if (customerEmail) {
      loadOrderHistory(customerEmail);
    }
  }, []);

  return (
    <OrderContext.Provider value={{ 
      lastOrder, 
      setLastOrder, 
      clearLastOrder,
      orderHistory,
      loadOrderHistory,
      isLoadingHistory
    }}>
      {children}
    </OrderContext.Provider>
  );
}

// Export the context itself to be used by the hook
export { OrderContext }; 