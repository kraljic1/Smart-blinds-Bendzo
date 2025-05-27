import React, { useEffect, useRef } from 'react';
import '../../styles/ProductOptions/index.css';

interface ProductOption {
  label: string;
  value: string | number;
  type?: 'color' | 'standard';
  colorCode?: string;
}

interface ProductOptionsProps {
  options: ProductOption[];
  className?: string;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ 
  options,
  className = '' 
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
    <div className={`product-options-grid ${className}`}>
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
  );
};

export default ProductOptions; 