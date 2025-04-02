import { useContext } from 'react';
import { BasketContext } from '../context/basketContextDefinitions';

export function useBasketContext() {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasketContext must be used within a BasketProvider');
  }
  return context;
} 