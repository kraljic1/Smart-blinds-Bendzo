import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductsByCategory } from '../../hooks/useProductFilter';
import { getCurrentCategoryId } from '../utils/categoryUtils';
import { Product } from '../../types/product';

/**
 * Custom hook for managing products page data and filtering
 */
export const useProductsPageData = () => {
 const location = useLocation();
 const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
 
 // Determine current category from URL
 const currentCategoryId = getCurrentCategoryId(location.pathname);
 
 // Get products directly by category
 const categoryProducts = getProductsByCategory(currentCategoryId);

 // Initialize filtered products on category change
 useEffect(() => {
 setFilteredProducts(categoryProducts);
 }, [currentCategoryId, categoryProducts]);

 return {
 currentCategoryId,
 categoryProducts,
 filteredProducts,
 setFilteredProducts,
 pathname: location.pathname
 };
}; 