import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductHero from '../components/Products/ProductHero';
import CategoryGrid from '../components/Products/CategoryGrid';
import ProductGrid from '../components/Products/ProductGrid';
import { CollapsibleFilterSidebar } from '../components/Filters';
import { getProductsByCategory } from '../hooks/useProductFilter';
import { Category } from '../data/categoryData';
import { Product } from '../types/product';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Determine current category from URL
  const getCurrentCategoryId = (): string => {
    const path = location.pathname;
    if (path === '/products') return 'all';
    if (path.includes('roller-blinds')) return 'roller';
    if (path.includes('zebra-blinds')) return 'zebra';
    if (path.includes('curtain-blinds')) return 'curtain';
    if (path.includes('accessories')) return 'accessories';
    return 'all';
  };

  const currentCategoryId = getCurrentCategoryId();
  // Get products directly by category
  const categoryProducts = getProductsByCategory(currentCategoryId);

  // Initialize filtered products on category change
  useEffect(() => {
    setFilteredProducts(categoryProducts);
  }, [currentCategoryId, categoryProducts]);

  const handleCategoryChange = (category: Category) => {
    // This is handled by the navigate in CategoryGrid, just here for extensibility
    console.log('Category changed to:', category.name);
  };

  return (
    <div className="pt-24 pb-32">
      {/* Hero Section */}
      <ProductHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Grid */}
        <CategoryGrid onCategoryChange={handleCategoryChange} />

        {/* Content Grid with Sidebar */}
        <div className="mt-8 relative grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:col-span-1">
            <CollapsibleFilterSidebar
              categoryId={currentCategoryId}
              products={categoryProducts}
              onFilteredProductsChange={setFilteredProducts}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {currentCategoryId === 'all' ? 'All Products' : 
              currentCategoryId === 'roller' ? 'Roller Blinds' :
              currentCategoryId === 'zebra' ? 'Zebra Blinds' :
              currentCategoryId === 'curtain' ? 'Curtain Blinds' :
              'Accessories'}
            </h2>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No products match your selected filters. Please try different filter options.
                </p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;