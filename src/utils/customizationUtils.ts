import { CustomizationOption } from '../components/ProductCustomization';
import { identifyProductDetails, getRelatedProducts, getProductFabricImage } from './fabricCollectionUtils';
import { defaultCustomizationOptions } from '../data/customizationOptions';

/**
 * Generates color customization options based on the selected product
 * @param productId The ID of the selected product
 * @returns Customization options with dynamically generated color options
 */
export const getDynamicCustomizationOptions = (productId: string): CustomizationOption[] => {
 const customizationOptions = [...defaultCustomizationOptions];
 
 // Find the index of the color option group
 const colorOptionIndex = customizationOptions.findIndex(option => option.id === 'color');
 
 // If no color option found, return the default options
 if (colorOptionIndex === -1) {
 return customizationOptions;
 }
 
 // Get product collection and transparency type
 const { collection, transparencyType } = identifyProductDetails(productId);
 
 // If we couldn't identify the collection or transparency, return default options
 if (!collection || !transparencyType) {
 return customizationOptions;
 }
 
 // Get related products from the same collection with the same transparency
 const relatedProducts = getRelatedProducts(collection, transparencyType);
 
 // If no related products found, return default options
 if (relatedProducts.length === 0) {
 return customizationOptions;
 }
 
 // Create a new color option with dynamic options from the related products
 const dynamicColorOption: CustomizationOption = {
 id: 'color',
 name: 'Color',
 options: relatedProducts.map(product => {
 const fabricImage = getProductFabricImage(product);
 
 return {
 id: product.id,
 name: product.name,
 // Use the fabricColor as a fallback if image is not available
 color: !fabricImage ? product.fabricColor : undefined,
 image: fabricImage || undefined,
 price: 0, // Assuming no price difference for color options
 };
 })
 };
 
 // Replace the default color option with our dynamic one
 customizationOptions[colorOptionIndex] = dynamicColorOption;
 
 return customizationOptions;
}; 