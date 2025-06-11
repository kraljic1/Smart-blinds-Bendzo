import React, { useRef } from 'react';
import ZoomControls from './components/ZoomControls';
import NavigationControls from './components/NavigationControls';
import ZoomableImage from './components/ZoomableImage';
import ModalInfo from './components/ModalInfo';
import { useImageZoom } from './hooks/useImageZoom';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

interface ImageZoomModalProps {
 imageUrl: string;
 altText: string;
 onClose: () => void;
 allImages?: string[];
 currentIndex?: number;
 onPrevImage?: () => void;
 onNextImage?: () => void;
}

/**
 * Main image zoom modal component
 * Provides zoomable, draggable image viewing with navigation
 * Complex UI component with zoom, pan, and gallery functionality
 */
const ImageZoomModal: React.FC<ImageZoomModalProps> = ({ 
 imageUrl, 
 altText, 
 onClose, 
 allImages = [], 
 currentIndex = 0,
 onPrevImage,
 onNextImage
}) => {
 const modalRef = useRef<HTMLDivElement>(null);
 
 // Check if navigation is available
 const hasMultipleImages = allImages.length > 1;

 // Custom hooks for functionality
 const {
 isDragging,
 position,
 scale,
 handleMouseDown,
 handleMouseMove,
 handleMouseUp,
 handleZoomIn,
 handleZoomOut,
 handleReset
 } = useImageZoom();

 useKeyboardNavigation({
 onClose,
 hasMultipleImages,
 onPrevImage,
 onNextImage
 });

 const handleModalClick = (e: React.MouseEvent) => {
 // Close modal if the background (not the image) is clicked
 if (e.target === modalRef.current) {
 onClose();
 }
 };

 return (
 <div 
 ref={modalRef}
 className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center cursor-move"
 onClick={handleModalClick}
 >
 <ZoomControls
 onZoomIn={handleZoomIn}
 onZoomOut={handleZoomOut}
 onReset={handleReset}
 onClose={onClose}
 />
 
 <NavigationControls
 hasMultipleImages={hasMultipleImages}
 onPrevImage={onPrevImage}
 onNextImage={onNextImage}
 />
 
 <ZoomableImage
 imageUrl={imageUrl}
 altText={altText}
 position={position}
 scale={scale}
 isDragging={isDragging}
 onMouseDown={handleMouseDown}
 onMouseMove={handleMouseMove}
 onMouseUp={handleMouseUp}
 onMouseLeave={handleMouseUp}
 />
 
 <ModalInfo
 hasMultipleImages={hasMultipleImages}
 currentIndex={currentIndex}
 totalImages={allImages.length}
 scale={scale}
 />
 </div>
 );
};

export default ImageZoomModal; 