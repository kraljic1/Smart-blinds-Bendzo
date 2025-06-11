import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
 hasMultipleImages: boolean;
 onPrevImage?: () => void;
 onNextImage?: () => void;
}

/**
 * Navigation controls component for image gallery
 * Handles previous and next image navigation
 */
const NavigationControls: React.FC<NavigationControlsProps> = ({
 hasMultipleImages,
 onPrevImage,
 onNextImage
}) => {
 if (!hasMultipleImages) {
 return null;
 }

 return (
 <>
 <button 
 onClick={onPrevImage}
 className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 :bg-gray-700 transition focus:outline-none"
 aria-label="Previous image"
 title="Previous image"
 >
 <ChevronLeft className="w-6 h-6 text-gray-700"/>
 </button>
 
 <button 
 onClick={onNextImage}
 className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 :bg-gray-700 transition focus:outline-none"
 aria-label="Next image"
 title="Next image"
 >
 <ChevronRight className="w-6 h-6 text-gray-700"/>
 </button>
 </>
 );
};

export default NavigationControls; 