import React, { useState, useMemo } from 'react';
import { Product } from '../../types/product';
import ModernProductCard from '../ModernProductCard';

interface ProductGridProps {
  products: Product[];
  productsPerLoad?: number;
  onConfigure?: (product: Product) => void;
  onRequestSample?: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  productsPerLoad = 6 
}) => {
  const [visibleProducts, setVisibleProducts] = useState(productsPerLoad);

  // Group products by name
  const groupedProducts = useMemo(() => {
    // Create a map of products grouped by name
    const groupedMap = products.reduce((groups, product) => {
      const name = product.name;
      if (!groups[name]) {
        groups[name] = [];
      }
      groups[name].push(product);
      return groups;
    }, {} as Record<string, Product[]>);

    // Flatten the grouped products back into an array
    // This ensures products with the same name appear next to each other
    return Object.values(groupedMap).flat();
  }, [products]);

  const handleLoadMore = () => {
    setVisibleProducts(prev => Math.min(prev + productsPerLoad, groupedProducts.length));
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {groupedProducts.slice(0, visibleProducts).map((product, index) => (
          <ModernProductCard
            key={product.id}
            product={product}
            delay={index * 100}
          />
        ))}
      </div>
      {visibleProducts < groupedProducts.length && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition shimmer-button"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 