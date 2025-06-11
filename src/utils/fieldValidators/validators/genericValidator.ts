import type { FieldValidator } from '../types/validatorTypes';

export const createGenericValidator = (fieldName: string): FieldValidator => (value) => {
 // Generic text validation for unknown fields
 if (typeof value === 'string') {
 const trimmed = value.trim();
 return {
 isValid: trimmed.length > 0,
 sanitizedValue: trimmed,
 errors: trimmed.length === 0 ? [`${fieldName} is required`] : [],
 warnings: []
 };
 }
 
 return { 
 isValid: true, 
 sanitizedValue: value as string, 
 errors: [],
 warnings: []
 };
}; 