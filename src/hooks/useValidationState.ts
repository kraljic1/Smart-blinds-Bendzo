/**
 * Hook for managing form validation state
 * Handles individual field validation and state updates
 */

import { useState, useCallback } from 'react';
import type { UseSecureValidationOptions } from '../types/validation';
import { validateFormField } from '../utils/fieldValidators';
import type { FieldValidationState } from './validation/types';

interface ValidationState {
 [fieldName: string]: FieldValidationState;
}

interface FormData {
 [key: string]: unknown;
}

export const useValidationState = (options: UseSecureValidationOptions = {}) => {
 const {
 validateOnChange = true,
 validateOnBlur = true
 } = options;

 const [validationState, setValidationState] = useState<ValidationState>({});

 // Update field validation
 const updateFieldValidation = useCallback((fieldName: string, state: FieldValidationState) => {
 setValidationState(prev => ({
 ...prev,
 [fieldName]: state
 }));
 }, []);

 // Validate a single field
 const validateSingleField = useCallback((fieldName: string, value: unknown, formData: FormData = {}) => {
 const result = validateFormField(fieldName, value, formData);
 
 const fieldState: FieldValidationState = {
 isValid: result.isValid,
 error: result.errors.length > 0 ? result.errors[0] : null,
 warning: result.warnings && result.warnings.length > 0 ? result.warnings[0] : null,
 isValidating: false,
 touched: true
 };

 updateFieldValidation(fieldName, fieldState);
 return result;
 }, [updateFieldValidation]);

 // Handle field change
 const handleFieldChange = useCallback((fieldName: string, value: unknown, formData: FormData = {}) => {
 if (validateOnChange) {
 validateSingleField(fieldName, value, formData);
 }
 }, [validateOnChange, validateSingleField]);

 // Handle field blur
 const handleFieldBlur = useCallback((fieldName: string, value: unknown, formData: FormData = {}) => {
 if (validateOnBlur) {
 validateSingleField(fieldName, value, formData);
 }
 
 // Mark field as touched
 setValidationState(prev => ({
 ...prev,
 [fieldName]: {
 ...prev[fieldName],
 touched: true
 }
 }));
 }, [validateOnBlur, validateSingleField]);

 // Validate all fields
 const validateAllFields = useCallback((formData: FormData) => {
 const fields = Object.keys(formData);
 let isValid = true;

 fields.forEach(fieldName => {
 const result = validateSingleField(fieldName, formData[fieldName], formData);
 if (!result.isValid) {
 isValid = false;
 }
 });

 return isValid;
 }, [validateSingleField]);

 // Reset validation state
 const resetValidationState = useCallback(() => {
 setValidationState({});
 }, []);

 // Get field validation
 const getFieldValidation = useCallback((fieldName: string) => {
 return validationState[fieldName] || {
 isValid: true,
 error: null,
 warning: null,
 isValidating: false,
 touched: false
 };
 }, [validationState]);

 // Check if field has error
 const hasFieldError = useCallback((fieldName: string) => {
 const field = validationState[fieldName];
 return field ? !field.isValid && field.touched : false;
 }, [validationState]);

 // Get field error
 const getFieldError = useCallback((fieldName: string) => {
 const field = validationState[fieldName];
 return field?.error || null;
 }, [validationState]);

 // Get field warning
 const getFieldWarning = useCallback((fieldName: string) => {
 const field = validationState[fieldName];
 return field?.warning || null;
 }, [validationState]);

 // Check if form is valid
 const isFormValid = useCallback(() => {
 return Object.values(validationState).every(field => field.isValid);
 }, [validationState]);

 // Get form errors
 const getFormErrors = useCallback(() => {
 return Object.entries(validationState)
 .filter(([, field]) => !field.isValid && field.touched)
 .map(([fieldName, field]) => ({ field: fieldName, error: field.error }));
 }, [validationState]);

 return {
 validationState,
 isFormValid: isFormValid(),
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