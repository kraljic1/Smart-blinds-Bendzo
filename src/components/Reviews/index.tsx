import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import TestimonialCard from './TestimonialCard';

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState(testimonials.slice(0, 6));
  const testimonialsPerView = 6;
  const reviewsRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - testimonialsPerView : prevIndex - testimonialsPerView
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => 
      (prevIndex + testimonialsPerView) >= testimonials.length 
        ? 0 
        : prevIndex + testimonialsPerView
    );
  }, []);

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
  }, [activeIndex]);
  
  // Staggered animation on scroll
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

  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-[800px] h-[800px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute right-1/3 top-1/4 w-[300px] h-[300px] rounded-full bg-yellow-500/5 blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase">Testimonials</span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 mt-2">
            Real Experiences. Real Results.
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Join thousands of satisfied customers transforming their homes
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition md:-translate-x-8 border border-gray-200 dark:border-gray-700"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          </button>
          
          {/* Masonry-style grid for testimonials */}
          <div
            ref={reviewsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition md:translate-x-8 border border-gray-200 dark:border-gray-700"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {Array.from({ length: Math.ceil(testimonials.length / testimonialsPerView) }).map((_, index) => {
            const isActive = Math.floor(activeIndex / testimonialsPerView) === index;
            return (
              <button
                key={index}
                onClick={() => goToTestimonial(index * testimonialsPerView)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-600 dark:bg-blue-500 w-12' 
                    : 'bg-gray-300 dark:bg-gray-600 w-6 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reviews; 