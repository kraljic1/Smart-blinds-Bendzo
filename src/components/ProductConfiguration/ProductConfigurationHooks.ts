import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { CustomizationOption } from '../ProductCustomization';

/**
 * Custom hook to handle animation states
 */
export const useAnimationStates = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // Short delay before starting animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Set animation as finished after all staggered elements should be done
    const animTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, 1800);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(animTimer);
    };
  }, []);

  return { isVisible, animationFinished };
};

/**
 * Custom hook to initialize default options for product customization
 */
export const useDefaultOptions = (
  customizationOptions: CustomizationOption[],
  currentProduct: Product
) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    if (customizationOptions.length > 0) {
      const defaultSelections: Record<string, string> = {};
      customizationOptions.forEach(option => {
        if (option.options.length > 0) {
          // If this is the color option, select the current product's ID
          if (option.id === 'color') {
            // Find the color option that matches the current product
            const colorOption = option.options.find(o => o.id === currentProduct.id);
            if (colorOption) {
              defaultSelections[option.id] = colorOption.id;
            } else {
              // Fallback to first option if no match found
              defaultSelections[option.id] = option.options[0].id;
            }
          } else {
            // For other options, select the first option
            defaultSelections[option.id] = option.options[0].id;
          }
        }
      });
      setSelectedOptions(defaultSelections);
    }
  }, [customizationOptions, currentProduct.id]);

  return { selectedOptions, setSelectedOptions };
}; 