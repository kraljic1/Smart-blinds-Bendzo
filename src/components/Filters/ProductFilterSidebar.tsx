import { useEffect } from 'react';
import FilterPanel from './FilterPanel';
import useProductFilters from '../../hooks/useProductFilters';
import { Product } from '../../types/product';

interface ProductFilterSidebarProps {
  categoryId: string;
  products: Product[];
  onFilteredProductsChange: (filteredProducts: Product[]) => void;
  className?: string;
}

/**
 * A reusable component that provides filtering functionality for product pages
 * This can be used on any page that displays products to add filtering capabilities
 */
const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  categoryId,
  products,
  onFilteredProductsChange,
  className = ''
}) => {
  // Initialize the filter state
  const productFilters = useProductFilters();
  
  // Apply filters whenever the filter state changes
  useEffect(() => {
    const filteredProducts = productFilters.applyFilters(products);
    onFilteredProductsChange(filteredProducts);
  }, [products, productFilters.filters, onFilteredProductsChange]);
  
  return (
    <div className={className}>
      <FilterPanel 
        filterState={productFilters} 
        categoryId={categoryId}
      />
    </div>
  );
};

export default ProductFilterSidebar; 