/**
 * Re-exports for backward compatibility
 * This file now serves as a central export point for all order-related utilities
 */

// Export types
export type { 
  CustomerInfo, 
  OrderStatus, 
  OrderItem, 
  OrderData, 
  OrderResponse, 
  SupabaseOrderData,
  BasketItem 
} from './orderTypes';

// Export order submission functions
export { submitOrder } from './orderSubmission';

// Export order retrieval functions
export { getOrderHistory, getOrderById } from './orderRetrieval';

// Export data transformation functions
export { basketItemsToOrderItems } from './orderTransformers';

// Export order status management functions
export { updateOrderStatus } from './orderStatusManagement'; 