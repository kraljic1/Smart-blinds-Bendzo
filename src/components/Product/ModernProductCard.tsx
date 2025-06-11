import React, { useRef } from 'react';
import { Product } from '../../types/product';
import { useProductCard } from '../../hooks/useProductCard';
import ProductCardImage from './ProductCardImage';
import ProductCardContent from './ProductCardContent';


interface ModernProductCardProps {
 product: Product;
 onConfigure?: (product: Product) => void;
 onRequestSample?: (product: Product) => void;
 configureButtonText?: string;
 delay?: number;
}

const ModernProductCard: React.FC<ModernProductCardProps> = ({ 
 product, 
 onConfigure, 
 onRequestSample,
 configureButtonText ="Configure & Buy",
 delay = 0
}) => {
 const cardRef = useRef<HTMLDivElement>(null);
 
 const {
 isVisible,
 productIsLiked,
 hasFabricImage,
 getFabricImage,
 colorSwatchStyle,
 handleCardClick,
 handleConfigureClick,
 handleRequestSampleClick,
 handleToggleLike
 } = useProductCard({
 product,
 onConfigure,
 onRequestSample,
 delay
 });

 return (
 <div className="group h-full overflow-hidden">
 {/* Card with modern effects */}
 <div 
 ref={cardRef} 
 className={`relative h-full flex flex-col light-card backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 group-hover:shadow-xl cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
 onClick={handleCardClick}
 >
 {/* Subtle card background gradient */}
 <div className="absolute inset-0 bg-gradient-to-br from-blue-100/5 to-purple-100/10 /10 /20 -z-10"></div>
 
 {/* Special highlight effect top-right corner */}
 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 /20 /20 rounded-bl-[100px] -translate-y-12 translate-x-12 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500"></div>
 
 {/* Image container with overlay effect */}
 <ProductCardImage
 product={product}
 hasFabricImage={hasFabricImage}
 getFabricImage={getFabricImage}
 colorSwatchStyle={colorSwatchStyle}
 />
 
 {/* Card content */}
 <ProductCardContent
 product={product}
 configureButtonText={configureButtonText}
 productIsLiked={productIsLiked}
 onConfigureClick={handleConfigureClick}
 onRequestSampleClick={onRequestSample ? handleRequestSampleClick : undefined}
 onToggleLike={handleToggleLike}
 onRequestSample={onRequestSample}
 />
 </div>
 </div>
 );
};

export default ModernProductCard; 