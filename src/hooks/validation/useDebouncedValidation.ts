import { useMemo } from 'react';

export const useDebouncedValidation = (debounceMs: number = 300) => {
  // Debounced validation function
  const debounceValidation = useMemo(() => {
    const timeouts: Record<string, NodeJS.Timeout> = {};
    
    return (fieldName: string, validator: () => void) => {
      if (timeouts[fieldName]) {
        clearTimeout(timeouts[fieldName]);
      }
      
      timeouts[fieldName] = setTimeout(validator, debounceMs);
    };
  }, [debounceMs]);

  return debounceValidation;
}; 