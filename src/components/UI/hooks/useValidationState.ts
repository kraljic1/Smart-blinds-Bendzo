import { useMemo } from 'react';
import { ValidationState } from '../ValidatedInput';

export interface ProcessedValidationState extends ValidationState {
 fieldStateClass: string;
 hasError: boolean;
 hasWarning: boolean;
 hasSuccess: boolean;
 isValidating: boolean;
}

export const useValidationState = (validation: ValidationState): ProcessedValidationState => {
 return useMemo(() => {
 const {
 showError = false,
 showSuccess = false,
 showWarning = false,
 isValidating = false
 } = validation;

 // Determine field state class based on validation state
 const getFieldStateClass = (): string => {
 if (showError) return 'error';
 if (showSuccess) return 'success';
 if (showWarning) return 'warning';
 if (isValidating) return 'validating';
 return '';
 };

 return {
 ...validation,
 fieldStateClass: getFieldStateClass(),
 hasError: showError,
 hasWarning: showWarning && !showError,
 hasSuccess: showSuccess && !showError && !showWarning,
 isValidating
 };
 }, [validation]);
}; 