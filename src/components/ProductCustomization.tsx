import { Info, Check } from 'lucide-react';
import '../styles/ProductCustomization.css';

export interface CustomizationOption {
  id: string;
  name: string;
  textOnly?: boolean;
  options: {
    id: string;
    name: string;
    image?: string;
    color?: string;
    price?: number;
  }[];
}

interface ProductCustomizationProps {
  options: CustomizationOption[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionId: string, valueId: string) => void;
}

const ProductCustomization = ({
  options,
  selectedOptions,
  onOptionChange,
}: ProductCustomizationProps) => {
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
            <button className="info-button">
              <Info size={16} />
            </button>
          </div>
          
          <div className={`option-selections ${option.id === 'color' ? 'color-grid' : ''} ${option.textOnly ? 'text-only-grid' : ''}`}>
            {option.options.map((value) => (
              <div
                key={value.id}
                className={`option-item ${selectedOptions[option.id] === value.id ? 'selected' : ''} ${value.color ? 'color-option' : ''} ${option.textOnly ? 'text-only-option' : ''}`}
                onClick={() => onOptionChange(option.id, value.id)}
              >
                {value.image && !value.color && !option.textOnly && (
                  <div className="option-image-container">
                    <img src={value.image} alt={value.name} className="option-image" />
                  </div>
                )}
                {value.color && (
                  <div 
                    className="color-swatch" 
                    style={{ backgroundColor: value.color }}
                    aria-label={value.name}
                  ></div>
                )}
                <div className={`option-content ${option.textOnly ? 'text-only-content' : ''}`}>
                  <span className="option-name">{value.name}</span>
                  {value.price !== undefined && value.price > 0 && (
                    <span className="option-price">+€{value.price.toFixed(2)}</span>
                  )}
                  {value.price !== undefined && value.price === 0 && option.textOnly && (
                    <span className="option-price">€0.00</span>
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