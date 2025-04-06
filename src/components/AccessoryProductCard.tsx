import React from 'react';
import { Product } from '../types/product';
import {
  CardRoot,
  CardContent,
  CardTitle,
  CardActions,
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
      <CardRoot className="h-full flex flex-col">
        <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-t-lg flex items-center justify-center">
          <div className="w-full aspect-square flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        <CardContent className="flex-grow flex flex-col p-6">
          <div className="mb-4">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </CardTitle>
          </div>

          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            ${product.price.toFixed(2)}
            {product.originalPrice !== product.price && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <CardActions className="mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded transition-colors duration-200 uppercase font-medium tracking-wide"
            >
              ADD TO CART
            </button>
          </CardActions>
        </CardContent>
      </CardRoot>
    </div>
  );
};

export default AccessoryProductCard;

 