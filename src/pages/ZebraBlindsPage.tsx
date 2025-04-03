import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { ProductFilterSidebar } from '../components/Filters';
import { zebraBlinds } from '../data/productData';
import { Product } from '../types/product';

const ZebraBlindsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(zebraBlinds);
  
  // Reset filters when component mounts
  useEffect(() => {
    setFilteredProducts(zebraBlinds);
  }, []);
  
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Zebra Blinds', path: '/products/zebra-blinds' }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Smart Zebra Blinds</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:col-span-1">
            <ProductFilterSidebar
              categoryId="zebra"
              products={zebraBlinds}
              onFilteredProductsChange={setFilteredProducts}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No zebra blinds match your selected filters. Please try different filter options.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onConfigure={() => window.location.href = `/products/configure/${product.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZebraBlindsPage;