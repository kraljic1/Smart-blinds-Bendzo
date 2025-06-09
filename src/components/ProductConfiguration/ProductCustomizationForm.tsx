/**
 * Main product customization form component - refactored into modular components
 */

import { FormContent } from './components/FormContent';
import { useFormState } from './hooks/useFormState';
import { useCheckoutHandler } from './hooks/useCheckoutHandler';
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
  const formState = useFormState({
    isAccessoryProduct,
    customizationOptions,
    selectedOptions
  });

  const { handleCheckoutWithDetails } = useCheckoutHandler({
    width: formState.width,
    height: formState.height,
    additionalCosts: formState.additionalCosts,
    onCheckout
  });

  return (
    <div 
      className={`bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg modern-card ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} 
      style={{ animationDelay: '300ms' }}
    >
      <FormContent
        product={product}
        isAccessoryProduct={isAccessoryProduct}
        customizationOptions={customizationOptions}
        selectedOptions={selectedOptions}
        onOptionChange={onOptionChange}
        formState={formState}
        handleCheckoutWithDetails={handleCheckoutWithDetails}
        isVisible={isVisible}
        animationFinished={animationFinished}
      />
    </div>
  );
};

export default ProductCustomizationForm; 