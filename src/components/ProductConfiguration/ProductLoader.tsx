import React from 'react';

interface ProductLoaderProps {
 isLoading: boolean;
 hasError: boolean;
 onGoBack: () => void;
 children: React.ReactNode;
}

const ProductLoader: React.FC<ProductLoaderProps> = ({ 
 isLoading, 
 hasError, 
 onGoBack, 
 children 
}) => {
 if (isLoading) {
 return (
 <div className="pt-20 pb-24 sm:pt-24 sm:pb-32 flex justify-center items-center min-h-screen">
 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
 </div>
 );
 }

 if (hasError) {
 return (
 <div className="pt-20 pb-24 sm:pt-24 sm:pb-32 flex flex-col justify-center items-center min-h-screen">
 <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
 <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
 <button 
 onClick={onGoBack}
 className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
 >
 <svg className="w-4 h-4 mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24"xmlns="http://www.w3.org/2000/svg">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
 </svg>
 Go Back
 </button>
 </div>
 );
 }

 return <>{children}</>;
};

export default ProductLoader; 