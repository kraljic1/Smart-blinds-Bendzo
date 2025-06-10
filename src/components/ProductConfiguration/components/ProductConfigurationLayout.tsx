import React from 'react';
import { Product } from '../../../types/product';
import { CustomizationOption } from '../../Product/ProductCustomization';
import ProductImageGallery from '../ProductImageGallery';
import ProductInfo from '../ProductInfo';
import ProductCustomizationForm from '../ProductCustomizationForm';
import ProductFeatures from '../ProductFeatures';

interface ProductConfigurationLayoutProps {
  currentProduct: Product;
  currentImages: string[];
  isAccessoryProduct: boolean;
  customizationOptions: CustomizationOption[];
  selectedOptions: Record<string, string>;
  isVisible: boolean;
  animationFinished: boolean;
  onOptionChange: (optionId: string, valueId: string) => void;
  onCheckout: (quantity: number, width: number | '', height: number | '', additionalCosts: { name: string; price: number }[], calculatedPrice: number) => void;
  onInfoClick: (e: React.MouseEvent) => void;
  onZoom: (index: number) => void;
}

const ProductConfigurationLayout: React.FC<ProductConfigurationLayoutProps> = ({
  currentProduct,
  currentImages,
  isAccessoryProduct,
  customizationOptions,
  selectedOptions,
  isVisible,
  animationFinished,
  onOptionChange,
  onCheckout,
  onInfoClick,
  onZoom
}) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden modern-card ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6">
        <ProductImageGallery 
          images={currentImages}
          productName={currentProduct.name}
          onZoom={onZoom}
          isVisible={isVisible}
          animationFinished={animationFinished}
        />

        <div className="space-y-6">
          <ProductInfo 
            product={currentProduct}
            onInfoClick={onInfoClick}
            isVisible={isVisible}
            animationFinished={animationFinished}
          />

          <ProductCustomizationForm 
            product={currentProduct}
            isAccessoryProduct={isAccessoryProduct}
            customizationOptions={customizationOptions}
            selectedOptions={selectedOptions}
            onOptionChange={onOptionChange}
            onCheckout={onCheckout}
            isVisible={isVisible}
            animationFinished={animationFinished}
          />
          
          <ProductFeatures 
            product={currentProduct}
            isVisible={isVisible}
            animationFinished={animationFinished}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductConfigurationLayout; 