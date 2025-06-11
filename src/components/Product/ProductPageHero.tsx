import React from 'react';

interface ProductPageHeroProps {
 title: string;
 description: string;
 heroImage: string;
 imageAlt: string;
 isLoaded: boolean;
 onExploreClick?: (e: React.MouseEvent) => void;
}

/**
 * Hero section component for product pages
 * Features a background image, title, description, and call-to-action
 */
const ProductPageHero: React.FC<ProductPageHeroProps> = ({
 title,
 description,
 heroImage,
 imageAlt,
 isLoaded,
 onExploreClick
}) => {
 return (
 <div className={`relative h-[40vh] mb-16 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
 <div className="absolute inset-0">
 <img 
 src={heroImage} 
 alt={imageAlt}
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"/>
 </div>
 <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
 <div className="max-w-3xl">
 <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
 {title}
 </h2>
 <p className="text-lg sm:text-xl text-gray-200 mb-8">
 {description}
 </p>
 {onExploreClick && (
 <a 
 href="#products"
 onClick={onExploreClick}
 className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition inline-block"
 >
 Explore Collection
 </a>
 )}
 </div>
 </div>
 </div>
 );
};

export default ProductPageHero; 