import React from 'react';
import { AccessoryProduct } from '../../../data/accessories';

interface AccessoryCardImageProps {
 product: AccessoryProduct;
}

const AccessoryCardImage: React.FC<AccessoryCardImageProps> = ({ product }) => {
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
 </div>
 );
};

export default AccessoryCardImage; 