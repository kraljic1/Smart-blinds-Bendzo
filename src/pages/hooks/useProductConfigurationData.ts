import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { getProductsByCategory } from '../../hooks/useProductFilter';
import { CustomizationOption } from '../../components/Product/ProductCustomization';
import { getCustomizationOptions } from '../../data/customizationOptionsByProduct';
import { useProductImages } from '../../hooks/useProductImages';

interface UseProductConfigurationDataProps {
 productId: string | undefined;
}

interface UseProductConfigurationDataReturn {
 product: Product | null;
 isLoading: boolean;
 customizationOptions: CustomizationOption[];
 allImages: Record<string, string[]>;
 updateProductImages: (product: Product) => void;
}

export const useProductConfigurationData = ({ 
 productId 
}: UseProductConfigurationDataProps): UseProductConfigurationDataReturn => {
 const [product, setProduct] = useState<Product | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const [customizationOptions, setCustomizationOptions] = useState<CustomizationOption[]>([]);
 const { allImages, updateProductImages } = useProductImages();

 // Fetch product data based on productId
 useEffect(() => {
 setIsLoading(true);
 
 // Get all products from all categories
 const allProducts = [
 ...getProductsByCategory('roller'),
 ...getProductsByCategory('zebra'),
 ...getProductsByCategory('curtain'),
 ...getProductsByCategory('accessories')
 ];
 
 const foundProduct = allProducts.find(p => p.id === productId);
 
 if (foundProduct) {
 setProduct(foundProduct);
 updateProductImages(foundProduct);
 }
 
 setIsLoading(false);
 }, [productId, updateProductImages]);

 // Set default customization options
 useEffect(() => {
 if (product) {
 const productOptions = getCustomizationOptions(product.id);
 setCustomizationOptions(productOptions);
 }
 }, [product]);

 return {
 product,
 isLoading,
 customizationOptions,
 allImages,
 updateProductImages: (newProduct: Product) => {
 setProduct(newProduct);
 updateProductImages(newProduct);
 }
 };
}; 