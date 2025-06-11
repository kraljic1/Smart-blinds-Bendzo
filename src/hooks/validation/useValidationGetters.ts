import { useCallback, useMemo } from 'react';
import type { FormValidationState } from '../../types/validation';

export const useValidationGetters = (validationState: FormValidationState) => {
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
 getFieldValidation,
 hasFieldError,
 getFieldError,
 getFieldWarning,
 isFormValid,
 getFormErrors
 };
}; 