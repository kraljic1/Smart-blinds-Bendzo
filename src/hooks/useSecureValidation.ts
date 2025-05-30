/**
 * Custom hook for secure form validation
 * Integrates with the security validation utilities
 */

import { useState, useCallback, useMemo } from 'react';
import { 
  validateEmail, 
  validateName, 
  validateAddress, 
  validateCity, 
  validatePostalCode, 
  validateCompanyName, 
  validateOIB, 
  validateNotes,
  formSubmissionLimiter,
  type ValidationResult 
} from '../utils/securityValidation';
import { validatePhoneNumberRealTime, getCountryCodeFromDialCode } from '../utils/phoneValidation';

export interface FormValidationState {
  [key: string]: {
    isValid: boolean;
    errors: string[];
    warnings?: string[];
    touched: boolean;
  };
}

export interface UseSecureValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
}

export interface FormData {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  phoneCode?: string;
  address?: string;
  shippingAddress?: string;
  city?: string;
  shippingCity?: string;
  postalCode?: string;
  shippingPostalCode?: string;
  companyName?: string;
  companyOib?: string;
  additionalNotes?: string;
  sameAsBilling?: boolean;
  needsR1Invoice?: boolean;
  [key: string]: unknown;
}

export interface SubmitCheckResult {
  canSubmit: boolean;
  reason?: string | null;
  remainingAttempts?: number;
  validationState?: FormValidationState;
}

export interface ValidationCheckResult {
  isValid: boolean;
  validationState: FormValidationState;
}

export const useSecureValidation = (
  options: UseSecureValidationOptions = {}
) => {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300
  } = options;

  const [validationState, setValidationState] = useState<FormValidationState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

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

  // Individual field validators
  const validateField = useCallback((
    fieldName: string, 
    value: unknown, 
    formData: FormData = {}
  ): ValidationResult => {
    switch (fieldName) {
      case 'email': {
        return validateEmail(value as string);
      }
      
      case 'fullName': {
        return validateName(value as string, 'Full name');
      }
      
      case 'companyName': {
        return validateCompanyName(value as string);
      }
      
      case 'address': {
        return validateAddress(value as string, 'Address');
      }
      
      case 'shippingAddress': {
        return validateAddress(value as string, 'Shipping address');
      }
      
      case 'city':
      case 'shippingCity': {
        return validateCity(value as string);
      }
      
      case 'postalCode':
      case 'shippingPostalCode': {
        return validatePostalCode(value as string);
      }
      
      case 'companyOib': {
        return validateOIB(value as string);
      }
      
      case 'additionalNotes': {
        return validateNotes(value as string);
      }
      
      case 'phoneNumber': {
        const countryCode = getCountryCodeFromDialCode(formData.phoneCode || '+385');
        if (countryCode) {
          const result = validatePhoneNumberRealTime(value as string, countryCode);
          return {
            isValid: result.isValid,
            sanitizedValue: value as string,
            errors: result.errorMessage ? [result.errorMessage] : [],
            warnings: result.suggestion ? [result.suggestion] : []
          };
        }
        return { isValid: false, errors: ['Invalid phone number'], sanitizedValue: value as string };
      }
      
      default: {
        // Generic text validation for unknown fields
        if (typeof value === 'string') {
          const trimmed = value.trim();
          return {
            isValid: trimmed.length > 0,
            sanitizedValue: trimmed,
            errors: trimmed.length === 0 ? [`${fieldName} is required`] : []
          };
        }
        return { isValid: true, sanitizedValue: value as string, errors: [] };
      }
    }
  }, []);

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
      const result = validateField(fieldName, value, formData);
      updateFieldValidation(fieldName, result, true);
    };

    if (immediate || !validateOnChange) {
      validator();
    } else {
      debounceValidation(fieldName, validator);
    }
  }, [validateField, updateFieldValidation, debounceValidation, validateOnChange]);

  // Validate all fields
  const validateAllFields = useCallback((formData: FormData): ValidationCheckResult => {
    const newValidationState: FormValidationState = {};
    let isFormValid = true;

    // Required fields based on form state
    const requiredFields = ['fullName', 'email', 'phoneNumber', 'address', 'city', 'postalCode'];
    
    // Add shipping fields if different from billing
    if (!formData.sameAsBilling) {
      requiredFields.push('shippingAddress', 'shippingCity', 'shippingPostalCode');
    }
    
    // Add company fields if R1 invoice is requested
    if (formData.needsR1Invoice) {
      requiredFields.push('companyName', 'companyOib');
    }

    // Validate all fields
    const allFields = [...requiredFields, 'additionalNotes'];
    
    for (const fieldName of allFields) {
      const value = formData[fieldName];
      const result = validateField(fieldName, value, formData);
      
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
  }, [validateField]);

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

  // Check if form can be submitted
  const canSubmit = useCallback((formData: FormData): SubmitCheckResult => {
    // Check rate limiting
    const userIdentifier = formData.email || 'anonymous';
    if (!formSubmissionLimiter.isAllowed(userIdentifier)) {
      return {
        canSubmit: false,
        reason: 'Rate limit exceeded. Please wait before submitting again.',
        remainingAttempts: formSubmissionLimiter.getRemainingAttempts(userIdentifier)
      };
    }

    // Validate all fields
    const validation = validateAllFields(formData);
    
    return {
      canSubmit: validation.isValid,
      reason: validation.isValid ? null : 'Please fix validation errors before submitting',
      validationState: validation.validationState
    };
  }, [validateAllFields]);

  // Handle form submission
  const handleSubmit = useCallback(async (
    formData: FormData,
    submitFunction: (data: FormData) => Promise<unknown>
  ) => {
    setIsSubmitting(true);
    setSubmitAttempts(prev => prev + 1);

    try {
      const submitCheck = canSubmit(formData);
      
      if (!submitCheck.canSubmit) {
        throw new Error(submitCheck.reason || 'Form validation failed');
      }

      // Perform submission
      const result = await submitFunction(formData);
      
      // Reset validation state on successful submission
      setValidationState({});
      setSubmitAttempts(0);
      
      return result;
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [canSubmit]);

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
    getFormErrors
  };
}; 