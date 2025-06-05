/**
 * Order retrieval utilities - Main export file
 * 
 * This file serves as the main entry point for order retrieval functionality.
 * The implementation has been modularized into smaller, focused files for better maintainability.
 */

// Export types
export type { TransformedOrderData, SupabaseOrderData, SupabaseOrderItem } from './order/types';

// Export environment utilities
export { isDevelopmentMode, getApiEndpoint } from './order/environment';

// Export transformation utilities
export { transformOrderData, validateOrderId, validateEmail } from './order/transformer';

// Export testing utilities
export { testOrderFetching } from './order/testing';

// Export main service functions
export { getOrderHistory } from './order/service';
export { getOrderById } from './order/orderById'; 