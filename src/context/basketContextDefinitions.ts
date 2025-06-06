import { createContext } from 'react';
import { BasketItem } from '../hooks/useBasket';
import { Product } from '../types/product';

export interface BasketContextType {
  items: BasketItem[];
  addItem: (product: Product, quantity?: number, options?: Record<string, string | number | boolean>, calculatedPrice?: number) => void;
  removeItem: (itemIndex: number) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

// Create and export the context
export const BasketContext = createContext<BasketContextType | undefined>(undefined); 