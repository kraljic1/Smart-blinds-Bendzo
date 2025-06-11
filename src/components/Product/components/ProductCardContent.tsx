import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Product } from '../../../types/product';
import { CardTitle } from '../../Card';

interface ProductCardContentProps {
 product: Product;
}

const ProductCardContent: React.FC<ProductCardContentProps> = ({ product }) => {
 return (
 <>
 {/* Product title - Fixed height container */}
 <div className="h-16 mb-3">
 <CardTitle className="line-clamp-2 h-full flex items-start">
 {product.name.toUpperCase()}
 </CardTitle>
 </div>

 {/* Feature badges - Fixed height container */}
 <div className="h-12 mb-3 flex items-start">
 <div className="flex items-center space-x-2 flex-wrap gap-1">
 {product.features.map((feature: string, i: number) => (
 <span
 key={i}
 className="bg-gray-100 dark:bg-gray-800 text-gray-800 px-3 py-1 rounded-full text-sm uppercase"
 >
 {feature === 'Light filtering' ? (
 <Sun className="w-4 h-4 mr-1 inline"/>
 ) : (
 <Moon className="w-4 h-4 mr-1 inline"/>
 )}
 {feature}
 </span>
 ))}
 </div>
 </div>

 {/* Colors info - Fixed height container */}
 <div className="h-8 mb-4 flex items-start">
 <span className="text-sm text-gray-600 uppercase">
 +{product.colors} {product.colors === 1 ? 'COLOR' : 'COLORS'}
 </span>
 </div>

 {/* Spacer to push price and buttons to bottom */}
 <div className="flex-grow"></div>
 </>
 );
};

export default ProductCardContent; 