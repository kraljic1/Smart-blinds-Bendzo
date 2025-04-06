import React from 'react';
import { Product } from '../types/product';
import {
  CardRoot,
  CardContent,
  CardTitle,
  CardPrice,
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
        <div className="relative bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
          <div className="flex items-center justify-center h-56 p-6">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        <CardContent className="flex-grow flex flex-col min-h-[180px] p-5">
          <div className="mb-3">
            <CardTitle className="line-clamp-2 text-xl font-bold">
              {product.name}
            </CardTitle>
          </div>

          <CardPrice
            price={product.price}
            originalPrice={product.originalPrice}
            className="mb-4"
          />

          <CardActions className="mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition uppercase font-medium"
            >
              Add to Cart
            </button>
          </CardActions>
        </CardContent>
      </CardRoot>
    </div>
  );
};

export default AccessoryProductCard;

 