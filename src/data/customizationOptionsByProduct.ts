import { CustomizationOption } from '../components/ProductCustomization';
import { CustomizationOptionService } from './customizationOptionsByProduct/services/CustomizationOptionService';

/**
 * Gets customization options for a given product ID
 * 
 * This function serves as the main entry point for retrieving customization options.
 * It delegates to the CustomizationOptionService which handles the logic for different product types.
 * 
 * @param productId - The unique identifier for the product
 * @returns Array of customization options for the product
 */
export const getCustomizationOptions = (productId: string): CustomizationOption[] => {
  return CustomizationOptionService.getOptionsForProduct(productId);
}; 