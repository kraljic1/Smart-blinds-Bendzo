/**
 * Main product customization form component - refactored into modular components
 */

import ProductCustomization from '../Product/ProductCustomization';
import PriceCalculator from '../Product/PriceCalculator';
import FormHeader from './FormHeader';
import DimensionInputs from './DimensionInputs';
import CalculatePriceButton from './CalculatePriceButton';
import { useFormState } from './hooks/useFormState';
import { ProductCustomizationFormProps } from './types';

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
  const {
    width,
    height,
    isCalculated,
    additionalCosts,
    handleWidthChange,
    handleHeightChange,
    handleWidthBlur,
    handleHeightBlur,
    handleCalculatePrice
  } = useFormState({
    isAccessoryProduct,
    customizationOptions,
    selectedOptions
  });

  // Handle checkout with dimensions, costs, and calculated price
  const handleCheckoutWithDetails = (quantity: number, calculatedPrice: number) => {
    console.log('handleCheckoutWithDetails called with:', { 
      quantity, 
      calculatedPrice, 
      width, 
      height, 
      additionalCosts 
    });
    onCheckout(quantity, width, height, additionalCosts, calculatedPrice);
  };

  // Calculate width and height for PriceCalculator
  const calculatedWidth = isAccessoryProduct ? 0 : (typeof width === 'number' ? width : 0);
  const calculatedHeight = isAccessoryProduct ? 0 : (typeof height === 'number' ? height : 0);

  console.log('PriceCalculator calculations:', { 
    isAccessoryProduct, 
    width, 
    height, 
    calculatedWidth, 
    calculatedHeight 
  });

  return (
    <div 
      className={`bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg modern-card ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} 
      style={{ animationDelay: '300ms' }}
    >
      <FormHeader 
        product={product}
        isAccessoryProduct={isAccessoryProduct}
      />

      {/* Dimensions Inputs (hide for accessories) */}
      {!isAccessoryProduct && !isCalculated && (
        <DimensionInputs
          width={width}
          height={height}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
          onWidthBlur={handleWidthBlur}
          onHeightBlur={handleHeightBlur}
          isVisible={isVisible}
          animationFinished={animationFinished}
        />
      )}

      {!isCalculated && !isAccessoryProduct ? (
        <CalculatePriceButton
          onCalculatePrice={handleCalculatePrice}
          isVisible={isVisible}
          animationFinished={animationFinished}
        />
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
            width={calculatedWidth}
            height={calculatedHeight}
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