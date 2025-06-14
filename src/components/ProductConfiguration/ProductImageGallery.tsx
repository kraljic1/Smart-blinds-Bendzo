import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';


interface ProductImageGalleryProps {
 images: string[];
 productName: string;
 onZoom: (index: number) => void;
 isVisible?: boolean;
 animationFinished?: boolean;
}

const ProductImageGallery = ({
 images,
 productName,
 onZoom,
 isVisible = true,
 animationFinished = true
}: ProductImageGalleryProps) => {
 const [selectedImageIndex, setSelectedImageIndex] = useState(0);

 const handlePrevImage = () => {
 setSelectedImageIndex((prevIndex) => 
 prevIndex === 0 ? images.length - 1 : prevIndex - 1
 );
 };

 const handleNextImage = () => {
 setSelectedImageIndex((prevIndex) => 
 (prevIndex + 1) % images.length
 );
 };

 const handleThumbnailClick = (index: number) => {
 setSelectedImageIndex(index);
 };

 const handleZoomButtonClick = () => {
 onZoom(selectedImageIndex);
 };

 return (
 <div className={`space-y-4 delay-75 ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}>
 {/* Main product image with navigation arrows */}
 <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mx-auto depth-effect">
 {images.length > 1 && (
 <>
 <button 
 onClick={handlePrevImage}
 className={`absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-r-full sm:rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100 :bg-gray-700 transition delay-150 ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
 aria-label="Previous image"
 >
 <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"/>
 </button>
 <button 
 onClick={handleNextImage}
 className={`absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-l-full sm:rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100 :bg-gray-700 transition ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
 style={{ animationDelay: '175ms' }}
 aria-label="Next image"
 >
 <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"/>
 </button>
 
 {/* Image indicators (dots) for mobile */}
 <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10 sm:hidden">
 {images.map((_, index) => (
 <button
 key={index}
 onClick={() => handleThumbnailClick(index)}
 className={`w-2 h-2 rounded-full ${
 selectedImageIndex === index 
 ? 'bg-blue-600 ' 
 : 'bg-gray-300 '
 } ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
 style={{ animationDelay: `${200 + index * 25}ms` }}
 aria-label={`Go to image ${index + 1}`}
 />
 ))}
 </div>
 </>
 )}
 
 {/* Zoom button */}
 <button 
 onClick={handleZoomButtonClick}
 className={`absolute right-2 bottom-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 :bg-gray-700 transition hidden sm:block ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
 style={{ animationDelay: '200ms' }}
 aria-label="Zoom image"
 >
 <ZoomIn className="w-5 h-5 text-gray-700"/>
 </button>
 
 <img 
 src={images[selectedImageIndex]}
 alt={productName}
 className={`w-full h-full object-cover depth-effect-inner ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
 style={{ animationDelay: '100ms' }}
 />
 </div>
 
 {/* Thumbnail gallery - hidden on very small screens */}
 {images.length > 1 && (
 <div className="hidden sm:flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
 {images.map((image, index) => (
 <button 
 key={index} 
 onClick={() => handleThumbnailClick(index)}
 className={`flex-shrink-0 w-20 sm:w-24 h-20 sm:h-24 border-2 rounded-md overflow-hidden ${
 selectedImageIndex === index 
 ? 'border-blue-600 ' 
 : 'border-gray-200 '
 } ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`}
 style={{ animationDelay: `${225 + index * 50}ms` }}
 aria-label={`View image ${index + 1}`}
 >
 <img 
 src={image}
 alt={`${productName} thumbnail ${index + 1}`}
 className="w-full h-full object-cover"
 />
 </button>
 ))}
 </div>
 )}
 </div>
 );
};

export default ProductImageGallery; 