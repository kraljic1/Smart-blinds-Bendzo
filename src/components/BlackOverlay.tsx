import React, { useEffect, useRef } from 'react';

interface BlackOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlackOverlay: React.FC<BlackOverlayProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Clean up on unmount
    return () => {
      const existingOverlay = document.getElementById('pure-black-overlay');
      if (existingOverlay && existingOverlay.parentNode) {
        existingOverlay.parentNode.removeChild(existingOverlay);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      // Remove any existing overlay first
      const existingOverlay = document.getElementById('pure-black-overlay');
      if (existingOverlay) {
        existingOverlay.parentNode?.removeChild(existingOverlay);
      }
      
      // Create overlay with important styling
      const overlay = document.createElement('div');
      overlay.id = 'pure-black-overlay';
      overlay.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background-color: white !important;
        z-index: 9998 !important;
        opacity: 1 !important;
      `;
      
      overlay.addEventListener('click', onClose);
      document.body.appendChild(overlay);
      overlayRef.current = overlay;
    } else {
      // Remove overlay when closed
      if (overlayRef.current) {
        document.body.removeChild(overlayRef.current);
        overlayRef.current = null;
      }
    }
  }, [isOpen, onClose]);
  
  // We don't actually render anything here, we use direct DOM manipulation instead
  return null;
};

export default BlackOverlay; 