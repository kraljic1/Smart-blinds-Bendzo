import React from 'react';
import { Wifi, Smartphone, Cable, Radio } from 'lucide-react';
import { AccessoryProduct } from '../../../data/accessories';

interface AccessoryCardContentProps {
 product: AccessoryProduct;
}

const AccessoryCardContent: React.FC<AccessoryCardContentProps> = ({ product }) => {
 // Helper function to render appropriate icon for feature
 const renderFeatureIcon = (feature: string) => {
 if (feature === 'Wi-Fi') return <Wifi className="w-3 h-3 mr-1"/>;
 if (feature === 'Matter') return <Smartphone className="w-3 h-3 mr-1"/>;
 if (feature === 'Charging') return <Cable className="w-3 h-3 mr-1"/>;
 if (feature === '5 Channels' || feature === '15 Channels') return <Radio className="w-3 h-3 mr-1"/>;
 return null;
 };

 return (
 <>
 {/* Product title - Fixed height container */}
 <div className="h-16 mb-4 flex items-start">
 <h3 className="text-xl font-bold text-black line-clamp-2 transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 :from-blue-600 :to-purple-600">
 {product.name.toUpperCase()}
 </h3>
 </div>
 
 {/* Feature badges - Fixed height container */}
 <div className="h-12 mb-4 flex items-start">
 <div className="flex flex-wrap gap-2">
 {product.features.map((feature, i) => (
 <span
 key={i}
 className="modern-badge flex items-center text-black "
 >
 {renderFeatureIcon(feature)}
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
 </>
 );
};

export default AccessoryCardContent; 