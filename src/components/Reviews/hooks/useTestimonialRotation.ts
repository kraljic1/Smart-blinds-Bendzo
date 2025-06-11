import { useState, useEffect, useCallback } from 'react';
import { testimonials } from '../../../data/testimonials';

export const useTestimonialRotation = (testimonialsPerView: number = 6) => {
 const [activeIndex, setActiveIndex] = useState(0);
 const [visibleTestimonials, setVisibleTestimonials] = useState(testimonials.slice(0, testimonialsPerView));

 const handlePrev = useCallback(() => {
 setActiveIndex((prevIndex) => 
 prevIndex === 0 ? testimonials.length - testimonialsPerView : prevIndex - testimonialsPerView
 );
 }, [testimonialsPerView]);

 const handleNext = useCallback(() => {
 setActiveIndex((prevIndex) => 
 (prevIndex + testimonialsPerView) >= testimonials.length 
 ? 0 
 : prevIndex + testimonialsPerView
 );
 }, [testimonialsPerView]);

 const goToTestimonial = useCallback((index: number) => {
 setActiveIndex(index);
 }, []);

 // Handle automatic rotation
 useEffect(() => {
 const timer = setTimeout(() => {
 handleNext();
 }, 8000); // Rotate every 8 seconds

 return () => clearTimeout(timer);
 }, [handleNext, activeIndex]);

 // Update visible testimonials when activeIndex changes
 useEffect(() => {
 const startIdx = activeIndex;
 const visible = [];
 
 for (let i = 0; i < testimonialsPerView; i++) {
 const idx = (startIdx + i) % testimonials.length;
 visible.push(testimonials[idx]);
 }
 
 setVisibleTestimonials(visible);
 }, [activeIndex, testimonialsPerView]);

 return {
 activeIndex,
 visibleTestimonials,
 handlePrev,
 handleNext,
 goToTestimonial,
 totalGroups: Math.ceil(testimonials.length / testimonialsPerView)
 };
}; 