import { useEffect, useCallback } from 'react';

interface UseModalBehaviorProps {
  onClose?: () => void;
}

interface UseModalBehaviorReturn {
  handleOverlayClick: (e: React.MouseEvent) => void;
  handleCloseClick: () => void;
}

export function useModalBehavior({ onClose }: UseModalBehaviorProps): UseModalBehaviorReturn {
  const closeModal = useCallback(() => {
    document.body.classList.remove('modal-open');
    onClose?.();
  }, [onClose]);

  // Prevent body scrolling when modal is open and handle escape key
  useEffect(() => {
    document.body.classList.add('modal-open');
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [closeModal]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  const handleCloseClick = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return {
    handleOverlayClick,
    handleCloseClick
  };
} 