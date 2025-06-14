import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPageHeroCarouselProps {
 title: string;
 description: string;
 heroImages: string[];
 imageAlts: string[];
 isLoaded: boolean;
 onExploreClick?: (e: React.MouseEvent) => void;
 autoChangeInterval?: number;
}

/**
 * Carousel hero section component for product pages
 * Features multiple background images with automatic rotation and manual controls
 */
const ProductPageHeroCarousel: React.FC<ProductPageHeroCarouselProps> = ({
 title,
 description,
 heroImages,
 imageAlts,
 isLoaded,
 onExploreClick,
 autoChangeInterval = 5000
}) => {
 const [currentImageIndex, setCurrentImageIndex] = useState(0);

 // Auto-rotate images
 useEffect(() => {
 if (heroImages.length <= 1) return;
 
 const interval = setInterval(() => {
 setCurrentImageIndex((prevIndex) => 
 prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
 );
 }, autoChangeInterval);

 return () => clearInterval(interval);
 }, [heroImages.length, autoChangeInterval]);

 const goToPrevious = () => {
 setCurrentImageIndex(
 currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1
 );
 };

 const goToNext = () => {
 setCurrentImageIndex(
 currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1
 );
 };

 const goToSlide = (index: number) => {
 setCurrentImageIndex(index);
 };

 return (
 <div className={`relative h-[50vh] min-h-[400px] mb-16 overflow-hidden ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
 {/* Image Container */}
 <div className="absolute inset-0">
 {heroImages.map((image, index) => (
 <div
 key={index}
 className={`absolute inset-0 transition-opacity duration-1000 ${
 index === currentImageIndex ? 'opacity-100' : 'opacity-0'
 }`}
 >
 <img 
 src={image} 
 alt={imageAlts[index] || `Hero image ${index + 1}`}
 className="w-full h-full object-contain bg-gradient-to-b from-gray-50 to-gray-100"
 />
 </div>
 ))}
 <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"/>
 </div>

 {/* Navigation Arrows */}
 {heroImages.length > 1 && (
 <>
 <button
 onClick={goToPrevious}
 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 z-10"
 aria-label="Previous image"
 >
 <ChevronLeft className="w-6 h-6 text-white" />
 </button>
 <button
 onClick={goToNext}
 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 z-10"
 aria-label="Next image"
 >
 <ChevronRight className="w-6 h-6 text-white" />
 </button>
 </>
 )}

 {/* Dots Indicator */}
 {heroImages.length > 1 && (
 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
 {heroImages.map((_, index) => (
 <button
 key={index}
 onClick={() => goToSlide(index)}
 className={`w-3 h-3 rounded-full transition-all duration-200 ${
 index === currentImageIndex 
 ? 'bg-white' 
 : 'bg-white/50 hover:bg-white/70'
 }`}
 aria-label={`Go to slide ${index + 1}`}
 />
 ))}
 </div>
 )}

 {/* Content */}
 <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center z-10">
 <div className="max-w-3xl">
 <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
 {title}
 </h2>
 <p className="text-lg sm:text-xl text-blue-50 mb-8 drop-shadow-md">
 {description}
 </p>
 {onExploreClick && (
 <a 
 href="#products"
 onClick={onExploreClick}
 className="bg-white text-blue-900 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition inline-block shadow-lg"
 >
 Explore Collection
 </a>
 )}
 </div>
 </div>
 </div>
 );
};

export default ProductPageHeroCarousel; 