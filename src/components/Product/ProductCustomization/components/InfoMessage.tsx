import React from 'react';

interface InfoMessageProps {
  isVisible: boolean;
  message: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="info-message">
      {message}
    </div>
  );
};

export default InfoMessage; 