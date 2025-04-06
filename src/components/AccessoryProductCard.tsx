import React from 'react';
import { Product } from '../types/product';

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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="relative">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col min-h-[240px]">
          <div className="h-14 mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase overflow-hidden line-clamp-2 h-full flex items-center">
              {product.name}
            </h3>
          </div>
          
          {product.features && product.features.length > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              {product.features.map((feature, i) => (
                <span
                  key={i}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm uppercase"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice !== product.price && (
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="space-y-2 mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition uppercase dark:bg-green-500 dark:hover:bg-green-600"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoryProductCard;

 