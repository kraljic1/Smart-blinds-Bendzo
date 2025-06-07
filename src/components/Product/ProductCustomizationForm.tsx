import { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types/product';
import ProductCustomization, { CustomizationOption } from './ProductCustomization';
import PriceCalculator from './PriceCalculator';
import { validateDimensionInput, validateDimension, validateDimensions, formatDimensionRange, DEFAULT_DIMENSION_CONSTRAINTS } from '../../utils/dimensionValidation';

interface ProductCustomizationFormProps {
  product: Product;
  isAccessoryProduct: boolean;
  customizationOptions: CustomizationOption[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionId: string, valueId: string) => void;
  onCheckout: (quantity: number, width: number | '', height: number | '', additionalCosts: { name: string; price: number }[], calculatedPrice: number) => void;
  isVisible?: boolean;
  animationFinished?: boolean;
}

const ProductCustomizationForm = ({
  product,
  isAccessoryProduct,
  customizationOptions,
  selectedOptions,
  onOptionChange,
  onCheckout,
  isVisible = true,
  animationFinished = true
}: ProductCustomizationFormProps) => {
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [isCalculated, setIsCalculated] = useState(isAccessoryProduct); // Auto-calculate for accessories
  const [additionalCosts, setAdditionalCosts] = useState<{ name: string; price: number }[]>([]);

  // Define updateAdditionalCosts with useCallback to memoize the function
  const updateAdditionalCosts = useCallback(() => {
    if (isCalculated && Object.keys(selectedOptions).length > 0) {
      const costs: { name: string; price: number }[] = [];
      
      customizationOptions.forEach(option => {
        const selectedOptionId = selectedOptions[option.id];
        if (selectedOptionId) {
          const selectedValue = option.options.find(o => o.id === selectedOptionId);
          if (selectedValue && selectedValue.price && selectedValue.price > 0) {
            costs.push({
              name: `${option.name}: ${selectedValue.name}`,
              price: selectedValue.price
            });
          }
        }
      });
      
      setAdditionalCosts(costs);
    }
  }, [selectedOptions, isCalculated, customizationOptions]);

  // Update additional costs when dependencies change
  useEffect(() => {
    updateAdditionalCosts();
  }, [updateAdditionalCosts]);

  // Handle width input change with validation (allows free typing)
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = validateDimensionInput(e.target.value);
    setWidth(validatedValue);
  };

  // Handle height input change with validation (allows free typing)
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = validateDimensionInput(e.target.value);
    setHeight(validatedValue);
  };

  // Handle width blur - apply constraints when user finishes typing
  const handleWidthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const constrainedValue = validateDimension(e.target.value);
    setWidth(constrainedValue);
  };

  // Handle height blur - apply constraints when user finishes typing
  const handleHeightBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const constrainedValue = validateDimension(e.target.value);
    setHeight(constrainedValue);
  };

  // Handle calculate price button with enhanced validation
  const handleCalculatePrice = () => {
    console.log('handleCalculatePrice called with:', { width, height });
    const validation = validateDimensions(width, height);
    if (validation.isValid) {
      console.log('Dimensions validated successfully, setting isCalculated to true');
      setIsCalculated(true);
    } else {
      console.log('Dimension validation failed:', validation.errorMessage);
      alert(validation.errorMessage);
    }
  };

  // Handle checkout with dimensions, costs, and calculated price
  const handleCheckoutWithDetails = (quantity: number, calculatedPrice: number) => {
    console.log('handleCheckoutWithDetails called with:', { quantity, calculatedPrice, width, height, additionalCosts });
    onCheckout(quantity, width, height, additionalCosts, calculatedPrice);
  };

  // Debug logging for state changes
  useEffect(() => {
    console.log('ProductCustomizationForm state:', { width, height, isCalculated, additionalCosts });
  }, [width, height, isCalculated, additionalCosts]);

  return (
    <div className={`bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg modern-card ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '300ms' }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">CUSTOMIZE AND ORDER</h3>
        <div className="text-right">
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">From Price</div>
          <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">${product.price}</div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</div>
        </div>
      </div>

      {/* Dimensions Inputs (hide for accessories) */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {!isAccessoryProduct && !isCalculated && (
          <>
            <div className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '350ms' }}>
              <label htmlFor="width-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Width
              </label>
              <input
                id="width-input"
                name="width"
                type="number"
                min="30"
                max="350"
                placeholder={formatDimensionRange(DEFAULT_DIMENSION_CONSTRAINTS)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white product-configuration-input"
                value={width}
                onChange={handleWidthChange}
                onBlur={handleWidthBlur}
                autoComplete="off"
              />
            </div>
            <div className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '400ms' }}>
              <label htmlFor="height-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Height
              </label>
              <input
                id="height-input"
                name="height"
                type="number"
                min="30"
                max="350"
                placeholder={formatDimensionRange(DEFAULT_DIMENSION_CONSTRAINTS)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white product-configuration-input"
                value={height}
                onChange={handleHeightChange}
                onBlur={handleHeightBlur}
                autoComplete="off"
              />
            </div>
          </>
        )}
      </div>

      {!isCalculated && !isAccessoryProduct ? (
        <button 
          className={`w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition shimmer-button ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`}
          style={{ animationDelay: '450ms' }}
          onClick={handleCalculatePrice}
        >
          CALCULATE PRICE
        </button>
      ) : (
        <>
          <ProductCustomization 
            product={product}
            options={customizationOptions}
            selectedOptions={selectedOptions}
            onOptionChange={onOptionChange}
            width={typeof width === 'number' ? width : undefined}
            height={typeof height === 'number' ? height : undefined}
          />
          <PriceCalculator 
            basePrice={product.price}
            width={(() => {
              const calculatedWidth = isAccessoryProduct ? 0 : (typeof width === 'number' ? width : 0);
              console.log('PriceCalculator width calculation:', { isAccessoryProduct, width, calculatedWidth });
              return calculatedWidth;
            })()}
            height={(() => {
              const calculatedHeight = isAccessoryProduct ? 0 : (typeof height === 'number' ? height : 0);
              console.log('PriceCalculator height calculation:', { isAccessoryProduct, height, calculatedHeight });
              return calculatedHeight;
            })()}
            additionalCosts={additionalCosts}
            onCheckout={handleCheckoutWithDetails}
            isAccessory={isAccessoryProduct}
          />
        </>
      )}
    </div>
  );
};

export default ProductCustomizationForm; 