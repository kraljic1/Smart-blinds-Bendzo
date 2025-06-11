/**
 * Utility to prevent overscroll/bouncing effect on mobile devices
 * while preserving normal touch interactions
 */

export const preventOverscroll = () => {
 // Function to determine if an element is scrollable
 const isScrollable = (element: Element): boolean => {
 if (!(element instanceof HTMLElement)) return false;
 
 const style = window.getComputedStyle(element);
 const overflowY = style.getPropertyValue('overflow-y');
 const overflowX = style.getPropertyValue('overflow-x');
 
 return (
 element.scrollHeight > element.clientHeight && 
 (overflowY === 'auto' || overflowY === 'scroll')
 ) || (
 element.scrollWidth > element.clientWidth && 
 (overflowX === 'auto' || overflowX === 'scroll')
 );
 };

 // Find scrollable parent
 const getScrollableParent = (element: Element | null): Element | null => {
 if (!element) return document.scrollingElement || document.documentElement;
 
 if (isScrollable(element)) return element;
 
 return getScrollableParent(element.parentElement);
 };

 // Only prevent default when at boundaries of scrollable element
 document.addEventListener('touchmove', (e) => {
 // Always allow two or more finger gestures (pinch zoom, etc)
 if (e.touches.length > 1) return;
 
 const scrollingElement = getScrollableParent(e.target as Element);
 
 // Let default scroll behavior happen on scrollable elements
 if (scrollingElement) return;
 
 // Only prevent in cases where it would cause bounce effects
 // but not interfere with normal touch interactions
 e.preventDefault();
 }, { passive: false });
}; 