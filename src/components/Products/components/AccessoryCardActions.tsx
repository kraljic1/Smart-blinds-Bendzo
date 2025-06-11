import React from 'react';
import { Heart } from 'lucide-react';
import { AccessoryProduct } from '../../../data/accessories';

interface AccessoryCardActionsProps {
 product: AccessoryProduct;
 productIsLiked: boolean;
 onConfigure: () => void;
 onToggleLike: (e: React.MouseEvent) => void;
}

const AccessoryCardActions: React.FC<AccessoryCardActionsProps> = ({
 productIsLiked,
 onConfigure,
 onToggleLike
}) => {
 // Handle button clicks with event propagation prevention
 const handleConfigureClick = (e: React.MouseEvent) => {
 e.stopPropagation();
 onConfigure();
 };

 return (
 <>
 {/* Action buttons - Fixed position at bottom */}
 <div>
 <button
 onClick={handleConfigureClick}
 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 :from-blue-400 :to-indigo-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
 >
 <span>Configure & Buy</span>
 </button>
 </div>
 
 {/* Like button */}
 <button 
 onClick={onToggleLike}
 className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm shadow-md border border-white/40 /40 flex items-center justify-center ${
 productIsLiked 
 ? 'text-red-500 ' 
 : 'text-gray-500 hover:text-red-500 :text-red-400'
 } transition-colors ${
 productIsLiked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
 }`}
 >
 <Heart size={14} fill={productIsLiked ?"currentColor":"none"} />
 </button>
 </>
 );
};

export default AccessoryCardActions; 