import { useEffect, useState, useRef } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add animation class to show content after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all elements with reveal-staggered class
    document.querySelectorAll('.reveal-staggered').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.reveal-staggered').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, [filteredProducts]);

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

        {/* Content Grid with Sidebar - Updated for tablet */}
        <div className="mt-8 relative">
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 md:gap-8">
            {/* Sidebar with Filters - Hidden on mobile, toggleable on tablet, shown on desktop */}
            <div className={`lg:col-span-1 fade-in-scale delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <CollapsibleFilterSidebar
                categoryId={currentCategoryId}
                products={categoryProducts}
                onFilteredProductsChange={setFilteredProducts}
                className="modern-card bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 backdrop-blur-lg filter-sidebar"
              />
            </div>

            {/* Products Section - Full width on mobile, 2/3 on tablet and desktop */}
            <div className="lg:col-span-3">
              <h2 
                ref={headingRef}
                className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                delay-150
              >
                {currentCategoryId === 'all' ? 'All Products' : 
                currentCategoryId === 'roller' ? 'Roller Blinds' :
                currentCategoryId === 'zebra' ? 'Zebra Blinds' :
                currentCategoryId === 'curtain' ? 'Curtain Blinds' : 
                currentCategoryId === 'accessories' ? 'Accessories' : ''}
              </h2>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 md:py-12 border-glow p-6 md:p-8 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">
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
      </div>
    </div>
  );
};

export default ProductsPage;