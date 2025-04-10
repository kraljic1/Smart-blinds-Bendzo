import { createContext } from 'react';
import { Product } from '../types/product';

export interface LikedContextType {
  likedItems: Product[];
  addLikedItem: (product: Product) => void;
  removeLikedItem: (productId: string) => void;
  isLiked: (productId: string) => boolean;
  clearLikedItems: () => void;
  getLikedItemsCount: () => number;
}

// Create and export the context
export const LikedContext = createContext<LikedContextType | undefined>(undefined); 