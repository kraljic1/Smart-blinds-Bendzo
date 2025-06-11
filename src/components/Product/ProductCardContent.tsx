import React from 'react';
import { Sun, Moon, Package, Heart } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductCardContentProps {
 product: Product;
 configureButtonText: string;
 productIsLiked: boolean;
 onConfigureClick: (e: React.MouseEvent) => void;
 onRequestSampleClick?: (e: React.MouseEvent) => void;
 onToggleLike: (e: React.MouseEvent) => void;
 onRequestSample?: (product: Product) => void;
}

const ProductCardContent: React.FC<ProductCardContentProps> = ({
 product,
 configureButtonText,
 productIsLiked,
 onConfigureClick,
 onRequestSampleClick,
 onToggleLike,
 onRequestSample
}) => {
 return (
 <div className="flex-grow flex flex-col p-6 pt-8 min-h-[280px]">
 {/* Product title - Fixed height container */}
 <div className="h-16 mb-4 flex items-start">
 <h3 className="text-xl font-bold text-black line-clamp-2 transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-600 dark:group-hover:to-purple-600">
 {product.name.toUpperCase()}
 </h3>
 </div>
 
 {/* Feature badges - Fixed height container */}
 <div className="h-12 mb-4 flex items-start">
 <div className="flex flex-wrap gap-2">
 {product.features.map((feature, i) => (
 <span
 key={i}
 className="modern-badge flex items-center text-black dark:bg-blue-700/40"
 >
 {feature === 'Light filtering' ? (
 <Sun className="w-3 h-3 mr-1 inline"/>
 ) : (
 <Moon className="w-3 h-3 mr-1 inline"/>
 )}
 {feature}
 </span>
 ))}
 </div>
 </div>
 
 {/* Spacer to push price and buttons to bottom */}
 <div className="flex-grow"></div>

 {/* Price - Fixed position from bottom */}
 <div className="mb-6 flex items-end">
 <span className="text-3xl font-bold text-blue-600 mr-2">
 ${product.price.toLocaleString()}
 </span>
 {product.originalPrice && (
 <span className="line-through text-gray-500 mb-1">
 ${product.originalPrice.toLocaleString()}
 </span>
 )}
 </div>
 
 {/* Action buttons - Fixed position at bottom */}
 <div className="space-y-3">
 <button
 onClick={onConfigureClick}
 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-400 dark:hover:to-indigo-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
 >
 <span>{configureButtonText}</span>
 </button>
 
 {onRequestSample && (
 <button
 onClick={onRequestSampleClick}
 className="w-full border border-gray-200 bg-white/60 dark:bg-gray-700/80 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 font-medium flex items-center justify-center"
 >
 <Package size={16} className="mr-2"/>
 <span>Request Sample</span>
 </button>
 )}
 </div>
 
 {/* Like button */}
 <button 
 onClick={onToggleLike}
 className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm shadow-md border border-white/40 /40 flex items-center justify-center ${
 productIsLiked 
 ? 'text-red-500 ' 
 : 'text-gray-500 hover:text-red-500 dark:hover:text-red-400'
 } transition-colors ${
 productIsLiked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
 }`}
 >
 <Heart size={14} fill={productIsLiked ?"currentColor":"none"} />
 </button>
 </div>
 );
};

export default ProductCardContent; 