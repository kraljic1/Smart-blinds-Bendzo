import { Product } from '../../types/product';
import { allProducts } from '../../data/collections';
import { getOrderedProductImages } from './ProductImageHelpers';

/**
 * Handles the change of a customization option
 */
export const handleProductOptionChange = (
 optionId: string, 
 valueId: string,
 selectedOptions: Record<string, string>,
 setSelectedOptions: (options: Record<string, string>) => void,
 setCurrentProduct: (product: Product) => void,
 setCurrentImages: (images: string[]) => void,
 onProductChange?: (product: Product) => void
) => {
 // If the color option was changed, update the product
 if (optionId === 'color') {
 // Find the product by ID (which is the same as the color option valueId)
 const newProduct = allProducts.find(p => p.id === valueId);
 
 if (newProduct) {
 // Update the current product
 setCurrentProduct(newProduct);
 
 // Generate ordered images for the new product
 const orderedImages = getOrderedProductImages(newProduct);
 setCurrentImages(orderedImages);
 
 // Update the selected options
 setSelectedOptions({
 ...selectedOptions,
 [optionId]: valueId
 });
 
 // Notify parent component about product change
 if (onProductChange) {
 onProductChange(newProduct);
 }
 }
 } else {
 // For non-color options, just update the selection
 setSelectedOptions({
 ...selectedOptions,
 [optionId]: valueId
 });
 }
};

/**
 * Validates and prepares product options for checkout
 * Returns null if validation fails
 */
export const prepareCheckoutOptions = (
 quantity: number,
 width: number | '',
 height: number | '',
 selectedOptions: Record<string, string>,
 isAccessoryProduct: boolean
): Record<string, string | number | boolean> | null => {
 // Prepare options to save with the product
 const options: Record<string, string | number | boolean> = {
 ...selectedOptions
 };
 
 // Add width and height for non-accessory products
 if (!isAccessoryProduct) {
 if (typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0) {
 options.width = width;
 options.height = height;
 } else {
 // For non-accessory products, width and height are required
 alert('Please ensure width and height are valid before adding to basket');
 return null;
 }
 }
 
 return options;
}; 