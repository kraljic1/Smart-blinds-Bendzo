import { useState, useCallback } from 'react';
import { Product } from '../types/product';
import { ProductFilters, FilterState } from '../types/filter';

const initialFilters: ProductFilters = {
  colors: [],
  fabricTypes: [],
  collections: [],
  operations: []
};

export const useProductFilters = (): FilterState => {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const setFilter = useCallback((
    groupId: keyof ProductFilters, 
    value: string, 
    checked: boolean
  ) => {
    setFilters(prevFilters => {
      // If checked, add the value to the filter array if it's not already there
      if (checked) {
        if (prevFilters[groupId].includes(value)) {
          return prevFilters;
        }
        return {
          ...prevFilters,
          [groupId]: [...prevFilters[groupId], value]
        };
      } 
      // If unchecked, remove the value from the filter array
      else {
        return {
          ...prevFilters,
          [groupId]: prevFilters[groupId].filter(item => item !== value)
        };
      }
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  // Function to apply all filters to a product list
  const applyFilters = useCallback((products: Product[]): Product[] => {
    // If no filters are selected, return all products
    if (
      filters.colors.length === 0 &&
      filters.fabricTypes.length === 0 &&
      filters.collections.length === 0 &&
      filters.operations.length === 0
    ) {
      return products;
    }

    return products.filter(product => {
      // Match by feature (fabric type)
      const fabricTypeMatch = filters.fabricTypes.length === 0 || 
        filters.fabricTypes.some(fabricType => {
          const fabricTypeLower = fabricType.toLowerCase();
          
          // Special case for "Screen" - match any product with "Screen" in name, features, or collection
          if (fabricTypeLower === 'screen') {
            // Check if product name contains "screen"
            if (product.name.toLowerCase().includes('screen')) return true;
            
            // Check if product collection is "Screen"
            if (product.collection?.toLowerCase() === 'screen') return true;
            
            // Check if product has "Screen" in features
            if (product.features.some(feature => feature.toLowerCase() === 'screen')) return true;
          }
          
          // Special case: When "Transparent" is selected, match products with "Sheer" feature
          if (fabricTypeLower === 'transparent' && 
              product.features.some(feature => feature.toLowerCase() === 'sheer')) {
            return true;
          }
          
          // Standard feature matching
          return product.features.some(feature => feature.toLowerCase() === fabricTypeLower);
        });
      
      // Match by color - simplified to primarily use product name
      const colorMatch = filters.colors.length === 0 ||
        filters.colors.some(color => {
          const colorLower = color.toLowerCase();
          const productNameLower = product.name.toLowerCase();
          
          // Check if color name appears in product name
          if (productNameLower.includes(colorLower)) return true;
          
          // Special case for Sand/Beige which might be used interchangeably
          if (colorLower === 'beige' && productNameLower.includes('sand')) return true;
          if (colorLower === 'sand' && productNameLower.includes('beige')) return true;
          
          // Check in description (if it exists)
          if (product.description && product.description.toLowerCase().includes(colorLower)) return true;
          
          return false;
        });
      
      // Match by collection (using product.collection or product name as a fallback)
      const collectionMatch = filters.collections.length === 0 ||
        filters.collections.some(collection => {
          // Check if the product has a collection property
          if (product.collection) {
            // Exact match on collection name
            return product.collection === collection;
          }
          return false;
        });
      
      // For operation, we don't have this data in the product model yet
      // Just return true for this filter for now
      const operationMatch = filters.operations.length === 0;
      
      return fabricTypeMatch && colorMatch && collectionMatch && operationMatch;
    });
  }, [filters]);

  return {
    filters,
    setFilter,
    resetFilters,
    applyFilters
  };
};

export default useProductFilters; 