import { FormData, PhoneValidation } from '../../CheckoutFormTypes';
import { validateBasicFields, validateCompanyFields, validatePhoneNumber } from './fieldValidators';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Validates all form fields using individual validators
 */
export const validateAllFields = (
  formData: FormData, 
  phoneValidation: PhoneValidation
): ValidationResult => {
  console.log('[CHECKOUT] Validating required fields...');
  
  // Validate basic required fields
  const basicValidation = validateBasicFields(formData);
  if (!basicValidation.isValid) {
    return basicValidation;
  }
  
  // Validate company fields for R1 invoice
  const companyValidation = validateCompanyFields(formData);
  if (!companyValidation.isValid) {
    return companyValidation;
  }
  
  // Validate phone number
  const phoneNumberValidation = validatePhoneNumber(phoneValidation);
  if (!phoneNumberValidation.isValid) {
    return phoneNumberValidation;
  }
  
  return { isValid: true };
}; 