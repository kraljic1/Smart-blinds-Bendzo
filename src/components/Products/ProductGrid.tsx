import React, { useState } from 'react';
import { Product } from '../../types/product';
import ProductCard from '../ProductCard';

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

  const handleLoadMore = () => {
    setVisibleProducts(prev => Math.min(prev + productsPerLoad, products.length));
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {products.slice(0, visibleProducts).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
      {visibleProducts < products.length && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 