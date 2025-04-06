import React from 'react';
import { Product } from '../types/product';
import {
  CardRoot,
  CardImage,
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
        <div className="relative">
          <CardImage src={product.image} alt={product.name} />
        </div>

        <CardContent className="flex-grow flex flex-col min-h-[240px]">
          <div className="h-14 mb-2">
            <CardTitle className="line-clamp-2 h-full flex items-center">
              {product.name.toUpperCase()}
            </CardTitle>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.features && product.features.map((feature, i) => (
              <span
                key={i}
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm uppercase"
              >
                {feature}
              </span>
            ))}
          </div>

          <CardPrice
            price={product.price}
            originalPrice={product.originalPrice}
            className="mb-4"
          />

          <CardActions className="mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition uppercase dark:bg-green-500 dark:hover:bg-green-600"
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

 