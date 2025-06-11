import { usePaymentTestSuite } from './payment';

// Re-export types for backward compatibility
export type { TestResult } from './payment/types';

export const usePaymentTests = () => {
 return usePaymentTestSuite();
}; 