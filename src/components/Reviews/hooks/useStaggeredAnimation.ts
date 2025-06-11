import { useEffect, useRef } from 'react';

interface Testimonial {
 name: string;
 role: string;
 content: string;
 rating: number;
 company?: string;
 location?: string;
 avatar?: string;
}

export const useStaggeredAnimation = (visibleTestimonials: Testimonial[]) => {
 const reviewsRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (!reviewsRef.current) return;
 
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 // Get all testimonial cards inside the container
 const cards = reviewsRef.current?.querySelectorAll('.testimonial-card');
 // Apply staggered animations
 cards?.forEach((card, index) => {
 setTimeout(() => {
 card.classList.add('visible');
 }, 100 * index);
 });
 // Only run once
 observer.disconnect();
 }
 });
 },
 { threshold: 0.1 }
 );
 
 observer.observe(reviewsRef.current);
 
 return () => {
 observer.disconnect();
 };
 }, [visibleTestimonials]);

 return reviewsRef;
}; 