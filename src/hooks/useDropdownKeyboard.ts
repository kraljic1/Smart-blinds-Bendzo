import React from 'react';

interface UseDropdownKeyboardProps {
  disabled: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  updatePosition: () => void;
}

export const useDropdownKeyboard = ({ 
  disabled, 
  isOpen, 
  setIsOpen, 
  updatePosition 
}: UseDropdownKeyboardProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          updatePosition();
        }
        setIsOpen(!isOpen);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          updatePosition();
          setIsOpen(true);
        } else {
          // Focus next option logic could be added here
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          // Focus previous option logic could be added here
        }
        break;
    }
  };

  return { handleKeyDown };
}; 