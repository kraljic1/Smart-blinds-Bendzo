import React from 'react';

interface ModalBackgroundProps {
  onClick: () => void;
}

const ModalBackground: React.FC<ModalBackgroundProps> = ({ onClick }) => {
  return (
    <>
      {/* Multiple backup layers to ensure at least one works */}
      <div 
        className="fixed inset-0 z-40 bg-black" 
        onClick={onClick}
      />
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 39,
          backgroundColor: 'black',
          opacity: 1
        }}
        onClick={onClick}
      />
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw', 
          height: '100vh',
          zIndex: 38,
          background: '#000',
        }}
        onClick={onClick}
      />
    </>
  );
};

export default ModalBackground; 