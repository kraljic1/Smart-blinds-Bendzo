import { useState, useCallback } from 'react';
import type { ValidationResult } from '../../utils/securityValidation';
import type { FormValidationState } from '../../types/validation';

export const useValidationStateManager = () => {
 const [validationState, setValidationState] = useState<FormValidationState>({});

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

 return {
 validationState,
 setValidationState,
 updateFieldValidation
 };
}; 