import React from 'react';
import { Product } from '../types/product';
import {
  CardContent,
} from './Card';

interface AccessoryProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  className?: string;
  delay?: number;
}

const AccessoryProductCard: React.FC<AccessoryProductCardProps> = ({ 
  product, 
  onAddToCart,
  className = '',
  delay = 0
}) => {
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    <div 
      className={`reveal-staggered visible ${className}`}
      style={{ 
        transition: 'opacity 100ms ease-out',
        opacity: 1,
        animationDelay: `${delay}ms`
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden h-full flex flex-col">
        {/* Gray background with image */}
        <div className="bg-gray-200 dark:bg-gray-700 p-8 flex items-center justify-center">
          <div className="w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Content area */}
        <CardContent className="flex-grow flex flex-col p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h3>
          </div>

          <div className="flex-grow"></div>

          <div className="mb-6">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${product.price.toFixed(2)}
              {product.originalPrice !== product.price && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded transition uppercase font-medium tracking-wider"
          >
            ADD TO CART
          </button>
        </CardContent>
      </div>
    </div>
  );
};

export default AccessoryProductCard;

 