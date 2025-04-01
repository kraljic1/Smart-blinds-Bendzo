import React from 'react';
import InfoPanelOverlay from './InfoPanelOverlay';
import InfoPanelHeader from './InfoPanelHeader';
import InfoPanelContent from './InfoPanelContent';

interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ isOpen, onClose }) => {
  const handlePanelClick = (e: React.MouseEvent) => {
    // Prevent clicks inside the panel from reaching the product modal
    e.stopPropagation();
  };

  return (
    <>
      <InfoPanelOverlay isOpen={isOpen} />
      
      <div 
        className={`
          fixed right-0 top-0 h-full w-full md:w-[400px] bg-white dark:bg-gray-800 z-50
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        onClick={handlePanelClick}
      >
        <InfoPanelHeader onClose={onClose} />
        <InfoPanelContent />
      </div>
    </>
  );
};

export default InfoPanel;