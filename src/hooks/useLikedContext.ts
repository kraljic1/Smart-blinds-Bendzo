import { useContext } from 'react';
import { LikedContext } from '../context/likedContextDefinitions';

export function useLikedContext() {
  const context = useContext(LikedContext);
  if (context === undefined) {
    throw new Error('useLikedContext must be used within a LikedProvider');
  }
  return context;
} 