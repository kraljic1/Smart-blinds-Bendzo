import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import {
  CardRoot,
  CardImage,
  CardContent,
  CardTitle,
  CardPrice,
  CardActions,
} from './Card';

interface ProductCardProps {
  product: Product;
  onConfigure?: (product: Product) => void;
  onRequestSample?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleConfigure = () => {
    navigate(`/products/configure/${product.id}`);
  };

  return (
    <CardRoot>
      <div className="relative">
        <CardImage src={product.image} alt={product.name} />
        <div className="absolute bottom-4 right-4">
          <div
            className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 shadow-md"
            style={{ backgroundColor: product.fabricColor }}
          />
        </div>
      </div>

      <CardContent>
        <CardTitle>{product.name.toUpperCase()}</CardTitle>

        <div className="flex items-center space-x-2 mb-4">
          {product.features.map((feature, i) => (
            <span
              key={i}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm uppercase"
            >
              {feature === 'Light filtering' ? (
                <Sun className="w-4 h-4 mr-1 inline" />
              ) : (
                <Moon className="w-4 h-4 mr-1 inline" />
              )}
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400 uppercase">
            +{product.colors} {product.colors === 1 ? 'COLOR' : 'COLORS'}
          </span>
        </div>

        <CardPrice
          price={product.price}
          originalPrice={product.originalPrice}
          className="mb-4"
        />

        <CardActions>
          <button
            onClick={handleConfigure}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition uppercase dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Configure & Buy
          </button>
        </CardActions>
      </CardContent>
    </CardRoot>
  );
};

export default ProductCard;
