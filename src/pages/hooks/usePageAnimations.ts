import { useEffect, useState } from 'react';
import { Product } from '../../types/product';

/**
 * Custom hook for managing page animations and scroll behavior
 */
export const usePageAnimations = (pathname: string, filteredProducts: Product[]) => {
 const [isLoaded, setIsLoaded] = useState(false);

 // Handle initial page load animations and scroll to top
 useEffect(() => {
 window.scrollTo(0, 0);
 
 // Add animation class to show content after a short delay
 const timer = setTimeout(() => {
 setIsLoaded(true);
 }, 100);
 
 return () => clearTimeout(timer);
 }, [pathname]);

 // Handle intersection observer for scroll animations
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
 const elements = document.querySelectorAll('.reveal-staggered');
 elements.forEach(el => observer.observe(el));
 
 return () => {
 elements.forEach(el => observer.unobserve(el));
 };
 }, [filteredProducts]);

 return { isLoaded };
}; 