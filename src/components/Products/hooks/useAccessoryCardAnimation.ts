import { useEffect, useRef } from 'react';

export const useAccessoryCardAnimation = (delay: number = 0) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Animation effect with delay
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'translateY(20px)';
      
      const timer = setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0)';
        }
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return { cardRef };
}; 