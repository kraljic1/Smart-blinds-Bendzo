import { useCallback, useRef } from 'react';
import { validateFormField } from '../../utils/fieldValidators';
import type { FormData } from '../../components/Checkout/CheckoutFormTypes';
import type { FieldValidationState } from './types';

interface UseFieldValidationProps {
  formData: FormData;
  debounceMs: number;
  setFieldStates: React.Dispatch<React.SetStateAction<Record<string, FieldValidationState>>>;
}

export const useFieldValidation = ({
  formData,
  debounceMs,
  setFieldStates
}: UseFieldValidationProps) => {
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  // Clear timeout for a field
  const clearFieldTimeout = useCallback((fieldName: string) => {
    if (timeoutRefs.current[fieldName]) {
      clearTimeout(timeoutRefs.current[fieldName]);
      delete timeoutRefs.current[fieldName];
    }
  }, []);

  // Validate a single field
  const validateField = useCallback((fieldName: string, value: unknown, immediate = false) => {
    const performValidation = () => {
      setFieldStates(prev => ({
        ...prev,
        [fieldName]: { ...prev[fieldName], isValidating: true }
      }));

      const result = validateFormField(fieldName, value, formData);
      
      setFieldStates(prev => ({
        ...prev,
        [fieldName]: {
          isValid: result.isValid,
          error: result.errors.length > 0 ? result.errors[0] : null,
          warning: result.warnings && result.warnings.length > 0 ? result.warnings[0] : null,
          isValidating: false,
          touched: prev[fieldName]?.touched || false
        }
      }));
    };

    if (immediate) {
      clearFieldTimeout(fieldName);
      performValidation();
    } else {
      clearFieldTimeout(fieldName);
      timeoutRefs.current[fieldName] = setTimeout(performValidation, debounceMs);
    }
  }, [formData, debounceMs, clearFieldTimeout, setFieldStates]);

  // Cleanup timeouts on unmount
  const cleanup = useCallback(() => {
    Object.values(timeoutRefs.current).forEach(clearTimeout);
    timeoutRefs.current = {};
  }, []);

  return {
    validateField,
    cleanup
  };
}; 