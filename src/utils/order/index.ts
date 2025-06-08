/**
 * Order service module exports
 * This file provides a centralized export point for all order-related functions
 */

// Basic order operations
export { createOrder } from './orderCreation';
export { getOrderById, getOrdersByEmail, getOrderItems } from './orderRetrieval';
export { getOrderByIdFallback } from './orderFallback';

// Order utilities
export { 
  getOrderStatus, 
  updateOrderStatus, 
  updatePaymentStatus, 
  getOrderCount, 
  deleteOrder 
} from './orderUtilities';

// Order queries and search
export { 
  getRecentOrders, 
  searchOrders, 
  getOrdersByDateRange 
} from './orderQueries';

// Optimized order functions
export {
  getOrdersOptimized,
  getOrderCountOptimized,
  getOrderByIdOptimized
} from './orderOptimized';

// Order history and email queries
export { getOrderHistory } from './service';

// Types
export type { 
  TransformedOrderData, 
  SupabaseOrderData, 
  SupabaseOrderItem,
  OrderItemResponse,
  OptimizedOrderSummary 
} from './types'; 