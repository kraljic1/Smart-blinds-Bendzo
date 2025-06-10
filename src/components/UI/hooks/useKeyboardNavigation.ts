import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  onClose: () => void;
  hasMultipleImages: boolean;
  onPrevImage?: () => void;
  onNextImage?: () => void;
}

/**
 * Custom hook for managing keyboard navigation in the modal
 * Handles escape key to close, arrow keys for navigation, and body scroll prevention
 */
export const useKeyboardNavigation = ({
  onClose,
  hasMultipleImages,
  onPrevImage,
  onNextImage
}: UseKeyboardNavigationProps): void => {
  useEffect(() => {
    // Add event listener to close the modal when Escape key is pressed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages && onPrevImage) {
        onPrevImage();
      } else if (e.key === 'ArrowRight' && hasMultipleImages && onNextImage) {
        onNextImage();
      }
    };

    // Prevent scrolling while modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, hasMultipleImages, onPrevImage, onNextImage]);
}; 