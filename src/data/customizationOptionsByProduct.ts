import { CustomizationOption } from '../components/ProductCustomization';
import { defaultCustomizationOptions } from './customizationOptions';
import { curtainTracksCustomization } from './curtainTracksCustomization';
import { getAccessoryCustomizationOptions } from './accessoryCustomization';

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
  
  // Map product IDs to their specific customization options
  switch (productId) {
    case 'glider-track':
      return curtainTracksCustomization;
    default:
      return defaultCustomizationOptions;
  }
}; 