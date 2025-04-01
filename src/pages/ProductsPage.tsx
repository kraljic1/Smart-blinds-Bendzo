import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductConfiguration from '../components/ProductConfiguration';
import { Product } from '../types/product';
import ProductHero from '../components/Products/ProductHero';
import CategoryGrid from '../components/Products/CategoryGrid';
import ProductGrid from '../components/Products/ProductGrid';
import { getProductsByCategory } from '../hooks/useProductFilter';
import { Category } from '../data/categoryData';

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
    if (path.includes('zebra-blinds')) return 'zebra';
    if (path.includes('curtain-blinds')) return 'curtain';
    if (path.includes('accessories')) return 'accessories';
    return 'all';
  };

  const currentCategoryId = getCurrentCategoryId();
  // Get products directly by category
  const products = getProductsByCategory(currentCategoryId);

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
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {currentCategoryId === 'all' ? 'All Products' : 
             currentCategoryId === 'roller' ? 'Roller Blinds' :
             currentCategoryId === 'zebra' ? 'Zebra Blinds' :
             currentCategoryId === 'curtain' ? 'Curtain Blinds' :
             'Accessories'}
          </h2>
          <ProductGrid 
            products={products}
            onConfigure={setSelectedProduct}
            onRequestSample={handleRequestSample}
          />
        </div>
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