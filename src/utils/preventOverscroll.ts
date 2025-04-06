/**
 * Utility to prevent overscroll/bouncing effect on mobile devices
 */

export const preventOverscroll = () => {
  // Prevent overscroll on document
  document.addEventListener('touchmove', (e) => {
    // Allow scrolling inside scrollable elements
    if (
      e.target instanceof Element && 
      (e.target.closest('.scrollable') || 
       e.target.classList.contains('scrollable'))
    ) {
      return;
    }
    
    // Prevent overscroll bounce
    const isVerticalScroll = window.innerHeight < document.body.scrollHeight;
    const isHorizontalScroll = window.innerWidth < document.body.scrollWidth;

    if (!isVerticalScroll && !isHorizontalScroll) {
      e.preventDefault();
    }
  }, { passive: false });

  // Prevent touchstart bounce on iOS Safari
  document.addEventListener('touchstart', (e) => {
    // Get current scroll position
    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft;
    
    // Prevent bounce when at the edge of scroll container
    if (
      (scrollTop <= 0 && e.touches[0].screenY > 100) || // At top and swiping down
      (scrollLeft <= 0 && e.touches[0].screenX > 100) || // At left and swiping right
      (scrollTop >= document.documentElement.scrollHeight - window.innerHeight && e.touches[0].screenY < window.innerHeight - 100) || // At bottom and swiping up
      (scrollLeft >= document.documentElement.scrollWidth - window.innerWidth && e.touches[0].screenX < window.innerWidth - 100) // At right and swiping left
    ) {
      e.preventDefault();
    }
  }, { passive: false });
}; 