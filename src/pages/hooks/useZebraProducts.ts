import { useState, useEffect, useMemo } from 'react';
import { Product } from '../../types/product';
import { zebraBlinds } from '../../data/zebrablinds';

export const useZebraProducts = () => {
 const [filteredProducts, setFilteredProducts] = useState<Product[]>(zebraBlinds);

 // Reset filters when component mounts
 useEffect(() => {
 setFilteredProducts(zebraBlinds);
 }, []);

 // Group products by name (to keep different variants of the same product together)
 const groupedProducts = useMemo(() => {
 // Create a map of products grouped by name
 const groupedMap = filteredProducts.reduce((groups, product) => {
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
 }, [filteredProducts]);

 return {
 filteredProducts,
 groupedProducts,
 setFilteredProducts
 };
}; 