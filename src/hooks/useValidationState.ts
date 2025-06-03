/**
 * Hook for managing form validation state
 * Handles individual field validation and state updates
 */

import { useState, useCallback, useMemo } from 'react';
import type { ValidationResult } from '../utils/securityValidation';
import type { 
  FormValidationState, 
  FormData, 
  ValidationCheckResult,
  UseSecureValidationOptions 
} from '../types/validation';
import { validateFormField, getAllValidationFields } from '../utils/fieldValidators';

export const useValidationState = (options: UseSecureValidationOptions = {}) => {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300
  } = options;

  const [validationState, setValidationState] = useState<FormValidationState>({});

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

  // Update validation state for a field
  const updateFieldValidation = useCallback((
    fieldName: string, 
    result: ValidationResult, 
    touched: boolean = false
  ) => {
    setValidationState(prev => ({
      ...prev,
      [fieldName]: {
        isValid: result.isValid,
        errors: result.errors,
        warnings: result.warnings,
        touched: touched || prev[fieldName]?.touched || false
      }
    }));
  }, []);

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

  // Validate all fields
  const validateAllFields = useCallback((formData: FormData): ValidationCheckResult => {
    const newValidationState: FormValidationState = {};
    let isFormValid = true;

    const allFields = getAllValidationFields(formData);
    
    for (const fieldName of allFields) {
      const value = formData[fieldName];
      const result = validateFormField(fieldName, value, formData);
      
      newValidationState[fieldName] = {
        isValid: result.isValid,
        errors: result.errors,
        warnings: result.warnings,
        touched: true
      };
      
      if (!result.isValid) {
        isFormValid = false;
      }
    }

    setValidationState(newValidationState);
    return { isValid: isFormValid, validationState: newValidationState };
  }, []);

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

  // Get field validation state
  const getFieldValidation = useCallback((fieldName: string) => {
    return validationState[fieldName] || {
      isValid: true,
      errors: [],
      warnings: [],
      touched: false
    };
  }, [validationState]);

  // Check if field has errors
  const hasFieldError = useCallback((fieldName: string) => {
    const field = validationState[fieldName];
    return field && field.touched && !field.isValid;
  }, [validationState]);

  // Get field error message
  const getFieldError = useCallback((fieldName: string) => {
    const field = validationState[fieldName];
    if (field && field.touched && !field.isValid && field.errors.length > 0) {
      return field.errors[0];
    }
    return null;
  }, [validationState]);

  // Get field warning message
  const getFieldWarning = useCallback((fieldName: string) => {
    const field = validationState[fieldName];
    if (field && field.warnings && field.warnings.length > 0) {
      return field.warnings[0];
    }
    return null;
  }, [validationState]);

  // Check if form is valid
  const isFormValid = useMemo(() => {
    return Object.values(validationState).every(field => field.isValid);
  }, [validationState]);

  // Get form errors summary
  const getFormErrors = useCallback(() => {
    const errors: Record<string, string[]> = {};
    
    Object.entries(validationState).forEach(([fieldName, field]) => {
      if (field.touched && !field.isValid) {
        errors[fieldName] = field.errors;
      }
    });
    
    return errors;
  }, [validationState]);

  // Reset validation state
  const resetValidationState = useCallback(() => {
    setValidationState({});
  }, []);

  return {
    validationState,
    isFormValid,
    validateSingleField,
    validateAllFields,
    handleFieldChange,
    handleFieldBlur,
    getFieldValidation,
    hasFieldError,
    getFieldError,
    getFieldWarning,
    getFormErrors,
    resetValidationState
  };
}; 