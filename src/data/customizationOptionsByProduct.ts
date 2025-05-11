import { CustomizationOption } from '../components/ProductCustomization';
import { defaultCustomizationOptions } from './customizationOptions';
import { curtainTracksCustomization } from './curtainTracksCustomization';
import { getAccessoryCustomizationOptions } from './accessoryCustomization';
import { getDynamicCustomizationOptions } from '../utils/customizationUtils';
import { allProducts } from './collections';

export const getCustomizationOptions = (productId: string): CustomizationOption[] => {
  // Check if this is an accessory product
  if (
    productId === 'matter-bridge-cm55' ||
    productId === 'remote-5-channel' ||
    productId === 'remote-15-channel' ||
    productId === 'wifi-bridge-cm20' ||
    productId === 'eve-smart-plug' ||
    productId === 'usb-c-cable'
  ) {
    return getAccessoryCustomizationOptions(productId);
  }
  
  // Special case for curtain tracks
  if (productId === 'glider-track') {
    return curtainTracksCustomization;
  }
  
  // Check if this is a roller blind product
  const product = allProducts.find(p => p.id === productId);
  
  // For roller blinds and zebra blinds, use dynamic color options
  if (product && (product.collection || '').toLowerCase() !== 'curtain') {
    return getDynamicCustomizationOptions(productId);
  }
  
  // Default fallback to standard options
  return defaultCustomizationOptions;
}; 