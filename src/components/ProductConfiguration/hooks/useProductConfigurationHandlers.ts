import { Product } from '../../../types/product';
import { handleProductOptionChange, prepareCheckoutOptions } from '../ProductConfigurationUtils';

interface UseProductConfigurationHandlersProps {
 selectedOptions: Record<string, string>;
 setSelectedOptions: React.Dispatch<React.SetStateAction<Record<string, string>>>;
 setCurrentProduct: React.Dispatch<React.SetStateAction<Product>>;
 setCurrentImages: React.Dispatch<React.SetStateAction<string[]>>;
 setIsInfoPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
 setIsZoomModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
 setZoomImageIndex: React.Dispatch<React.SetStateAction<number>>;
 currentImages: string[];
 isAccessoryProduct: boolean;
 onProductChange?: (product: Product) => void;
 onCheckout: (quantity: number, options: Record<string, string | number | boolean>, calculatedPrice: number) => void;
}

export const useProductConfigurationHandlers = ({
 selectedOptions,
 setSelectedOptions,
 setCurrentProduct,
 setCurrentImages,
 setIsInfoPanelOpen,
 setIsZoomModalOpen,
 setZoomImageIndex,
 currentImages,
 isAccessoryProduct,
 onProductChange,
 onCheckout
}: UseProductConfigurationHandlersProps) => {
 
 // Option change handler using utility function
 const handleOptionChange = (optionId: string, valueId: string) => {
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

 // Handle checkout with dimensions, costs, and calculated price from form
 const handleCheckoutWithDetails = (
 quantity: number, 
 width: number | '', 
 height: number | '', 
 additionalCosts: { name: string; price: number }[],
 calculatedPrice: number
 ) => {
 const options = prepareCheckoutOptions(
 quantity,
 width,
 height,
 selectedOptions,
 isAccessoryProduct
 );
 
 if (options) {
 onCheckout(quantity, options, calculatedPrice);
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

 // Modal handlers
 const handleCloseInfoPanel = () => setIsInfoPanelOpen(false);
 const handleCloseZoomModal = () => setIsZoomModalOpen(false);
 
 const handlePrevImage = () => {
 setZoomImageIndex(prev => prev === 0 ? currentImages.length - 1 : prev - 1);
 };
 
 const handleNextImage = () => {
 setZoomImageIndex(prev => (prev + 1) % currentImages.length);
 };

 return {
 handleOptionChange,
 handleCheckoutWithDetails,
 handleInfoButtonClick,
 handleZoomImage,
 handleCloseInfoPanel,
 handleCloseZoomModal,
 handlePrevImage,
 handleNextImage
 };
}; 