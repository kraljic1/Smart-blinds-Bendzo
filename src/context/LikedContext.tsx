import React, { ReactNode } from 'react';
import { useLiked } from '../hooks/useLiked';
import { LikedContext } from './likedContextDefinitions';

export function LikedProvider({ children }: { children: ReactNode }) {
  const liked = useLiked();

  return (
    <LikedContext.Provider value={liked}>
      {children}
    </LikedContext.Provider>
  );
} 