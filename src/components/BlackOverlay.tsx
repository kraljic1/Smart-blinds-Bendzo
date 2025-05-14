import React from 'react';

interface BlackOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlackOverlay: React.FC<BlackOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-[50] cursor-pointer transition-all duration-300 ease-out ${
        isOpen 
          ? 'opacity-100 backdrop-blur-sm bg-black/60' 
          : 'opacity-0 backdrop-blur-[0px] bg-black/0 pointer-events-none'
      }`}
      onClick={onClose}
      aria-hidden="true"
    />
  );
};

export default BlackOverlay; 