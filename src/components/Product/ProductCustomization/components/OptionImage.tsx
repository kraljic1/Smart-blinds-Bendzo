import React from 'react';

interface OptionImageProps {
  optionId: string;
  value: {
    id: string;
    name: string;
    image?: string;
    color?: string;
  };
  isTextOnly: boolean;
  colorSwatchRef?: (el: HTMLDivElement | null) => void;
}

const OptionImage: React.FC<OptionImageProps> = ({
  optionId,
  value,
  isTextOnly,
  colorSwatchRef
}) => {
  // Regular image for non-color options
  if (value.image && !value.color && !isTextOnly && optionId !== 'color') {
    return (
      <div className="option-image-container">
        <img src={value.image} alt={value.name} className="option-image" />
      </div>
    );
  }

  // Fabric swatch for color options with images
  if (optionId === 'color' && value.image) {
    return (
      <div className="fabric-swatch-container">
        <img src={value.image} alt={value.name} className="fabric-swatch" />
      </div>
    );
  }

  // Color swatch for color options without images
  if (value.color && !value.image) {
    return (
      <div 
        ref={colorSwatchRef}
        className="color-swatch" 
        data-color={value.color}
        aria-label={value.name}
      />
    );
  }

  return null;
};

export default OptionImage; 