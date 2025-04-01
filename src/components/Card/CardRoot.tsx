import React from 'react';

interface CardRootProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const CardRoot: React.FC<CardRootProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardRoot;