import React from 'react';
import { Check } from 'lucide-react';
import { Product } from '../../types/product';
import styles from './ModernProductCard.module.css';

interface ProductCardImageProps {
 product: Product;
 hasFabricImage: boolean;
 getFabricImage: () => string | null;
 colorSwatchStyle: React.CSSProperties;
}

const ProductCardImage: React.FC<ProductCardImageProps> = ({
 product,
 hasFabricImage,
 getFabricImage,
 colorSwatchStyle
}) => {
 return (
 <div className="relative overflow-hidden">
 <div className="relative aspect-[4/3] overflow-hidden">
 <img 
 src={product.image} 
 alt={product.name}
 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
 />
 
 {/* Image overlay gradient */}
 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent /40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 </div>
 
 {/* Color swatch */}
 <div className="absolute -bottom-6 right-6 transition-transform duration-300 group-hover:transform group-hover:translate-y-0 z-20">
 <div className="relative">
 {hasFabricImage ? (
 <div className="p-1 rounded-full bg-white/60 dark:bg-gray-700/80 backdrop-blur-sm border border-white/40 shadow-lg">
 <img
 src={getFabricImage()!}
 alt={`${product.name} fabric`}
 className="w-14 h-14 rounded-full product-color-swatch object-cover"
 />
 </div>
 ) : (
 <div className="p-1 rounded-full bg-white/60 dark:bg-gray-700/80 backdrop-blur-sm border border-white/40 shadow-lg">
 <div
 className={`${styles.colorSwatch} product-color-swatch`}
 style={colorSwatchStyle}
 data-color={product.fabricColor}
 />
 </div>
 )}
 
 {/* Mini floating badge */}
 <div className="absolute -bottom-1 -right-1 bg-white dark:bg-blue-600 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center shadow-md border border-gray-100">
 <Check size={12} strokeWidth={3} />
 </div>
 </div>
 </div>
 </div>
 );
};

export default ProductCardImage; 