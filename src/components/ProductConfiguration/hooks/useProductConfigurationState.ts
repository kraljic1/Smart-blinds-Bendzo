import { useState, useEffect } from 'react';
import { Product } from '../../../types/product';
import { CustomizationOption } from '../../Product/ProductCustomization';
import { useAnimationStates, useDefaultOptions } from '../ProductConfigurationHooks';

interface UseProductConfigurationStateProps {
  product: Product;
  allImages: string[];
  customizationOptions: CustomizationOption[];
}

export const useProductConfigurationState = ({
  product,
  allImages,
  customizationOptions
}: UseProductConfigurationStateProps) => {
  // Current product state
  const [currentProduct, setCurrentProduct] = useState<Product>(product);
  const [currentImages, setCurrentImages] = useState<string[]>(allImages);
  
  // Use custom hooks for animations and default options
  const { isVisible, animationFinished } = useAnimationStates();
  const { selectedOptions, setSelectedOptions } = useDefaultOptions(customizationOptions, currentProduct);
  
  // Modal states
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);
  
  // Update product when changed from parent
  useEffect(() => {
    setCurrentProduct(product);
    setCurrentImages(allImages);
  }, [product, allImages]);

  return {
    // Product state
    currentProduct,
    setCurrentProduct,
    currentImages,
    setCurrentImages,
    
    // Animation state
    isVisible,
    animationFinished,
    
    // Options state
    selectedOptions,
    setSelectedOptions,
    
    // Modal state
    isInfoPanelOpen,
    setIsInfoPanelOpen,
    isZoomModalOpen,
    setIsZoomModalOpen,
    zoomImageIndex,
    setZoomImageIndex
  };
}; 