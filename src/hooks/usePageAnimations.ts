import { useState, useEffect } from 'react';

/**
 * Custom hook for managing page animations and loading states
 */
export const usePageAnimations = () => {
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
 // Add animation class to show content after a short delay
 const timer = setTimeout(() => {
 setIsLoaded(true);
 }, 100);
 
 return () => clearTimeout(timer);
 }, []);

 // Add intersection observer for scroll animations - optimized for mobile
 useEffect(() => {
 // Skip animations on mobile for better performance
 const isMobile = window.innerWidth < 768;
 
 if (isMobile) {
 // On mobile, just mark everything as visible immediately without animations
 document.querySelectorAll('.reveal-staggered').forEach(el => {
 el.classList.add('visible');
 });
 return;
 }
 
 // Only use IntersectionObserver on desktop
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 }
 });
 },
 { 
 threshold: 0.1,
 // Use rootMargin to start loading earlier
 rootMargin: '100px 0px' 
 }
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
 }, []);

 return { isLoaded };
}; 