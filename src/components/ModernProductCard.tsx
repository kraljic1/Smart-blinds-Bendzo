import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  configureButtonText = "Configure & Buy"
}) => {
  const navigate = useNavigate();
  const colorSwatchRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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

  // Check if product has an image with "4.webp" or "4.jpg" (fabric detail image)
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

  // Get the fabric image (with "4.webp" or "4.jpg")
  const getFabricImage = (): string | null => {
    if (!product.images) return null;
    
    // First, look for exact matches for fabric samples
    let fabricImage = product.images.find(img => 
      img.includes("4.webp") || 
      img.endsWith("/4.webp") || 
      img.includes("4.jpg") || 
      img.endsWith("/4.jpg")
    );
    
    // If not found, try to find images with "4" at the end of path segments
    if (!fabricImage) {
      fabricImage = product.images.find(img => 
        img.endsWith("/4") || 
        (img.includes("/") && img.split("/").pop()?.startsWith("4"))
      );
    }
    
    // If still not found, fallback to any image with "fabric" in the name
    if (!fabricImage) {
      fabricImage = product.images.find(img => img.includes("fabric"));
    }
    
    // Finally, if we still don't have a match, use the last image which is often the fabric sample
    if (!fabricImage && product.images.length > 3) {
      fabricImage = product.images[product.images.length - 1];
    }
    
    return fabricImage || null;
  };

  // Set background color for products without fabric image
  useEffect(() => {
    if (!hasFabricImage && colorSwatchRef.current && product.fabricColor) {
      colorSwatchRef.current.style.backgroundColor = product.fabricColor;
    }
  }, [product, hasFabricImage]);

  // Simple preload of images in background without tracking loaded count
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      // Just preload the images in background without tracking state
      product.images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [product.images]);
  
  // Handle 3D tilt effect with improved smoothness
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Disable 3D effects on mobile for better performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

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

  // Optimize image loading by using smaller images on mobile
  const isMobile = useRef(window.innerWidth < 768).current;

  return (
    <div 
      ref={cardRef}
      className={`reveal-staggered visible ${isMobile ? "" : "depth-effect"}`}
      style={{ 
        transition: 'opacity 100ms ease-out',
        opacity: 1
      }}
    >
      <CardRoot className={`h-full flex flex-col modern-card ${isMobile ? "" : "depth-effect-inner"}`}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-60"></div>
          
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            className={`w-full h-56 object-cover ${isMobile ? "" : "transition-transform duration-700 hover:scale-105"}`}
          />
          
          <div className="absolute bottom-4 right-4 z-20">
            {/* Show fabric swatch */}
            <div className="fabric-detail">
              {hasFabricImage ? (
                <div className="fabric-image">
                  <img 
                    src={getFabricImage() ?? ''} 
                    alt={`${product.name} fabric detail`} 
                  />
                </div>
              ) : (
                <div className="color-swatch" ref={colorSwatchRef}></div>
              )}
            </div>
          </div>
          
          {product.discount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center z-20">
              <Zap className="w-4 h-4 mr-1" />
              {product.discount}% OFF
            </div>
          )}
        </div>

        <CardContent className="flex-grow flex flex-col min-h-[240px] sm:min-h-[260px] p-4 sm:p-5">
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

          <CardActions className="mt-auto pt-2 sm:pt-0">
            <button
              onClick={handleConfigure}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition uppercase dark:bg-blue-500 dark:hover:bg-blue-600 shimmer-button min-h-[40px]"
            >
              {configureButtonText}
            </button>
            
            {onRequestSample && (
              <button
                onClick={handleRequestSample}
                className="w-full mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition uppercase dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 min-h-[40px]"
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