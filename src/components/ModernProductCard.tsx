import React, { useEffect, useRef, useMemo } from 'react';
import { Sun, Moon, Check, Package, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';

interface ModernProductCardProps {
  product: Product;
  onConfigure?: (product: Product) => void;
  onRequestSample?: (product: Product) => void;
  configureButtonText?: string;
}

const ModernProductCard: React.FC<ModernProductCardProps> = ({ 
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

  // Check if product has a fabric detail image
  const hasFabricImage = useMemo((): boolean => {
    if (!product.images) return false;
    return product.images.some(img => 
      img.includes("4.webp") || 
      img.endsWith("/4.webp") || 
      img.includes("4.jpg") || 
      img.endsWith("/4.jpg") ||
      img.endsWith("/4") ||
      img.includes("fabric") ||
      (img.includes("/") && img.split("/").pop()?.startsWith("4"))
    );
  }, [product.images]);

  // Get the fabric image 
  const getFabricImage = (): string | null => {
    if (!product.images) return null;
    
    const fabricImage = product.images.find(img => 
      img.includes("4.webp") || 
      img.endsWith("/4.webp") || 
      img.includes("4.jpg") || 
      img.endsWith("/4.jpg") ||
      img.endsWith("/4") ||
      img.includes("fabric") ||
      (img.includes("/") && img.split("/").pop()?.startsWith("4"))
    );
    
    return fabricImage || null;
  };

  // Set background color for products without fabric image
  useEffect(() => {
    if (!hasFabricImage && colorSwatchRef.current && product.fabricColor) {
      colorSwatchRef.current.style.backgroundColor = product.fabricColor;
    }
  }, [product.fabricColor, hasFabricImage]);

  return (
    <div className="group h-full overflow-hidden">
      {/* Card with modern effects */}
      <div className="relative h-full flex flex-col light-card dark:bg-gray-800 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-600 transition-all duration-300 group-hover:shadow-xl">
        {/* Subtle card background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/5 to-purple-100/10 dark:from-blue-900/10 dark:to-purple-900/20 -z-10"></div>
        
        {/* Special highlight effect top-right corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-bl-[100px] -translate-y-12 translate-x-12 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500"></div>
        
        {/* Image container with overlay effect */}
        <div className="relative overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent dark:from-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Color swatch */}
          <div className="absolute -bottom-6 right-6 transition-transform duration-300 group-hover:transform group-hover:translate-y-0 z-20">
            <div className="relative">
              {hasFabricImage ? (
                <div className="p-1 rounded-full bg-white/60 dark:bg-gray-700/80 backdrop-blur-sm border border-white/40 dark:border-gray-500 shadow-lg">
                  <img
                    src={getFabricImage()!}
                    alt={`${product.name} fabric`}
                    className="w-14 h-14 rounded-full product-color-swatch object-cover"
                  />
                </div>
              ) : (
                <div className="p-1 rounded-full bg-white/60 dark:bg-gray-700/80 backdrop-blur-sm border border-white/40 dark:border-gray-500 shadow-lg">
                  <div
                    ref={colorSwatchRef}
                    className="w-14 h-14 rounded-full product-color-swatch"
                    data-color={product.fabricColor}
                  />
                </div>
              )}
              
              {/* Mini floating badge */}
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-blue-600 text-blue-600 dark:text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md border border-gray-100 dark:border-blue-500">
                <Check size={12} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Card content */}
        <div className="flex-grow flex flex-col p-6 pt-8">
          {/* Product title */}
          <h3 className="text-xl font-bold text-black dark:text-black mb-4 line-clamp-2 transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-600 dark:group-hover:to-purple-600">
            {product.name.toUpperCase()}
          </h3>
          
          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.map((feature, i) => (
              <span
                key={i}
                className="modern-badge flex items-center text-black dark:bg-blue-700/40 dark:text-black"
              >
                {feature === 'Light filtering' ? (
                  <Sun className="w-3 h-3 mr-1 inline" />
                ) : (
                  <Moon className="w-3 h-3 mr-1 inline" />
                )}
                {feature}
              </span>
            ))}
          </div>
          
          {/* Colors count */}
          <div className="mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-200 flex items-center">
              <span className="flex items-center justify-center w-5 h-5 mr-1.5 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-700 dark:to-purple-700">
                <span className="text-xs font-medium text-blue-700 dark:text-white">+{product.colors}</span>
              </span>
              {product.colors === 1 ? 'COLOR' : 'COLORS'} AVAILABLE
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-5 flex items-end">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-300 mr-2">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="line-through text-gray-500 dark:text-gray-400 mb-1">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="mt-auto pt-4 space-y-3">
            <button
              onClick={handleConfigure}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-400 dark:hover:to-indigo-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <span>{configureButtonText}</span>
            </button>
            
            {onRequestSample && (
              <button
                onClick={handleRequestSample}
                className="w-full border border-gray-200 dark:border-gray-600 bg-white/60 dark:bg-gray-700/80 backdrop-blur-sm text-gray-800 dark:text-gray-100 px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 font-medium flex items-center justify-center"
              >
                <Package size={16} className="mr-2" />
                <span>Request Sample</span>
              </button>
            )}
          </div>
          
          {/* Like button */}
          <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm shadow-md border border-white/40 dark:border-gray-600/40 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
            <Heart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernProductCard; 