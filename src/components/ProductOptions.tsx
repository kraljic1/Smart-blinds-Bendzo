import React from 'react';
import '../styles/ProductOptions.css';

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
  return (
    <div className={`product-options-grid ${className}`}>
      {options.map((option, index) => (
        <div 
          key={index} 
          className={`product-option-tag ${option.type === 'color' ? 'color' : ''}`}
        >
          {option.type === 'color' && option.colorCode && (
            <div 
              className="product-option-color-swatch" 
              style={{ backgroundColor: option.colorCode }}
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