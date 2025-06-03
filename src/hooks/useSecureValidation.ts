/**
 * Custom hook for secure form validation
 * Orchestrates validation state management and form submission
 */

import { useCallback } from 'react';
import type { 
  UseSecureValidationOptions, 
  FormData 
} from '../types/validation';
import { useValidationState } from './useValidationState';
import { useFormSubmission } from './useFormSubmission';

export const useSecureValidation = (
  options: UseSecureValidationOptions = {}
) => {
  // Use validation state management hook
  const {
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
  } = useValidationState(options);

  // Use form submission hook
  const {
    isSubmitting,
    submitAttempts,
    canSubmit: checkCanSubmit,
    handleSubmit: handleFormSubmit,
    resetSubmissionState
  } = useFormSubmission();

  // Wrapper for canSubmit that includes validation function
  const canSubmit = useCallback((formData: FormData) => {
    return checkCanSubmit(formData, validateAllFields);
  }, [checkCanSubmit, validateAllFields]);

  // Wrapper for handleSubmit that includes validation and reset functions
  const handleSubmit = useCallback(async (
    formData: FormData,
    submitFunction: (data: FormData) => Promise<unknown>
  ) => {
    return handleFormSubmit(
      formData, 
      submitFunction, 
      validateAllFields, 
      resetValidationState
    );
  }, [handleFormSubmit, validateAllFields, resetValidationState]);

  // Reset all state
  const resetAll = useCallback(() => {
    resetValidationState();
    resetSubmissionState();
  }, [resetValidationState, resetSubmissionState]);

  return {
    // Validation state
    validationState,
    isFormValid,
    isSubmitting,
    submitAttempts,
    
    // Field validation methods
    validateSingleField,
    validateAllFields,
    handleFieldChange,
    handleFieldBlur,
    
    // Field state getters
    getFieldValidation,
    hasFieldError,
    getFieldError,
    getFieldWarning,
    
    // Form submission
    canSubmit,
    handleSubmit,
    getFormErrors,
    
    // Reset functions
    resetAll,
    resetValidationState,
    resetSubmissionState
  };
};

// Re-export types for convenience
export type {
  FormValidationState,
  UseSecureValidationOptions,
  FormData,
  SubmitCheckResult,
  ValidationCheckResult,
  FieldValidationResult
} from '../types/validation'; 