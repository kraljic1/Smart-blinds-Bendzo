import React from 'react';

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className="relative">
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-64 object-cover ${className}`}
      />
    </div>
  );
};

export default CardImage;