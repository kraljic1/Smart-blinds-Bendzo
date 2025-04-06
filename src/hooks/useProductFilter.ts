import { useMemo } from 'react';
import { Product } from '../types/product';
import { 
  rollerBlinds, 
  zebraBlinds, 
  curtainBlinds
} from '../data/productData';

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

// Get products by category ID
export const getProductsByCategory = (categoryId: string): Product[] => {
  switch (categoryId) {
    case 'all':
      return [...rollerBlinds, ...zebraBlinds, ...curtainBlinds];
    case 'roller':
      return rollerBlinds;
    case 'zebra':
      return zebraBlinds;
    case 'curtain':
      return curtainBlinds;
    case 'accessories':
      // For now, return an empty array as we're handling accessories separately
      return [];
    default:
      return [];
  }
};

// For legacy support or custom filtering
export const createCategoryFilter = (categoryId: string): FilterFunction | undefined => {
  switch (categoryId) {
    case 'all':
      return undefined; // No filter, return all products
    case 'roller':
      return (product) => product.id.includes('essential') || 
                          product.id.includes('solar') || 
                          product.id.includes('comfort');
    case 'zebra':
      return (product) => product.id.includes('luxe') || 
                          product.id.includes('premium-silver') || 
                          product.id.includes('deluxe');
    case 'curtain':
      return (product) => product.id.includes('curtain') || 
                          product.id.includes('elegant') || 
                          product.id.includes('premium-curtain');
    case 'accessories':
      return (product) => product.id.includes('remote') || 
                          product.id.includes('bridge') || 
                          product.id.includes('hub') || 
                          product.id.includes('wifi');
    default:
      return undefined;
  }
}; 