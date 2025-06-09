import ProductCustomization from '../../Product/ProductCustomization';
import PriceCalculator from '../../Product/PriceCalculator';
import { Product } from '../../../types/product';
import { CustomizationOption } from '../../Product/ProductCustomization/types';

interface CustomizationSectionProps {
  product: Product;
  customizationOptions: CustomizationOption[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionId: string, valueId: string) => void;
  width: number | '';
  height: number | '';
  additionalCosts: { name: string; price: number }[];
  isAccessoryProduct: boolean;
  onCheckout: (quantity: number, calculatedPrice: number) => void;
}

export function CustomizationSection({
  product,
  customizationOptions,
  selectedOptions,
  onOptionChange,
  width,
  height,
  additionalCosts,
  isAccessoryProduct,
  onCheckout
}: CustomizationSectionProps) {
  const calculatedWidth = isAccessoryProduct ? 0 : (typeof width === 'number' ? width : 0);
  const calculatedHeight = isAccessoryProduct ? 0 : (typeof height === 'number' ? height : 0);

  return (
    <>
      <ProductCustomization 
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
        onCheckout={onCheckout}
        isAccessory={isAccessoryProduct}
      />
    </>
  );
} 