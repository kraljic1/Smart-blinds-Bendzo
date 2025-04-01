import React from 'react';

interface CardPriceProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

const CardPrice: React.FC<CardPriceProps> = ({ price, originalPrice, className = '' }) => {
  return (
    <div className={`flex items-baseline ${className}`}>
      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        ${price.toFixed(2)}
      </span>
      {originalPrice && (
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
          ${originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default CardPrice;