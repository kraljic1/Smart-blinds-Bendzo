import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProductConfigurationHeaderProps {
 isVisible: boolean;
 onGoBack: () => void;
}

const ProductConfigurationHeader: React.FC<ProductConfigurationHeaderProps> = ({
 isVisible,
 onGoBack
}) => {
 return (
 <button 
 onClick={onGoBack}
 className={`flex items-center text-gray-600 hover:text-blue-600 :text-blue-400 mb-6 sm:mb-8 ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
 >
 <ArrowLeft className="mr-2"size={16} />
 Back to Products
 </button>
 );
};

export default ProductConfigurationHeader; 