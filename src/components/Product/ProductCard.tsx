import React from 'react';
import { Product } from '../../types/product';
import { CardRoot, CardContent, CardPrice } from '../Card';
import { ProductCardImage, ProductCardContent, ProductCardActions } from './components';
import { useProductCardHandlers } from './hooks';

interface ProductCardProps {
 product: Product;
 onConfigure?: (product: Product) => void;
 onRequestSample?: (product: Product) => void;
 configureButtonText?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
 product, 
 onConfigure, 
 onRequestSample,
 configureButtonText ="Configure & Buy"
}) => {
 // Custom hook for handling card interactions
 const { handleConfigure, handleRequestSample, handleCardClick } = useProductCardHandlers({
 product,
 onConfigure,
 onRequestSample
 });

 return (
 <CardRoot 
 className="h-full flex flex-col cursor-pointer"
 onClick={handleCardClick}
 >
 {/* Product Image with Color Swatch */}
 <ProductCardImage product={product} />

 <CardContent className="flex-grow flex flex-col min-h-[280px]">
 {/* Product Content (Title, Features, Colors) */}
 <ProductCardContent product={product} />

 {/* Price - Fixed position from bottom */}
 <CardPrice
 price={product.price}
 originalPrice={product.originalPrice}
 className="mb-4"
 />

 {/* Action Buttons - Fixed position at bottom */}
 <ProductCardActions
 product={product}
 onConfigure={handleConfigure}
 onRequestSample={onRequestSample ? handleRequestSample : undefined}
 configureButtonText={configureButtonText}
 />
 </CardContent>
 </CardRoot>
 );
};

export default ProductCard;
