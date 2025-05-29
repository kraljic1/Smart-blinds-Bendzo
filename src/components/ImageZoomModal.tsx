import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageZoomModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
  allImages?: string[];
  currentIndex?: number;
  onPrevImage?: () => void;
  onNextImage?: () => void;
}

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
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  // Check if navigation is available
  const hasMultipleImages = allImages.length > 1;

  useEffect(() => {
    // Add event listener to close the modal when Escape key is pressed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages && onPrevImage) {
        onPrevImage();
      } else if (e.key === 'ArrowRight' && hasMultipleImages && onNextImage) {
        onNextImage();
      }
    };

    // Prevent scrolling while modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, hasMultipleImages, onPrevImage, onNextImage]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

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
      <div className="absolute top-4 right-4 flex space-x-2 z-50">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          title="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            <line x1="11" x2="11" y1="8" y2="14"></line>
            <line x1="8" x2="14" y1="11" y2="11"></line>
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          title="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            <line x1="8" x2="14" y1="11" y2="11"></line>
          </svg>
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          title="Reset zoom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          title="Close zoom view"
          aria-label="Close zoom view"
        >
          <X className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      
      {/* Navigation buttons */}
      {hasMultipleImages && (
        <>
          <button 
            onClick={onPrevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none"
            aria-label="Previous image"
            title="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          
          <button 
            onClick={onNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none"
            aria-label="Next image"
            title="Next image"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </>
      )}
      
      <div 
        className="relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
          src={imageUrl} 
          alt={altText}
          className="transition-transform max-w-[90vw] max-h-[90vh]"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          draggable="false"
        />
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full text-sm text-gray-600 dark:text-gray-300 shadow-lg">
        {hasMultipleImages ? (
          <span className="mr-3">Image {currentIndex + 1} of {allImages.length}</span>
        ) : null}
        {Math.round(scale * 100)}% - Drag to move, use buttons to zoom
      </div>
    </div>
  );
};

export default ImageZoomModal; 