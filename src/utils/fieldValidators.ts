/**
 * Individual field validators utility
 * Contains validation logic for specific form fields
 */

import type { ValidationResult } from './securityValidation';
import type { FormData } from '../types/validation';
import { fieldValidatorConfig } from './fieldValidators/config/validatorConfig';
import { createGenericValidator } from './fieldValidators/validators/genericValidator';

/**
 * Validates a single form field based on its name and value
 */
export const validateFormField = (
  fieldName: string, 
  value: unknown, 
  formData: FormData = {}
): ValidationResult => {
  const validator = fieldValidatorConfig[fieldName];
  
  if (validator) {
    return validator(value, formData);
  }
  
  // Use generic validator for unknown fields
  const genericValidator = createGenericValidator(fieldName);
  return genericValidator(value, formData);
};

// Re-export utility functions
export { getRequiredFields, getAllValidationFields } from './fieldValidators/utils/fieldRequirements'; 