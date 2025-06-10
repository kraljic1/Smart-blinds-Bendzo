import React from 'react';
import { Product } from '../../../types/product';
import ImageZoomModal from '../../UI/ImageZoomModal';
import InfoPanel from '../../InfoPanel';

interface ProductConfigurationModalsProps {
  currentProduct: Product;
  currentImages: string[];
  isInfoPanelOpen: boolean;
  isZoomModalOpen: boolean;
  zoomImageIndex: number;
  onCloseInfoPanel: () => void;
  onCloseZoomModal: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}

const ProductConfigurationModals: React.FC<ProductConfigurationModalsProps> = ({
  currentProduct,
  currentImages,
  isInfoPanelOpen,
  isZoomModalOpen,
  zoomImageIndex,
  onCloseInfoPanel,
  onCloseZoomModal,
  onPrevImage,
  onNextImage
}) => {
  return (
    <>
      <InfoPanel 
        isOpen={isInfoPanelOpen} 
        onClose={onCloseInfoPanel} 
      />

      {/* Image Zoom Modal */}
      {isZoomModalOpen && (
        <ImageZoomModal
          imageUrl={currentImages[zoomImageIndex]}
          altText={currentProduct.name}
          onClose={onCloseZoomModal}
          allImages={currentImages}
          currentIndex={zoomImageIndex}
          onPrevImage={onPrevImage}
          onNextImage={onNextImage}
        />
      )}
    </>
  );
};

export default ProductConfigurationModals; 