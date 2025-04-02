import { Info, Check } from 'lucide-react';
import { useBasketContext } from '../context/BasketContext';
import { Product } from '../types/product';
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
  product: Product;
  options: CustomizationOption[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionId: string, valueId: string) => void;
  width?: number;
  height?: number;
}

const ProductCustomization = ({
  product,
  options,
  selectedOptions,
  onOptionChange,
  width,
  height,
}: ProductCustomizationProps) => {
  const { addItem } = useBasketContext();

  const handleAddToBasket = () => {
    // Calculate total price with options
    let totalPrice = product.price;
    
    // Collect option details to add to the basket
    const selectedOptionDetails: Record<string, string | number | boolean> = {};
    
    // Process each selected option
    for (const [optionId, valueId] of Object.entries(selectedOptions)) {
      // Find the option group
      const optionGroup = options.find(opt => opt.id === optionId);
      if (optionGroup) {
        // Find the selected option value
        const optionValue = optionGroup.options.find(opt => opt.id === valueId);
        if (optionValue) {
          // Add option price if available
          if (optionValue.price) {
            totalPrice += optionValue.price;
          }
          
          // Store option details
          selectedOptionDetails[optionGroup.name] = optionValue.name;
        }
      }
    }
    
    // Add dimensions if provided
    if (width) {
      selectedOptionDetails['Width'] = `${width} cm`;
    }
    
    if (height) {
      selectedOptionDetails['Height'] = `${height} cm`;
    }
    
    // Create a product with the updated price
    const customizedProduct = {
      ...product,
      price: totalPrice
    };
    
    // Add to basket with all the selected options
    addItem(customizedProduct, 1, selectedOptionDetails);
  };

  const isCustomizationComplete = () => {
    // Check if all required options are selected
    const requiredOptionsSelected = options.every(option => 
      selectedOptions[option.id] !== undefined
    );
    
    // Check if dimensions are provided when needed
    const dimensionsProvided = (width && height) || (!width && !height);
    
    return requiredOptionsSelected && dimensionsProvided;
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
      
      <div className="add-to-basket-container">
        <button 
          className={`add-to-basket-button ${!isCustomizationComplete() ? 'disabled' : ''}`}
          onClick={handleAddToBasket}
          disabled={!isCustomizationComplete()}
        >
          Add to Basket
        </button>
        {!isCustomizationComplete() && (
          <p className="customization-warning">Please complete all customization options before adding to basket</p>
        )}
      </div>
    </div>
  );
};

export default ProductCustomization; 