import React, { useEffect, useRef } from 'react';
import '../styles/ProductOptions/index.css';

interface ProductOption {
  label: string;
  value: string | number;
  type?: 'color' | 'standard';
  colorCode?: string;
}

interface ProductOptionsModalProps {
  title: string;
  imageUrl: string;
  options: ProductOption[];
  price: number;
  onClose: () => void;
}

const ProductOptionsModal: React.FC<ProductOptionsModalProps> = ({
  title,
  imageUrl,
  options,
  price,
  onClose
}) => {
  const colorSwatchRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  
  // Set background colors via JavaScript
  useEffect(() => {
    options.forEach((option, index) => {
      if (option.type === 'color' && option.colorCode) {
        const swatch = colorSwatchRefs.current.get(index);
        if (swatch) {
          swatch.style.backgroundColor = option.colorCode;
        }
      }
    });
  }, [options]);
  
  return (
    <div className="product-modal">
      <div className="product-modal-header">
        <div className="product-modal-image">
          <img src={imageUrl} alt={title} />
        </div>
        <h2 className="product-modal-title">{title}</h2>
        <button 
          className="product-modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
      
      <div className="product-options-grid">
        {options.map((option, index) => (
          <div 
            key={index} 
            className={`product-option-tag ${option.type === 'color' ? 'color' : ''}`}
          >
            {option.type === 'color' && option.colorCode && (
              <div 
                ref={(el) => {
                  if (el) colorSwatchRefs.current.set(index, el);
                }}
                className="product-option-color-swatch" 
                data-color={option.colorCode}
              />
            )}
            <span className="product-option-label">{option.label}:</span>
            <span className="product-option-value">{option.value}</span>
          </div>
        ))}
      </div>
      
      <div className="product-price">
        €{price.toFixed(2)}
      </div>
    </div>
  );
};

export default ProductOptionsModal; 