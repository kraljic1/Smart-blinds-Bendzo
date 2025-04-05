import React, { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import {
  CardRoot,
  CardContent,
  CardTitle,
  CardPrice,
  CardActions,
} from './Card';

interface ModernProductCardProps {
  product: Product;
  onConfigure?: (product: Product) => void;
  onRequestSample?: (product: Product) => void;
  configureButtonText?: string;
  delay?: number;
}

const ModernProductCard: React.FC<ModernProductCardProps> = ({ 
  product, 
  onConfigure, 
  onRequestSample,
  configureButtonText = "Configure & Buy",
  delay = 0
}) => {
  const navigate = useNavigate();
  const colorSwatchRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
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

  // Check if product has an image with "4" before .webp
  const hasFabricImage = (): boolean => {
    if (!product.images) return false;
    return product.images.some(img => img.includes("4.webp"));
  };

  // Get the fabric image (with number "4" before .webp)
  const getFabricImage = (): string | null => {
    if (!product.images) return null;
    const fabricImage = product.images.find(img => img.includes("4.webp"));
    return fabricImage || null;
  };

  // Set background color for products without fabric image
  useEffect(() => {
    if (!hasFabricImage() && colorSwatchRef.current && product.fabricColor) {
      colorSwatchRef.current.style.backgroundColor = product.fabricColor;
    }
  }, [product]);

  // Trigger reveal animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Handle 3D tilt effect with improved smoothness
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;
    const dampingFactor = 0.1; // Make movement more smooth with damping

    const updateTransform = () => {
      const inner = card.querySelector('.depth-effect-inner') as HTMLElement;
      if (inner && isHovering) {
        rafId = requestAnimationFrame(updateTransform);
      } else if (inner) {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Apply damping for smoother transitions
      lastX = lastX + (((centerX - x) / 30) - lastX) * dampingFactor;
      lastY = lastY + (((y - centerY) / 30) - lastY) * dampingFactor;
      
      const inner = card.querySelector('.depth-effect-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = `rotateY(${lastX}deg) rotateX(${lastY}deg) translateZ(5px)`;
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      rafId = requestAnimationFrame(updateTransform);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      const inner = card.querySelector('.depth-effect-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isHovering]);

  return (
    <div 
      ref={cardRef}
      className={`depth-effect reveal-staggered ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardRoot className="h-full flex flex-col modern-card depth-effect-inner">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-60"></div>
          
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-56 object-cover transition-transform duration-700 hover:scale-105"
          />
          
          <div className="absolute bottom-4 right-4 z-20">
            {hasFabricImage() ? (
              <div className="border-glow rounded-full">
                <img
                  src={getFabricImage()!}
                  alt={`${product.name} fabric`}
                  className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 shadow-md product-color-swatch object-cover"
                />
              </div>
            ) : (
              <div className="border-glow rounded-full">
                <div
                  ref={colorSwatchRef}
                  className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 shadow-md product-color-swatch"
                  data-color={product.fabricColor}
                />
              </div>
            )}
          </div>
          
          {product.discount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center z-20">
              <Zap className="w-4 h-4 mr-1" />
              {product.discount}% OFF
            </div>
          )}
        </div>

        <CardContent className="flex-grow flex flex-col min-h-[240px] p-5">
          <div className="h-14 mb-2">
            <CardTitle className="line-clamp-2 h-full flex items-center text-xl">
              {product.name.toUpperCase()}
            </CardTitle>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.map((feature, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 dark:from-blue-500/30 dark:to-blue-600/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm uppercase flex items-center"
              >
                {feature === 'Light filtering' ? (
                  <Sun className="w-4 h-4 mr-1" />
                ) : (
                  <Moon className="w-4 h-4 mr-1" />
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
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition uppercase dark:bg-blue-500 dark:hover:bg-blue-600 shimmer-button"
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
    </div>
  );
};

export default ModernProductCard; 