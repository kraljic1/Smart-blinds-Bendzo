import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Product } from '../../types/product';
import { CustomizationOption } from '../ProductCustomization';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductCustomizationForm from './ProductCustomizationForm';
import ProductFeatures from './ProductFeatures';
import ImageZoomModal from '../ImageZoomModal';
import InfoPanel from '../InfoPanel';
import '../../styles/ProductConfiguration.css';
import { useAnimationStates, useDefaultOptions } from './ProductConfigurationHooks';
import { handleProductOptionChange, prepareCheckoutOptions } from './ProductConfigurationUtils';

interface ProductConfigurationWrapperProps {
  product: Product;
  isAccessoryProduct: boolean;
  customizationOptions: CustomizationOption[];
  allImages: string[];
  onGoBack: () => void;
  onCheckout: (quantity: number, options: Record<string, string | number | boolean>) => void;
  onProductChange?: (product: Product) => void;
}

const ProductConfigurationWrapper = ({
  product,
  isAccessoryProduct,
  customizationOptions,
  allImages,
  onGoBack,
  onCheckout,
  onProductChange
}: ProductConfigurationWrapperProps) => {
  // Current product state
  const [currentProduct, setCurrentProduct] = useState<Product>(product);
  const [currentImages, setCurrentImages] = useState<string[]>(allImages);
  
  // Use custom hooks for animations and default options
  const { isVisible, animationFinished } = useAnimationStates();
  const { selectedOptions, setSelectedOptions } = useDefaultOptions(customizationOptions, currentProduct);
  
  // Container reference for animations
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Modal states
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);
  
  // Update product when changed from parent
  useEffect(() => {
    setCurrentProduct(product);
    setCurrentImages(allImages);
  }, [product, allImages]);

  // Option change handler using utility function
  const onOptionChange = (optionId: string, valueId: string) => {
    handleProductOptionChange(
      optionId,
      valueId,
      selectedOptions,
      setSelectedOptions,
      setCurrentProduct,
      setCurrentImages,
      onProductChange
    );
  };

  // Handle checkout with dimensions and costs from form
  const handleCheckoutWithDetails = (
    quantity: number, 
    width: number | '', 
    height: number | '', 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    additionalCosts: { name: string; price: number }[]
  ) => {
    const options = prepareCheckoutOptions(
      quantity,
      width,
      height,
      selectedOptions,
      isAccessoryProduct
    );
    
    if (options) {
      onCheckout(quantity, options);
    }
  };

  // Handle info button click
  const handleInfoButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInfoPanelOpen(true);
  };

  // Handle zoom image
  const handleZoomImage = (index: number) => {
    setZoomImageIndex(index);
    setIsZoomModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-[#0c1222]" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onGoBack}
          className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6 sm:mb-8 ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Products
        </button>

        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden modern-card ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6">
            <ProductImageGallery 
              images={currentImages}
              productName={currentProduct.name}
              onZoom={handleZoomImage}
              isVisible={isVisible}
              animationFinished={animationFinished}
            />

            <div className="space-y-6">
              <ProductInfo 
                product={currentProduct}
                onInfoClick={handleInfoButtonClick}
                isVisible={isVisible}
                animationFinished={animationFinished}
              />

              <ProductCustomizationForm 
                product={currentProduct}
                isAccessoryProduct={isAccessoryProduct}
                customizationOptions={customizationOptions}
                selectedOptions={selectedOptions}
                onOptionChange={onOptionChange}
                onCheckout={handleCheckoutWithDetails}
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
      </div>

      <InfoPanel 
        isOpen={isInfoPanelOpen} 
        onClose={() => setIsInfoPanelOpen(false)} 
      />

      {/* Image Zoom Modal */}
      {isZoomModalOpen && (
        <ImageZoomModal
          imageUrl={currentImages[zoomImageIndex]}
          altText={currentProduct.name}
          onClose={() => setIsZoomModalOpen(false)}
          allImages={currentImages}
          currentIndex={zoomImageIndex}
          onPrevImage={() => setZoomImageIndex(prev => prev === 0 ? currentImages.length - 1 : prev - 1)}
          onNextImage={() => setZoomImageIndex(prev => (prev + 1) % currentImages.length)}
        />
      )}
    </div>
  );
};

export default ProductConfigurationWrapper; 