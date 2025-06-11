import React, { useEffect, useRef, useMemo } from 'react';
import { Product } from '../../../types/product';
import { CardImage } from '../../Card';

interface ProductCardImageProps {
 product: Product;
}

const ProductCardImage: React.FC<ProductCardImageProps> = ({ product }) => {
 const colorSwatchRef = useRef<HTMLDivElement>(null);

 // Check if product has an image with"4.webp"or"4.jpg"(fabric detail image)
 const hasFabricImage = useMemo((): boolean => {
 // Always use the last image if images array exists and has items
 return !!(product.images && product.images.length > 0);
 }, [product.images]);

 // Get the fabric image (last image in the array, except for glider-track which uses index 2)
 const getFabricImage = (): string | null => {
 if (!product.images || product.images.length === 0) return null;
 
 // Special case for glider-track: use the third image (index 2) which shows colors
 if (product.id === 'glider-track' && product.images.length > 2) {
 return product.images[2];
 }
 
 // For all other products: return the last image (typically the fabric detail image)
 return product.images[product.images.length - 1];
 };

 // Set background color for products without fabric image
 useEffect(() => {
 if (!hasFabricImage && colorSwatchRef.current && product.fabricColor) {
 colorSwatchRef.current.style.backgroundColor = product.fabricColor;
 }
 }, [product.fabricColor, hasFabricImage]);

 return (
 <div className="relative">
 <CardImage src={product.image} alt={product.name} />
 <div className="absolute bottom-4 right-4">
 {hasFabricImage ? (
 <img
 src={getFabricImage()!}
 alt={`${product.name} fabric`}
 className="w-12 h-12 rounded-full border-4 border-white shadow-md product-color-swatch object-cover"
 />
 ) : (
 <div
 ref={colorSwatchRef}
 className="w-12 h-12 rounded-full border-4 border-white shadow-md product-color-swatch"
 data-color={product.fabricColor}
 />
 )}
 </div>
 </div>
 );
};

export default ProductCardImage; 