import React, { useEffect, useRef } from 'react';

interface BlackOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define a type that includes non-standard CSS properties
interface ExtendedCSSStyleDeclaration extends CSSStyleDeclaration {
  '-webkit-backdrop-filter': string;
}

const BlackOverlay: React.FC<BlackOverlayProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  
  // Function to properly clean up overlay
  const cleanupOverlay = () => {
    const existingOverlay = document.getElementById('pure-black-overlay');
    if (existingOverlay && existingOverlay.parentNode) {
      // First fade out
      existingOverlay.style.opacity = '0';
      // Then remove after transition
      setTimeout(() => {
        if (existingOverlay.parentNode) {
          existingOverlay.parentNode.removeChild(existingOverlay);
        }
      }, 400);
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return cleanupOverlay;
  }, []);
  
  useEffect(() => {
    console.log("BlackOverlay: isOpen changed to", isOpen);
    
    if (isOpen) {
      // Remove any existing overlay first to avoid duplicates
      cleanupOverlay();
      
      // Create overlay with direct styles (not using !important which can cause issues)
      const overlay = document.createElement('div');
      overlay.id = 'pure-black-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      overlay.style.zIndex = '9998';
      overlay.style.opacity = '0';
      overlay.style.backdropFilter = 'blur(0px)';
      overlay.style.pointerEvents = 'auto'; // Ensure it captures clicks
      // Apply webkit backdrop filter properly
      (overlay.style as unknown as ExtendedCSSStyleDeclaration)['-webkit-backdrop-filter'] = 'blur(0px)';
      overlay.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      overlay.style.cursor = 'pointer';
      
      // Make sure the click event is properly attached
      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      };
      
      overlay.addEventListener('click', handleClick);
      document.body.appendChild(overlay);
      overlayRef.current = overlay;
      
      // Trigger animation after a tiny delay to ensure the initial styles are applied
      window.setTimeout(() => {
        if (overlay && overlay.parentNode) {
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          overlay.style.backdropFilter = 'blur(5px)';
          // Apply webkit backdrop filter properly
          (overlay.style as unknown as ExtendedCSSStyleDeclaration)['-webkit-backdrop-filter'] = 'blur(5px)';
          overlay.style.opacity = '1';
        }
      }, 50);
      
    } else {
      // Animate overlay out and remove it properly
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '0';
        overlayRef.current.style.backdropFilter = 'blur(0px)';
        // Apply webkit backdrop filter properly
        (overlayRef.current.style as unknown as ExtendedCSSStyleDeclaration)['-webkit-backdrop-filter'] = 'blur(0px)';
        overlayRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        
        window.setTimeout(() => {
          if (overlayRef.current && overlayRef.current.parentNode) {
            overlayRef.current.parentNode.removeChild(overlayRef.current);
            overlayRef.current = null;
          }
        }, 400);
      }
    }
    
    // Clean up event listeners when component unmounts or updates
    return () => {
      if (overlayRef.current) {
        overlayRef.current.removeEventListener('click', onClose);
      }
    };
  }, [isOpen, onClose]);
  
  // We don't actually render anything here, we use direct DOM manipulation instead
  return null;
};

export default BlackOverlay; 