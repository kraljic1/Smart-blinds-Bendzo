import React, { useEffect, useRef } from 'react';
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
  configureButtonText?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onConfigure, 
  onRequestSample,
  configureButtonText = "Configure & Buy" 
}) => {
  const navigate = useNavigate();
  const colorSwatchRef = useRef<HTMLDivElement>(null);

  const handleConfigure = () => {
    if (onConfigure) {
      onConfigure(product);
    } else {
      navigate(`/products/configure/${product.id}`);
    }
  };

  const handleRequestSample = () => {
    if (onRequestSample) {
      onRequestSample(product);
    }
  };

  // Set background color via JavaScript
  useEffect(() => {
    if (colorSwatchRef.current && product.fabricColor) {
      colorSwatchRef.current.style.backgroundColor = product.fabricColor;
    }
  }, [product.fabricColor]);

  return (
    <CardRoot className="h-full flex flex-col">
      <div className="relative">
        <CardImage src={product.image} alt={product.name} />
        <div className="absolute bottom-4 right-4">
          <div
            ref={colorSwatchRef}
            className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 shadow-md product-color-swatch"
            data-color={product.fabricColor}
          />
        </div>
      </div>

      <CardContent className="flex-grow flex flex-col min-h-[240px]">
        <div className="h-14 mb-2">
          <CardTitle className="line-clamp-2 h-full flex items-center">
            {product.name.toUpperCase()}
          </CardTitle>
        </div>

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

        <CardActions className="mt-auto">
          <button
            onClick={handleConfigure}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition uppercase dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {configureButtonText}
          </button>
          
          {onRequestSample && (
            <button
              onClick={handleRequestSample}
              className="w-full mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition uppercase dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Request Sample
            </button>
          )}
        </CardActions>
      </CardContent>
    </CardRoot>
  );
};

export default ProductCard;
