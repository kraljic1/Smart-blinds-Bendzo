import React from 'react';

interface BlackOverlayProps {
 isOpen: boolean;
 onClose: () => void;
}

const BlackOverlay: React.FC<BlackOverlayProps> = ({ isOpen, onClose }) => {
 return (
 <div
 className={`fixed inset-0 z-[65] bg-black backdrop-blur-sm transition-opacity duration-300 ${
 isOpen ? 'opacity-60 pointer-events-auto' : 'opacity-0 pointer-events-none'
 }`}
 onClick={onClose}
 aria-hidden="true"
 />
 );
};

export default BlackOverlay; 