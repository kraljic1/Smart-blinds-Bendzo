import React, { createContext, useContext, ReactNode } from 'react';
import { useBasket, BasketItem } from '../hooks/useBasket';
import { Product } from '../types/product';

interface BasketContextType {
  items: BasketItem[];
  addItem: (product: Product, quantity?: number, options?: Record<string, string | number | boolean>) => void;
  removeItem: (itemIndex: number) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function useBasketContext() {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasketContext must be used within a BasketProvider');
  }
  return context;
}

export function BasketProvider({ children }: { children: ReactNode }) {
  const basket = useBasket();

  return (
    <BasketContext.Provider value={basket}>
      {children}
    </BasketContext.Provider>
  );
} 