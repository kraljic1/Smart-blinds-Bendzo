import { useCallback } from 'react';
import type { ValidationResult } from '../../utils/securityValidation';
import type { FormData } from '../../types/validation';
import { validateFormField } from '../../utils/fieldValidators';

interface UseFieldValidationProps {
  updateFieldValidation: (fieldName: string, result: ValidationResult, touched?: boolean) => void;
  debounceValidation: (fieldName: string, validator: () => void) => void;
  validateOnChange: boolean;
  validateOnBlur: boolean;
}

export const useFieldValidation = ({
  updateFieldValidation,
  debounceValidation,
  validateOnChange,
  validateOnBlur
}: UseFieldValidationProps) => {
  // Validate a single field
  const validateSingleField = useCallback((
    fieldName: string, 
    value: unknown, 
    formData: FormData = {},
    immediate: boolean = false
  ) => {
    const validator = () => {
      const result = validateFormField(fieldName, value, formData);
      updateFieldValidation(fieldName, result, true);
    };

    if (immediate || !validateOnChange) {
      validator();
    } else {
      debounceValidation(fieldName, validator);
    }
  }, [updateFieldValidation, debounceValidation, validateOnChange]);

  // Handle field change
  const handleFieldChange = useCallback((
    fieldName: string, 
    value: unknown, 
    formData: FormData = {}
  ) => {
    if (validateOnChange) {
      validateSingleField(fieldName, value, formData);
    }
  }, [validateSingleField, validateOnChange]);

  // Handle field blur
  const handleFieldBlur = useCallback((
    fieldName: string, 
    value: unknown, 
    formData: FormData = {}
  ) => {
    if (validateOnBlur) {
      validateSingleField(fieldName, value, formData, true);
    }
  }, [validateSingleField, validateOnBlur]);

  return {
    validateSingleField,
    handleFieldChange,
    handleFieldBlur
  };
}; 