import React from 'react';

interface ModalInfoProps {
 hasMultipleImages: boolean;
 currentIndex: number;
 totalImages: number;
 scale: number;
}

/**
 * Modal information bar component
 * Displays image count, zoom level, and usage instructions
 */
const ModalInfo: React.FC<ModalInfoProps> = ({
 hasMultipleImages,
 currentIndex,
 totalImages,
 scale
}) => {
 return (
 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full text-sm text-gray-600 shadow-lg">
 {hasMultipleImages && (
 <span className="mr-3">Image {currentIndex + 1} of {totalImages}</span>
 )}
 {Math.round(scale * 100)}% - Drag to move, use buttons to zoom
 </div>
 );
};

export default ModalInfo; 