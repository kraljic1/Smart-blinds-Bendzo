import React from 'react';

interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}

const CardActions: React.FC<CardActionsProps> = ({ children, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  );
};

export default CardActions;