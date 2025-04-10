import { useState, useEffect } from 'react';
import { Product } from '../types/product';

export function useLiked() {
  const [likedItems, setLikedItems] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load liked items from localStorage on component mount
  useEffect(() => {
    const savedLikedItems = localStorage.getItem('likedItems');
    if (savedLikedItems) {
      try {
        setLikedItems(JSON.parse(savedLikedItems));
      } catch (error) {
        console.error('Failed to parse liked items from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save liked items to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('likedItems', JSON.stringify(likedItems));
    }
  }, [likedItems, isLoaded]);

  // Add item to liked items
  const addLikedItem = (product: Product) => {
    setLikedItems(prevItems => {
      const isItemLiked = prevItems.some(item => item.id === product.id);
      if (isItemLiked) {
        return prevItems;
      } else {
        return [...prevItems, product];
      }
    });
  };

  // Remove item from liked items
  const removeLikedItem = (productId: string) => {
    setLikedItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Check if an item is liked
  const isLiked = (productId: string) => {
    return likedItems.some(item => item.id === productId);
  };

  // Clear all liked items
  const clearLikedItems = () => {
    setLikedItems([]);
  };

  // Get total number of liked items
  const getLikedItemsCount = () => {
    return likedItems.length;
  };

  return {
    likedItems,
    addLikedItem,
    removeLikedItem,
    isLiked,
    clearLikedItems,
    getLikedItemsCount
  };
} 