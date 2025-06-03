import { createContext, useState, useEffect, ReactNode } from 'react';
import { OrderResponse, getOrderHistory } from '../utils/orderUtils';
import { OrderData as SupabaseOrderData } from '../utils/supabaseClient';
import { OrderDetails } from '../components/Checkout/utils/orderDetails';

interface OrderContextValue {
  lastOrder: OrderResponse | null;
  lastOrderDetails: OrderDetails | null;
  setLastOrder: (order: OrderResponse) => void;
  setLastOrderDetails: (orderDetails: OrderDetails) => void;
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

  const [lastOrderDetails, setLastOrderDetailsState] = useState<OrderDetails | null>(() => {
    // Check if we have stored order details in localStorage
    const storedOrderDetails = localStorage.getItem('lastOrderDetails');
    if (storedOrderDetails) {
      try {
        return JSON.parse(storedOrderDetails);
      } catch (error) {
        console.error('Failed to parse stored order details:', error);
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

  const setLastOrderDetails = (orderDetails: OrderDetails) => {
    console.log('[ORDER-CONTEXT] Setting last order details:', orderDetails);
    console.log('[ORDER-CONTEXT] Order details items:', orderDetails.items);
    setLastOrderDetailsState(orderDetails);
    localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
    console.log('[ORDER-CONTEXT] Stored in localStorage');
  };

  const clearLastOrder = () => {
    setLastOrderState(null);
    setLastOrderDetailsState(null);
    localStorage.removeItem('lastOrder');
    localStorage.removeItem('lastOrderDetails');
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
      lastOrderDetails,
      setLastOrder, 
      setLastOrderDetails,
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