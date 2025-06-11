import { useRef } from 'react';
import { Product } from '../../types/product';
import { CustomizationOption } from '../Product/ProductCustomization';
import { ProductConfigurationLayout, ProductConfigurationHeader, ProductConfigurationModals } from './components';
import { useProductConfigurationState, useProductConfigurationHandlers } from './hooks';


interface ProductConfigurationWrapperProps {
 product: Product;
 isAccessoryProduct: boolean;
 customizationOptions: CustomizationOption[];
 allImages: string[];
 onGoBack: () => void;
 onCheckout: (quantity: number, options: Record<string, string | number | boolean>, calculatedPrice: number) => void;
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
 // Container reference for animations
 const containerRef = useRef<HTMLDivElement>(null);
 
 // Custom hooks for state management
 const state = useProductConfigurationState({
 product,
 allImages,
 customizationOptions
 });

 // Custom hooks for event handlers
 const handlers = useProductConfigurationHandlers({
 selectedOptions: state.selectedOptions,
 setSelectedOptions: state.setSelectedOptions,
 setCurrentProduct: state.setCurrentProduct,
 setCurrentImages: state.setCurrentImages,
 setIsInfoPanelOpen: state.setIsInfoPanelOpen,
 setIsZoomModalOpen: state.setIsZoomModalOpen,
 setZoomImageIndex: state.setZoomImageIndex,
 currentImages: state.currentImages,
 isAccessoryProduct,
 onProductChange,
 onCheckout
 });

 return (
 <div className="bg-white [#0c1222]"ref={containerRef}>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <ProductConfigurationHeader 
 isVisible={state.isVisible}
 onGoBack={onGoBack}
 />

 <ProductConfigurationLayout
 currentProduct={state.currentProduct}
 currentImages={state.currentImages}
 isAccessoryProduct={isAccessoryProduct}
 customizationOptions={customizationOptions}
 selectedOptions={state.selectedOptions}
 isVisible={state.isVisible}
 animationFinished={state.animationFinished}
 onOptionChange={handlers.handleOptionChange}
 onCheckout={handlers.handleCheckoutWithDetails}
 onInfoClick={handlers.handleInfoButtonClick}
 onZoom={handlers.handleZoomImage}
 />
 </div>

 <ProductConfigurationModals
 currentProduct={state.currentProduct}
 currentImages={state.currentImages}
 isInfoPanelOpen={state.isInfoPanelOpen}
 isZoomModalOpen={state.isZoomModalOpen}
 zoomImageIndex={state.zoomImageIndex}
 onCloseInfoPanel={handlers.handleCloseInfoPanel}
 onCloseZoomModal={handlers.handleCloseZoomModal}
 onPrevImage={handlers.handlePrevImage}
 onNextImage={handlers.handleNextImage}
 />
 </div>
 );
};

export default ProductConfigurationWrapper; 