import ProductGrid from '../../components/Products/ProductGrid';
import { CollapsibleFilterSidebar } from '../../components/Filters';
import { ProductsPageHeader } from './ProductsPageHeader';
import { Product } from '../../types/product';

interface ProductsPageContentProps {
 currentCategoryId: string;
 categoryProducts: Product[];
 filteredProducts: Product[];
 setFilteredProducts: (products: Product[]) => void;
 isLoaded: boolean;
}

/**
 * Component for rendering the main content section of the products page
 */
export const ProductsPageContent = ({
 currentCategoryId,
 categoryProducts,
 filteredProducts,
 setFilteredProducts,
 isLoaded
}: ProductsPageContentProps) => {
 return (
 <div className="mt-8 relative">
 <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 md:gap-8">
 {/* Sidebar with Filters */}
 <div className={`lg:col-span-1 fade-in-scale delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
 <CollapsibleFilterSidebar
 categoryId={currentCategoryId}
 products={categoryProducts}
 onFilteredProductsChange={setFilteredProducts}
 className="modern-card bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow border border-gray-200 backdrop-blur-lg filter-sidebar"
 />
 </div>

 {/* Products Section */}
 <div className="lg:col-span-3">
 <ProductsPageHeader 
 categoryId={currentCategoryId} 
 isLoaded={isLoaded} 
 />
 
 {filteredProducts.length === 0 ? (
 <div className="text-center py-8 md:py-12 border-glow p-6 md:p-8 rounded-lg">
 <p className="text-gray-500">
 No products match your selected filters. Please try different filter options.
 </p>
 </div>
 ) : (
 <div className={`slide-in-up delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
 <ProductGrid products={filteredProducts} />
 </div>
 )}
 </div>
 </div>
 </div>
 );
}; 