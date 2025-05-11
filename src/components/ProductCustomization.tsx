import { Info, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../types/product';
import '../styles/ProductCustomization.css';

export interface CustomizationOption {
  id: string;
  name: string;
  textOnly?: boolean;
  info?: string;
  options: {
    id: string;
    name: string;
    image?: string;
    color?: string;
    price?: number;
  }[];
}

interface ProductCustomizationProps {
  product: Product;
  options: CustomizationOption[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionId: string, valueId: string) => void;
  width?: number;
  height?: number;
}

const ProductCustomization = ({
  options,
  selectedOptions,
  onOptionChange,
}: ProductCustomizationProps) => {
  const colorSwatchRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [activeInfoId, setActiveInfoId] = useState<string | null>(null);
  
  // Set background colors via JavaScript
  useEffect(() => {
    options.forEach(option => {
      option.options.forEach(value => {
        if (value.color) {
          const swatch = colorSwatchRefs.current.get(`${option.id}-${value.id}`);
          if (swatch) {
            swatch.style.backgroundColor = value.color;
          }
        }
      });
    });
  }, [options]);

  const toggleInfo = (optionId: string) => {
    setActiveInfoId(activeInfoId === optionId ? null : optionId);
  };

  return (
    <div className="product-customization">
      <h2 className="customization-title">Advanced Customization</h2>
      <p className="customization-description">
        Customize your product with these additional options
      </p>
      
      {options.map((option) => (
        <div key={option.id} className="option-group">
          <div className="option-header">
            <h3 className="option-title">{option.name}</h3>
            {option.info && (
              <button className="info-button" onClick={() => toggleInfo(option.id)}>
                <Info size={16} />
              </button>
            )}
          </div>
          
          {activeInfoId === option.id && option.info && (
            <div className="info-message">
              {option.info}
            </div>
          )}
          
          <div className={`option-selections ${option.id === 'color' ? 'color-grid' : ''} ${option.textOnly ? 'text-only-grid' : ''}`}>
            {option.options.map((value) => (
              <div
                key={value.id}
                className={`option-item ${selectedOptions[option.id] === value.id ? 'selected' : ''} ${value.color ? 'color-option' : ''} ${option.textOnly ? 'text-only-option' : ''} ${(option.id === 'color' && value.image) ? 'fabric-option' : ''}`}
                onClick={() => onOptionChange(option.id, value.id)}
              >
                {value.image && !value.color && !option.textOnly && (
                  <div className="option-image-container">
                    <img src={value.image} alt={value.name} className="option-image" />
                  </div>
                )}
                {option.id === 'color' && value.image && (
                  <div className="fabric-swatch-container">
                    <img src={value.image} alt={value.name} className="fabric-swatch" />
                  </div>
                )}
                {value.color && !value.image && (
                  <div 
                    ref={(el) => {
                      if (el) colorSwatchRefs.current.set(`${option.id}-${value.id}`, el);
                    }}
                    className="color-swatch" 
                    data-color={value.color}
                    aria-label={value.name}
                  ></div>
                )}
                <div className={`option-content ${option.textOnly ? 'text-only-content' : ''}`}>
                  <span className="option-name">{value.name}</span>
                  {value.price !== undefined && value.price > 0 && (
                    <span className="option-price">+€{value.price.toFixed(2)}</span>
                  )}
                  {value.price !== undefined && value.price === 0 && (
                    <span className="option-price">€{value.price.toFixed(2)}</span>
                  )}
                </div>
                {selectedOptions[option.id] === value.id && (
                  <div className="option-checkmark">
                    <Check size={12} color="white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCustomization; 