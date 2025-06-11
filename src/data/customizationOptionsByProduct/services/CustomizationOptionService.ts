import { CustomizationOption } from '../../../components/ProductCustomization';
import { defaultCustomizationOptions } from '../../customizationOptions';
import { curtainTracksCustomization } from '../../curtainTracksCustomization';
import { getAccessoryCustomizationOptions } from '../../accessoryCustomization';
import { getDynamicCustomizationOptions } from '../../../utils/customizationUtils';
import { isAccessoryProduct, isCurtainTrackProduct, isRollerOrZebraBlind } from '../utils/productTypeCheckers';

/**
 * Service class for retrieving customization options based on product type
 */
export class CustomizationOptionService {
 /**
 * Gets customization options for accessory products
 */
 static getAccessoryOptions(productId: string): CustomizationOption[] {
 return getAccessoryCustomizationOptions(productId);
 }

 /**
 * Gets customization options for curtain track products
 */
 static getCurtainTrackOptions(): CustomizationOption[] {
 return curtainTracksCustomization;
 }

 /**
 * Gets dynamic customization options for roller/zebra blinds
 */
 static getDynamicOptions(productId: string): CustomizationOption[] {
 return getDynamicCustomizationOptions(productId);
 }

 /**
 * Gets default customization options
 */
 static getDefaultOptions(): CustomizationOption[] {
 return defaultCustomizationOptions;
 }

 /**
 * Main method to get appropriate customization options for any product
 */
 static getOptionsForProduct(productId: string): CustomizationOption[] {
 if (isAccessoryProduct(productId)) {
 return this.getAccessoryOptions(productId);
 }

 if (isCurtainTrackProduct(productId)) {
 return this.getCurtainTrackOptions();
 }

 if (isRollerOrZebraBlind(productId)) {
 return this.getDynamicOptions(productId);
 }

 return this.getDefaultOptions();
 }
} 