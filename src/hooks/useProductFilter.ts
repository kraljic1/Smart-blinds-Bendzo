import { useMemo } from 'react';
import { Product } from '../types/product';

type FilterFunction = (product: Product) => boolean;

export const useProductFilter = (
  products: Product[],
  filterFn?: FilterFunction
) => {
  const filteredProducts = useMemo(() => {
    if (!filterFn) {
      return products;
    }
    return products.filter(filterFn);
  }, [products, filterFn]);

  return filteredProducts;
};

// Predefined filters
export const createCategoryFilter = (categoryId: string): FilterFunction | undefined => {
  switch (categoryId) {
    case 'all':
      return undefined; // No filter, return all products
    case 'roller':
      return (product) => product.id.includes('essential') || 
                          product.id.includes('solar') || 
                          product.id.includes('comfort');
    case 'daynight':
      return (product) => product.id.includes('luxe') || 
                          product.id.includes('premium-silver') || 
                          product.id.includes('deluxe');
    case 'honeycomb':
      return (product) => product.id.includes('eco') || 
                          product.id.includes('thermal') || 
                          product.id.includes('premium-cream');
    case 'tracks':
      return (product) => product.id.includes('track') || 
                          product.id.includes('curtain');
    case 'accessories':
      return (product) => product.id.includes('remote') || 
                          product.id.includes('bridge') || 
                          product.id.includes('hub') || 
                          product.id.includes('cable');
    default:
      return undefined;
  }
}; 