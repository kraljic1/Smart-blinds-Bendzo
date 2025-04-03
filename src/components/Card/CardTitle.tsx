import React from 'react';

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase overflow-hidden ${className}`}>
      {children}
    </h3>
  );
};

export default CardTitle;