import React, { useState } from 'react';
import ProductOptions from '../components/Product/ProductOptions';
import ProductOptionsModal from '../components/Product/ProductOptionsModal';
import '../styles/ProductOptions/index.css';

interface ProductOption {
 label: string;
 value: string | number;
 type?: 'color' | 'standard';
 colorCode?: string;
}

const ProductOptionDemoPage: React.FC = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 
 // Sample product data
 const productOptions: ProductOption[] = [
 { label: 'Width', value: '123', type: 'standard' },
 { label: 'Height', value: '123', type: 'standard' },
 { label: 'Size', value: 'small', type: 'standard' },
 { label: 'Transparency', value: 'light', type: 'standard' },
 { label: 'Color', value: 'off-white', type: 'color', colorCode: '#f5f5f5' },
 { label: 'System', value: 'brackets', type: 'standard' },
 { label: 'Motor Type', value: 'matter', type: 'standard' },
 { label: 'Motor Side', value: 'rechts', type: 'standard' },
 { label: 'Remote', value: 'none', type: 'standard' },
 { label: 'Installation', value: 'inside', type: 'standard' },
 { label: 'Bottom Bar', value: 'straight_covered', type: 'standard' },
 ];
 
 return (
 <div className="container mx-auto px-4 py-12">
 <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
 <div className="p-6">
 <h1 className="text-2xl font-bold text-gray-900 mb-6">
 Product Options - Modern Style
 </h1>
 
 <div className="flex items-center mb-6">
 <div className="w-24 h-24 rounded-lg overflow-hidden mr-4">
 <img 
 src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=200&q=80&fit=crop&auto=format"
 alt="Solar Black"
 className="w-full h-full object-cover"
 />
 </div>
 <h2 className="text-2xl font-bold">Solar Black</h2>
 </div>
 
 <ProductOptions options={productOptions} />
 
 <div className="text-right mt-8">
 <span className="text-3xl font-bold">€239.34</span>
 </div>
 
 <div className="mt-6">
 <button 
 onClick={() => setIsModalOpen(true)}
 className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
 >
 Open in Modal
 </button>
 </div>
 </div>
 </div>
 
 {isModalOpen && (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
 <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
 <ProductOptionsModal 
 title="Solar Black"
 imageUrl="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=200&q=80&fit=crop&auto=format"
 options={productOptions}
 price={239.34}
 onClose={() => setIsModalOpen(false)}
 />
 </div>
 </div>
 )}
 </div>
 );
};

export default ProductOptionDemoPage; 