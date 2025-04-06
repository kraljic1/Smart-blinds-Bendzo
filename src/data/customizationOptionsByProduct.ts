import { CustomizationOption } from '../components/ProductCustomization';
import { defaultCustomizationOptions } from './customizationOptions';
import { curtainTracksCustomization } from './curtainTracksCustomization';

export const getCustomizationOptions = (productId: string): CustomizationOption[] => {
  // Map product IDs to their specific customization options
  switch (productId) {
    case 'glider-track':
      return curtainTracksCustomization;
    default:
      return defaultCustomizationOptions;
  }
}; 