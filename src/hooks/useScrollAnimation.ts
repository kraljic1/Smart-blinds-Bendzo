import { useState, useEffect, useRef } from 'react';

interface UseScrollAnimationReturn {
 scrollY: number;
 sectionsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
 headerRef: React.RefObject<HTMLDivElement>;
}

export const useScrollAnimation = (): UseScrollAnimationReturn => {
 const [scrollY, setScrollY] = useState(0);
 const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
 const headerRef = useRef<HTMLDivElement>(null);

 // Track scroll position for subtle parallax effects
 useEffect(() => {
 const handleScroll = () => {
 setScrollY(window.scrollY);
 };
 window.addEventListener('scroll', handleScroll, { passive: true });
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 // Handle animation of elements when they enter viewport
 useEffect(() => {
 const observerOptions = {
 root: null,
 rootMargin: '0px',
 threshold: 0.2,
 };

 const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 entry.target.classList.add('in-view');
 observer.unobserve(entry.target);
 }
 });
 };

 const observer = new IntersectionObserver(handleIntersect, observerOptions);

 if (headerRef.current) {
 observer.observe(headerRef.current);
 }

 sectionsRef.current.forEach((section) => {
 if (section) observer.observe(section);
 });

 return () => {
 observer.disconnect();
 };
 }, []);

 return { scrollY, sectionsRef, headerRef };
}; 