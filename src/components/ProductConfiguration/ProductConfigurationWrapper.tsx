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
import { allProducts } from '../../data/collections';

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

  // Update product when changed from parent
  useEffect(() => {
    setCurrentProduct(product);
    setCurrentImages(allImages);
  }, [product, allImages]);

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

    // If the color option was changed, update the product
    if (optionId === 'color') {
      // Find the product by ID (which is the same as the color option valueId)
      const newProduct = allProducts.find(p => p.id === valueId);
      
      if (newProduct) {
        // Update the current product
        setCurrentProduct(newProduct);
        
        // Generate ordered images for the new product
        if (newProduct.images && newProduct.images.length > 0) {
          const hasNumberedImages = newProduct.images.some(img => 
            img.includes("/0.webp") || img.includes("/1.webp") || img.includes("/2.webp") || 
            img.includes("/3.webp") || img.includes("/4.webp")
          );
          
          if (hasNumberedImages) {
            // Create ordered array of numbered images
            const orderedImages: string[] = [];
            
            // Find the cover image (0.webp)
            const coverImage = newProduct.images.find(img => img.includes("/0.webp"));
            if (coverImage) {
              orderedImages.push(coverImage);
            } else {
              // Fallback to main image if 0.webp not found
              orderedImages.push(newProduct.image);
            }
            
            // Add remaining images in numerical order
            for (let i = 1; i <= 4; i++) {
              const img = newProduct.images.find(img => img.includes(`/${i}.webp`));
              if (img) {
                orderedImages.push(img);
              }
            }
            
            setCurrentImages(orderedImages);
          } else {
            // For legacy image naming conventions
            const images: string[] = [];
            
            // Add main image
            images.push(newProduct.image);
            
            // Add additional images, skipping any that match the main image
            newProduct.images.forEach(img => {
              if (img !== newProduct.image) {
                images.push(img);
              }
            });
            
            setCurrentImages(images);
          }
        } else {
          setCurrentImages([newProduct.image]);
        }
        
        // Notify parent component about product change
        if (onProductChange) {
          onProductChange(newProduct);
        }
      }
    }
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
                onOptionChange={handleOptionChange}
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