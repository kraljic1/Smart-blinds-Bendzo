import React, { useState, useEffect } from 'react';
import '../../styles/BackToTop.css';

/**
 * BackToTop - Button that appears when scrolling down to let users quickly return to top
 */
const BackToTop: React.FC = () => {
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 const toggleVisibility = () => {
 // Show button when user scrolls down 300px from the top
 setIsVisible(window.scrollY > 300);
 };

 // Add scroll event listener
 window.addEventListener('scroll', toggleVisibility, { passive: true });
 
 // Initial check
 toggleVisibility();
 
 // Clean up
 return () => {
 window.removeEventListener('scroll', toggleVisibility);
 };
 }, []);

 const scrollToTop = () => {
 window.scrollTo({
 top: 0,
 behavior: 'smooth'
 });
 };

 return (
 <>
 {isVisible && (
 <button 
 className="back-to-top-button"
 onClick={scrollToTop}
 aria-label="Back to top"
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
 >
 <polyline points="18 15 12 9 6 15"></polyline>
 </svg>
 </button>
 )}
 </>
 );
};

export default BackToTop; 