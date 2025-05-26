import React, { useEffect, useRef } from 'react';
import '../styles/ScrollIndicator.css';

/**
 * ScrollIndicator - Shows how much of the page has been scrolled
 * Displays a vertical progress bar on the right side of the screen
 */
const ScrollIndicator: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate how much of the scrollable area has been scrolled
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 
        ? (scrollTop / scrollableHeight) * 100 
        : 0;
      
      // Update CSS custom property instead of inline style
      if (barRef.current) {
        barRef.current.style.setProperty('--scroll-progress', `${progress}%`);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="scroll-indicator-container">
      <div 
        ref={barRef}
        className="scroll-indicator-bar"
      />
    </div>
  );
};

export default ScrollIndicator; 