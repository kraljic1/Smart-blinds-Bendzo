import React, { useEffect, useRef } from 'react';
import { Wifi, Smartphone, Cable, Radio, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AccessoryProduct } from '../../data/accessories';
import { useLikedContext } from '../../hooks/useLikedContext';

interface ModernAccessoryCardProps {
  product: AccessoryProduct;
  delay?: number;
}

const ModernAccessoryCard: React.FC<ModernAccessoryCardProps> = ({ 
  product,
  delay = 0
}) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const { isLiked, addLikedItem, removeLikedItem } = useLikedContext();
  const productIsLiked = isLiked(product.id);

  // Animation effect with delay
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'translateY(20px)';
      
      const timer = setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0)';
        }
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);

  const handleConfigure = () => {
    navigate(`/products/configure/${product.id}`);
  };

  // Handle card click - same as configure action
  const handleCardClick = () => {
    handleConfigure();
  };

  // Handle button clicks with event propagation prevention
  const handleConfigureClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleConfigure();
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productIsLiked) {
      removeLikedItem(product.id);
    } else {
      addLikedItem(product);
    }
  };

  // Helper function to render appropriate icon for feature
  const renderFeatureIcon = (feature: string) => {
    if (feature === 'Wi-Fi') return <Wifi className="w-3 h-3 mr-1" />;
    if (feature === 'Matter') return <Smartphone className="w-3 h-3 mr-1" />;
    if (feature === 'Charging') return <Cable className="w-3 h-3 mr-1" />;
    if (feature === '5 Channels' || feature === '15 Channels') return <Radio className="w-3 h-3 mr-1" />;
    return null;
  };

  return (
    <div className="group h-full overflow-hidden">
      {/* Card with modern effects */}
      <div 
        ref={cardRef} 
        className="relative h-full flex flex-col light-card dark:bg-gray-800 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-600 transition-all duration-500 group-hover:shadow-xl cursor-pointer"
        style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
        onClick={handleCardClick}
      >
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
        </div>
        
        {/* Card content */}
        <div className="flex-grow flex flex-col p-6 pt-8 min-h-[280px]">
          {/* Product title - Fixed height container */}
          <div className="h-16 mb-4 flex items-start">
            <h3 className="text-xl font-bold text-black dark:text-black line-clamp-2 transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-600 dark:group-hover:to-purple-600">
              {product.name.toUpperCase()}
            </h3>
          </div>
          
          {/* Feature badges - Fixed height container */}
          <div className="h-12 mb-4 flex items-start">
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, i) => (
                <span
                  key={i}
                  className="modern-badge flex items-center text-black dark:bg-blue-700/40 dark:text-black"
                >
                  {renderFeatureIcon(feature)}
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          {/* Spacer to push price and buttons to bottom */}
          <div className="flex-grow"></div>
          
          {/* Price - Fixed position from bottom */}
          <div className="mb-6 flex items-end">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-300 mr-2">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="line-through text-gray-500 dark:text-gray-400 mb-1">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Action buttons - Fixed position at bottom */}
          <div>
            <button
              onClick={handleConfigureClick}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-400 dark:hover:to-indigo-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <span>Configure & Buy</span>
            </button>
          </div>
          
          {/* Like button */}
          <button 
            onClick={handleToggleLike}
            className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm shadow-md border border-white/40 dark:border-gray-600/40 flex items-center justify-center ${
              productIsLiked 
                ? 'text-red-500 dark:text-red-400' 
                : 'text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400'
            } transition-colors ${
              productIsLiked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart size={14} fill={productIsLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernAccessoryCard; 