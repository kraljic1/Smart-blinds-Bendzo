import { useCallback } from 'react';
import type { FormValidationState, FormData, ValidationCheckResult } from '../../types/validation';
import { validateFormField, getAllValidationFields } from '../../utils/fieldValidators';

interface UseFormValidationProps {
  setValidationState: (state: FormValidationState | ((prev: FormValidationState) => FormValidationState)) => void;
}

export const useFormValidation = ({ setValidationState }: UseFormValidationProps) => {
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
  }, [setValidationState]);

  // Reset validation state
  const resetValidationState = useCallback(() => {
    setValidationState({});
  }, [setValidationState]);

  return {
    validateAllFields,
    resetValidationState
  };
}; 