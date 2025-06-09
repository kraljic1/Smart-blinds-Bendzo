import { useEffect, useRef } from 'react';
import { CustomizationOption } from '../types';

export const useColorSwatches = (options: CustomizationOption[]) => {
  const colorSwatchRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Set background colors via JavaScript
  useEffect(() => {
    options.forEach(option => {
      option.options.forEach(value => {
        if (value.color) {
          const swatch = colorSwatchRefs.current.get(`${option.id}-${value.id}`);
          if (swatch) {
            swatch.style.backgroundColor = value.color;
          }
        }
      });
    });
  }, [options]);

  return colorSwatchRefs;
}; 