import React from 'react';

interface InfoPanelOverlayProps {
 isOpen: boolean;
}

const InfoPanelOverlay: React.FC<InfoPanelOverlayProps> = ({ isOpen }) => {
 if (!isOpen) return null;
 
 return (
 <div 
 className="fixed inset-0 bg-black bg-opacity-50 z-50"
 onClick={(e) => e.stopPropagation()}
 />
 );
};

export default InfoPanelOverlay;