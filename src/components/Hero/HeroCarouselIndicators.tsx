import React from 'react';
import { HeroCarouselIndicatorsProps } from './types';

const HeroCarouselIndicators: React.FC<HeroCarouselIndicatorsProps> = ({
  images,
  currentImageIndex,
  setCurrentImageIndex
}) => {
  if (images.length <= 1) {
    return null;
  }
  
  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-10">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentImageIndex(index)}
          className={`h-1.5 rounded-full transition-all ${
            currentImageIndex === index 
              ? 'bg-white/90 w-12' 
              : 'bg-white/30 w-6 hover:bg-white/50 hover:w-8'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default HeroCarouselIndicators; 