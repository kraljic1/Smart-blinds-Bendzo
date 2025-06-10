/**
 * Hook for managing form validation state
 * Handles individual field validation and state updates
 */

import type { UseSecureValidationOptions } from '../types/validation';
import { 
  useDebouncedValidation, 
  useFieldValidation, 
  useValidationGetters, 
  useFormValidation,
  useValidationStateManager
} from './validation';

export const useValidationState = (options: UseSecureValidationOptions = {}) => {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300
  } = options;

  // Use validation state manager
  const { validationState, setValidationState, updateFieldValidation } = useValidationStateManager();

  // Use specialized hooks
  const debounceValidation = useDebouncedValidation(debounceMs);
  
  const { validateSingleField, handleFieldChange, handleFieldBlur } = useFieldValidation({
    updateFieldValidation,
    debounceValidation,
    validateOnChange,
    validateOnBlur
  });

  const { validateAllFields, resetValidationState } = useFormValidation({
    setValidationState
  });

  const { 
    getFieldValidation, 
    hasFieldError, 
    getFieldError, 
    getFieldWarning, 
    isFormValid, 
    getFormErrors 
  } = useValidationGetters(validationState);

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