import { useMemo } from 'react';
import { Product } from '../types/product';

/**
 * Custom hook for grouping products by name
 * Keeps different variants of the same product together
 */
export const useProductGrouping = (products: Product[]) => {
 const groupedProducts = useMemo(() => {
 // Create a map of products grouped by name
 const groupedMap = products.reduce((groups, product) => {
 const name = product.name.toLowerCase(); // Convert to lowercase for case-insensitive grouping
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

 return groupedProducts;
}; 