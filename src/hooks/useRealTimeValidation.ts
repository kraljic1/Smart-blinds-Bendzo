import { useState, useCallback, useRef } from 'react';
import { validateFormField } from '../utils/fieldValidators';
import type { FormData } from '../components/Checkout/CheckoutFormTypes';

interface FieldValidationState {
  isValid: boolean;
  error: string | null;
  warning: string | null;
  isValidating: boolean;
  touched: boolean;
}

interface UseRealTimeValidationOptions {
  debounceMs?: number;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export const useRealTimeValidation = (
  formData: FormData,
  options: UseRealTimeValidationOptions = {}
) => {
  const {
    debounceMs = 500,
    validateOnChange = true,
    validateOnBlur = true
  } = options;

  const [fieldStates, setFieldStates] = useState<Record<string, FieldValidationState>>({});
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
  }, [formData, debounceMs, clearFieldTimeout]);

  // Handle field change
  const handleFieldChange = useCallback((fieldName: string, value: unknown) => {
    if (validateOnChange) {
      validateField(fieldName, value, false);
    }
  }, [validateField, validateOnChange]);

  // Handle field blur
  const handleFieldBlur = useCallback((fieldName: string, value: unknown) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], touched: true }
    }));

    if (validateOnBlur) {
      validateField(fieldName, value, true);
    }
  }, [validateField, validateOnBlur]);

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

  // Check if form is valid
  const isFormValid = useCallback(() => {
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'address', 'city', 'postalCode'];
    
    // Add conditional fields
    const fieldsToCheck = [...requiredFields];
    if (!formData.sameAsBilling) {
      fieldsToCheck.push('shippingAddress', 'shippingCity', 'shippingPostalCode');
    }
    if (formData.needsR1Invoice) {
      fieldsToCheck.push('companyName', 'companyOib');
    }

    return fieldsToCheck.every(field => {
      const state = getFieldState(field);
      return state.isValid;
    });
  }, [formData, getFieldState]);

  // Cleanup timeouts on unmount
  const cleanup = useCallback(() => {
    Object.values(timeoutRefs.current).forEach(clearTimeout);
    timeoutRefs.current = {};
  }, []);

  return {
    handleFieldChange,
    handleFieldBlur,
    getFieldState,
    shouldShowError,
    shouldShowSuccess,
    shouldShowWarning,
    getFieldError,
    getFieldWarning,
    isFormValid,
    cleanup
  };
}; 