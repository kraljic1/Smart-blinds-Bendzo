/**
 * Optimized Order Service - Main Export File
 * 
 * This file serves as the main entry point for all optimized order operations.
 * The functionality has been split into smaller, more manageable modules:
 * 
 * - types.ts: Type definitions
 * - orderQueries.ts: Basic order queries
 * - orderEmailQueries.ts: Email-related queries
 * - orderSearch.ts: Search and statistics
 * - orderAdmin.ts: Admin and performance functions
 */

// Re-export all types
export type {
  OrderItemResponse,
  PerformanceResult,
  OptimizedOrderSummary
} from './order/types';

// Re-export basic order queries
export {
  getOrdersOptimized,
  getOrderCountOptimized,
  getOrderByIdOptimized
} from './order/orderQueries';

// Re-export email-related queries
export {
  getOrdersByEmailOptimized
} from './order/orderEmailQueries';

// Re-export search and statistics
export {
  searchOrdersOptimized,
  getOrderStatsOptimized
} from './order/orderSearch';

// Re-export admin and performance functions
export {
  refreshOrderSummary,
  checkQueryPerformance,
  createOrderOptimized
} from './order/orderAdmin'; 