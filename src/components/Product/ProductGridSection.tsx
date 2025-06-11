import React from 'react';
import ModernProductCard from './ModernProductCard';
import { CollapsibleFilterSidebar } from '../Filters';
import { Product } from '../../types/product';

interface ProductGridSectionProps {
 categoryId: string;
 allProducts: Product[];
 filteredProducts: Product[];
 groupedProducts: Product[];
 isLoaded: boolean;
 onFilteredProductsChange: (products: Product[]) => void;
}

/**
 * Products grid section component
 * Includes filter sidebar and products grid display
 */
const ProductGridSection: React.FC<ProductGridSectionProps> = ({
 categoryId,
 allProducts,
 filteredProducts,
 groupedProducts,
 isLoaded,
 onFilteredProductsChange
}) => {
 return (
 <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
 <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8">
 {/* Sidebar with Filters */}
 <div className={`lg:col-span-1 fade-in-scale delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
 <CollapsibleFilterSidebar
 categoryId={categoryId}
 products={allProducts}
 onFilteredProductsChange={onFilteredProductsChange}
 className="modern-card bg-white/80 p-4 rounded-lg shadow border border-gray-200 backdrop-blur-lg"
 />
 </div>

 {/* Products Grid */}
 <div id="products"className="lg:col-span-4">
 {filteredProducts.length === 0 ? (
 <div className="text-center py-12 border-glow p-8 rounded-lg">
 <p className="text-gray-500">
 No products match your selected filters. Please try different filter options.
 </p>
 </div>
 ) : (
 <div className="flex flex-col gap-8">
 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
 {groupedProducts.map((product, index) => (
 <ModernProductCard
 key={product.id}
 product={product}
 onConfigure={() => window.location.href = `/products/configure/${product.id}`}
 delay={index * 100}
 />
 ))}
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 );
};

export default ProductGridSection; 