import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';

export interface BasketItem {
  product: Product;
  quantity: number;
  options?: Record<string, string | number | boolean>;
}

export function useBasket() {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load basket from localStorage on component mount
  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      try {
        setItems(JSON.parse(savedBasket));
      } catch (error) {
        console.error('Failed to parse basket from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save basket to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('basket', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // Add item to basket
  const addItem = useCallback((product: Product, quantity: number = 1, options?: Record<string, string | number | boolean>) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && 
                JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists with same options
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, { product, quantity, options }];
      }
    });
  }, []);

  // Remove item from basket
  const removeItem = useCallback((itemIndex: number) => {
    setItems(prevItems => prevItems.filter((_, index) => index !== itemIndex));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemIndex: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemIndex);
      return;
    }
    
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[itemIndex].quantity = quantity;
      return newItems;
    });
  }, [removeItem]);

  // Clear basket
  const clearBasket = useCallback(() => {
    setItems([]);
  }, []);

  // Calculate total price
  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }, [items]);

  // Get total number of items
  const getItemCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearBasket,
    getTotalPrice,
    getItemCount
  };
} 