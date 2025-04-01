import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductConfiguration from '../components/ProductConfiguration';
import { Product } from '../types/product';
import { allProducts } from '../data/productData';
import { Category } from '../data/categoryData';
import ProductHero from '../components/Products/ProductHero';
import CategoryGrid from '../components/Products/CategoryGrid';
import ProductGrid from '../components/Products/ProductGrid';
import { useProductFilter, createCategoryFilter } from '../hooks/useProductFilter';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Determine current category from URL
  const getCurrentCategoryId = (): string => {
    const path = location.pathname;
    if (path === '/products') return 'all';
    if (path.includes('roller-blinds')) return 'roller';
    if (path.includes('day-night-blinds')) return 'daynight';
    if (path.includes('honeycomb-blinds')) return 'honeycomb';
    if (path.includes('curtain-tracks')) return 'tracks';
    if (path.includes('accessories')) return 'accessories';
    return 'all';
  };

  const currentCategoryId = getCurrentCategoryId();
  const filterFn = createCategoryFilter(currentCategoryId);
  const filteredProducts = useProductFilter(allProducts, filterFn);

  const handleCategoryChange = (category: Category) => {
    // This is handled by the navigate in CategoryGrid, just here for extensibility
    console.log('Category changed to:', category.name);
  };

  const handleRequestSample = (product: Product) => {
    console.log('Requesting sample for:', product.name);
  };

  return (
    <div className="pt-24 pb-32">
      {/* Hero Section */}
      <ProductHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Grid */}
        <CategoryGrid onCategoryChange={handleCategoryChange} />

        {/* Products Section */}
        {location.pathname === '/products' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Products</h2>
            <ProductGrid 
              products={filteredProducts}
              onConfigure={setSelectedProduct}
              onRequestSample={handleRequestSample}
            />
          </div>
        )}
      </div>

      {/* Product Configuration Modal */}
      {selectedProduct && (
        <ProductConfiguration 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;