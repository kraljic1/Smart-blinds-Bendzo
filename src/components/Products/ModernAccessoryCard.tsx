import React from 'react';
import { AccessoryProduct } from '../../data/accessories';
import { AccessoryCardImage, AccessoryCardContent, AccessoryCardActions } from './components';
import { useAccessoryCardAnimation, useAccessoryCardHandlers } from './hooks';

interface ModernAccessoryCardProps {
  product: AccessoryProduct;
  delay?: number;
}

const ModernAccessoryCard: React.FC<ModernAccessoryCardProps> = ({ 
  product,
  delay = 0
}) => {
  // Custom hooks for animation and interaction logic
  const { cardRef } = useAccessoryCardAnimation(delay);
  const { productIsLiked, handleConfigure, handleCardClick, handleToggleLike } = useAccessoryCardHandlers({ product });

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
        <AccessoryCardImage product={product} />
        
        {/* Card content */}
        <div className="flex-grow flex flex-col p-6 pt-8 min-h-[280px]">
          <AccessoryCardContent product={product} />
          
          <AccessoryCardActions
            product={product}
            productIsLiked={productIsLiked}
            onConfigure={handleConfigure}
            onToggleLike={handleToggleLike}
          />
        </div>
      </div>
    </div>
  );
};

export default ModernAccessoryCard; 