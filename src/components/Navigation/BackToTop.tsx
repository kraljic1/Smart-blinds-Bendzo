import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../../styles/BackToTop.css';

/**
 * BackToTop - Optimized button that appears when scrolling down to let users quickly return to top
 * Features: throttled scroll events, smooth animations, accessibility support
 */
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollThreshold = 300;
        
        // Show/hide button based on scroll position
        const shouldShow = currentScrollY > scrollThreshold;
        if (shouldShow !== isVisible) {
          setIsVisible(shouldShow);
        }
        
        // Track scrolling state for additional effects
        if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
          setIsScrolling(true);
          
          // Clear existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          // Set scrolling to false after scroll stops
          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 150);
        }
        
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [isVisible, setIsScrolling]);

  useEffect(() => {
    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Optimized scroll to top function
  const scrollToTop = useCallback(() => {
    // Check if smooth scrolling is supported and preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Instant scroll for users who prefer reduced motion
      window.scrollTo(0, 0);
    } else {
      // Smooth scroll with optimized behavior
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Optional: Add haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, []);

  // Keyboard support
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  }, [scrollToTop]);

  // Don't render if not visible (better than conditional rendering)
  if (!isVisible) {
    return null;
  }

  return (
    <button 
      className={`back-to-top-button ${isScrolling ? 'pulse' : ''}`}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      aria-label="Scroll back to top of page"
      title="Back to top"
      type="button"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="back-to-top-icon"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
};

export default BackToTop; 