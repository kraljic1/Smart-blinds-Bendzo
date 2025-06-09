// React import not needed with new JSX transform
import ProductHero from '../components/Products/ProductHero';
import CategoryGrid from '../components/Products/CategoryGrid';
import { ProductsPageContent } from './components/ProductsPageContent';
import { useProductsPageData } from './hooks/useProductsPageData';
import { usePageAnimations } from './hooks/usePageAnimations';
import { Category } from '../data/categoryData';

/**
 * Main products page component with category filtering and product display
 */
const ProductsPage = () => {
  
  // Get products data and filtering logic
  const {
    currentCategoryId,
    categoryProducts,
    filteredProducts,
    setFilteredProducts,
    pathname
  } = useProductsPageData();

  // Get animation state
  const { isLoaded } = usePageAnimations(pathname, filteredProducts);

  // Handle category change (for extensibility)
  const handleCategoryChange = (category: Category) => {
    // This is handled by the navigate in CategoryGrid, just here for extensibility
    void category; // Acknowledge the parameter to satisfy ESLint
  };

  return (
    <div className="pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className={`fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <ProductHero />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        </div>
        
        {/* Categories Grid */}
        <div className={`slide-in-up delay-50 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <CategoryGrid onCategoryChange={handleCategoryChange} />
        </div>

        {/* Products Content */}
        <ProductsPageContent
          currentCategoryId={currentCategoryId}
          categoryProducts={categoryProducts}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          isLoaded={isLoaded}
        />
      </div>
    </div>
  );
};

export default ProductsPage;