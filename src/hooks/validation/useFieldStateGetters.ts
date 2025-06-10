import { useCallback } from 'react';
import type { FieldValidationState } from './types';

interface UseFieldStateGettersProps {
  fieldStates: Record<string, FieldValidationState>;
}

export const useFieldStateGetters = ({ fieldStates }: UseFieldStateGettersProps) => {
  
  // Get field state
  const getFieldState = useCallback((fieldName: string): FieldValidationState => {
    return fieldStates[fieldName] || {
      isValid: true,
      error: null,
      warning: null,
      isValidating: false,
      touched: false
    };
  }, [fieldStates]);

  // Check if field should show error
  const shouldShowError = useCallback((fieldName: string) => {
    const state = getFieldState(fieldName);
    return state.touched && !state.isValid && state.error;
  }, [getFieldState]);

  // Check if field should show success
  const shouldShowSuccess = useCallback((fieldName: string) => {
    const state = getFieldState(fieldName);
    return state.touched && state.isValid && !state.isValidating;
  }, [getFieldState]);

  // Check if field should show warning
  const shouldShowWarning = useCallback((fieldName: string) => {
    const state = getFieldState(fieldName);
    return state.touched && state.isValid && state.warning;
  }, [getFieldState]);

  // Get field error message
  const getFieldError = useCallback((fieldName: string) => {
    return shouldShowError(fieldName) ? getFieldState(fieldName).error : null;
  }, [shouldShowError, getFieldState]);

  // Get field warning message
  const getFieldWarning = useCallback((fieldName: string) => {
    return shouldShowWarning(fieldName) ? getFieldState(fieldName).warning : null;
  }, [shouldShowWarning, getFieldState]);

  return {
    getFieldState,
    shouldShowError,
    shouldShowSuccess,
    shouldShowWarning,
    getFieldError,
    getFieldWarning
  };
}; 