import React, { useEffect, useRef } from 'react';

interface BlackOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlackOverlay: React.FC<BlackOverlayProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  
  // Function to properly clean up overlay
  const cleanupOverlay = () => {
    const existingOverlay = document.getElementById('pure-black-overlay');
    if (existingOverlay && existingOverlay.parentNode) {
      // First fade out
      existingOverlay.style.opacity = '0 !important';
      existingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0) !important';
      existingOverlay.style.backdropFilter = 'blur(0px) !important';
      // Apply webkit-specific property
      (existingOverlay.style as unknown as Record<string, string>)['-webkit-backdrop-filter'] = 'blur(0px) !important';
      
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
        background-color: rgba(0, 0, 0, 0) !important;
        z-index: 9998 !important;
        opacity: 0 !important;
        backdrop-filter: blur(0px) !important;
        -webkit-backdrop-filter: blur(0px) !important;
        transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        -webkit-transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        pointer-events: all !important;
      `;
      
      overlay.addEventListener('click', onClose);
      document.body.appendChild(overlay);
      overlayRef.current = overlay;
      
      // Trigger animation after a tiny delay to ensure the initial styles are applied
      requestAnimationFrame(() => {
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5) !important';
        overlay.style.backdropFilter = 'blur(5px) !important';
        // Apply webkit-specific property
        (overlay.style as unknown as Record<string, string>)['-webkit-backdrop-filter'] = 'blur(5px) !important';
        overlay.style.opacity = '1 !important';
      });
    } else {
      // Animate overlay out and remove it properly
      if (overlayRef.current) {
        cleanupOverlay();
        overlayRef.current = null;
      }
    }
  }, [isOpen, onClose]);
  
  // We don't actually render anything here, we use direct DOM manipulation instead
  return null;
};

export default BlackOverlay; 