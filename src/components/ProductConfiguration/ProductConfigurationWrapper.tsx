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

interface ProductConfigurationWrapperProps {
  product: Product;
  isAccessoryProduct: boolean;
  customizationOptions: CustomizationOption[];
  allImages: string[];
  onGoBack: () => void;
  onCheckout: (quantity: number, options: Record<string, string | number | boolean>) => void;
}

const ProductConfigurationWrapper = ({
  product,
  isAccessoryProduct,
  customizationOptions,
  allImages,
  onGoBack,
  onCheckout
}: ProductConfigurationWrapperProps) => {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Modal states
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);
  
  // Customization state
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  // Initialize default options
  useEffect(() => {
    if (customizationOptions.length > 0) {
      const defaultSelections: Record<string, string> = {};
      customizationOptions.forEach(option => {
        if (option.options.length > 0) {
          defaultSelections[option.id] = option.options[0].id;
        }
      });
      setSelectedOptions(defaultSelections);
    }
  }, [customizationOptions]);

  // Trigger animations after component mounts
  useEffect(() => {
    // Short delay before starting animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Set animation as finished after all staggered elements should be done
    const animTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, 1800);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(animTimer);
    };
  }, []);

  // Handle option change
  const handleOptionChange = (optionId: string, valueId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: valueId
    }));
  };

  // Handle checkout with dimensions and costs from form
  const handleCheckoutWithDetails = (
    quantity: number, 
    width: number | '', 
    height: number | '', 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    additionalCosts: { name: string; price: number }[]
  ) => {
    // Prepare options to save with the product
    const options: Record<string, string | number | boolean> = {
      ...selectedOptions
    };
    
    // Add width and height for non-accessory products
    if (!isAccessoryProduct) {
      if (typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0) {
        options.width = width;
        options.height = height;
      } else {
        // For non-accessory products, width and height are required
        alert('Please ensure width and height are valid before adding to basket');
        return;
      }
    }
    
    // Pass all options to parent
    onCheckout(quantity, options);
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
              images={allImages}
              productName={product.name}
              onZoom={handleZoomImage}
              isVisible={isVisible}
              animationFinished={animationFinished}
            />

            <div className="space-y-6">
              <ProductInfo 
                product={product}
                onInfoClick={handleInfoButtonClick}
                isVisible={isVisible}
                animationFinished={animationFinished}
              />

              <ProductCustomizationForm 
                product={product}
                isAccessoryProduct={isAccessoryProduct}
                customizationOptions={customizationOptions}
                selectedOptions={selectedOptions}
                onOptionChange={handleOptionChange}
                onCheckout={handleCheckoutWithDetails}
                isVisible={isVisible}
                animationFinished={animationFinished}
              />
              
              <ProductFeatures 
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
          imageUrl={allImages[zoomImageIndex]}
          altText={product.name}
          onClose={() => setIsZoomModalOpen(false)}
          allImages={allImages}
          currentIndex={zoomImageIndex}
          onPrevImage={() => setZoomImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
          onNextImage={() => setZoomImageIndex(prev => (prev + 1) % allImages.length)}
        />
      )}
    </div>
  );
};

export default ProductConfigurationWrapper; 