import React from 'react';

interface CardBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'discount';
}

const CardBadge: React.FC<CardBadgeProps> = ({ 
  children, 
  className = '',
  variant = 'primary'
}) => {
  const variantStyles = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-100 text-gray-800',
    discount: 'bg-red-500 text-white'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default CardBadge;