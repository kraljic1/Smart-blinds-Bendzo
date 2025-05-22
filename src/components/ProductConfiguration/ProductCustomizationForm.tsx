import { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types/product';
import ProductCustomization, { CustomizationOption } from '../ProductCustomization';
import PriceCalculator from '../PriceCalculator';

interface ProductCustomizationFormProps {
  product: Product;
  isAccessoryProduct: boolean;
  customizationOptions: CustomizationOption[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionId: string, valueId: string) => void;
  onCheckout: (quantity: number, width: number | '', height: number | '', additionalCosts: { name: string; price: number }[]) => void;
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
          const selectedValue = option.options.find((o) => o.id === selectedOptionId);
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

  // Handle width input change
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWidth(value === '' ? '' : Number(value));
  };

  // Handle height input change
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeight(value === '' ? '' : Number(value));
  };

  // Handle calculate price button
  const handleCalculatePrice = () => {
    if (typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0) {
      setIsCalculated(true);
    } else {
      alert('Please enter valid width and height values');
    }
  };

  // Handle checkout with dimensions and costs
  const handleCheckoutWithDetails = (quantity: number) => {
    onCheckout(quantity, width, height, additionalCosts);
  };

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
              <label htmlFor="product-width" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Width
              </label>
              <input
                id="product-width"
                name="product-width"
                type="text"
                placeholder="30 - 350 cm"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white product-configuration-input"
                value={width}
                onChange={handleWidthChange}
                autoComplete="off"
              />
            </div>
            <div className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '400ms' }}>
              <label htmlFor="product-height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Height
              </label>
              <input
                id="product-height"
                name="product-height"
                type="text"
                placeholder="30 - 350 cm"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white product-configuration-input"
                value={height}
                onChange={handleHeightChange}
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
            width={isAccessoryProduct ? 0 : (typeof width === 'number' ? width : 0)}
            height={isAccessoryProduct ? 0 : (typeof height === 'number' ? height : 0)}
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