import { DimensionSection } from './DimensionSection';
import { CustomizationSection } from './CustomizationSection';
import { BaseFormProps } from './types';

export function ConditionalSections({
  product,
  isAccessoryProduct,
  customizationOptions,
  selectedOptions,
  onOptionChange,
  formState,
  handleCheckoutWithDetails,
  isVisible,
  animationFinished
}: BaseFormProps) {
  const shouldShowDimensions = !isAccessoryProduct && !formState.isCalculated;
  const shouldShowCustomization = formState.isCalculated || isAccessoryProduct;

  return (
    <>
      {shouldShowDimensions && (
        <DimensionSection
          width={formState.width}
          height={formState.height}
          onWidthChange={formState.handleWidthChange}
          onHeightChange={formState.handleHeightChange}
          onWidthBlur={formState.handleWidthBlur}
          onHeightBlur={formState.handleHeightBlur}
          onCalculatePrice={formState.handleCalculatePrice}
          isVisible={isVisible}
          animationFinished={animationFinished}
        />
      )}

      {shouldShowCustomization && (
        <CustomizationSection
          product={product}
          customizationOptions={customizationOptions}
          selectedOptions={selectedOptions}
          onOptionChange={onOptionChange}
          width={formState.width}
          height={formState.height}
          additionalCosts={formState.additionalCosts}
          isAccessoryProduct={isAccessoryProduct}
          onCheckout={handleCheckoutWithDetails}
        />
      )}
    </>
  );
} 