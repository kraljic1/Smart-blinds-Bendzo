import { useState, useEffect } from 'react';
import { Product } from '../../types/product';

export const useZebraPageAnimations = (filteredProducts: Product[]) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize page loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all elements with reveal-staggered class
    document.querySelectorAll('.reveal-staggered').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.reveal-staggered').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, [filteredProducts]);

  return { isLoaded };
}; 