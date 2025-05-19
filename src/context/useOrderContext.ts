import { useContext } from 'react';
import { OrderContext } from './OrderContext';

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
} 