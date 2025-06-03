/**
 * Individual field validators utility
 * Contains validation logic for specific form fields
 */

import { 
  validateEmail, 
  validateName, 
  validateAddress, 
  validateCity, 
  validatePostalCode, 
  validateCompanyName, 
  validateOIB, 
  validateNotes,
  type ValidationResult 
} from './securityValidation';
import { validatePhoneNumberRealTime, getCountryCodeFromDialCode } from './phoneValidation';
import type { FormData } from '../types/validation';

/**
 * Validates a single form field based on its name and value
 */
export const validateFormField = (
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
};

/**
 * Gets required fields based on form state
 */
export const getRequiredFields = (formData: FormData): string[] => {
  const requiredFields = ['fullName', 'email', 'phoneNumber', 'address', 'city', 'postalCode'];
  
  // Add shipping fields if different from billing
  if (!formData.sameAsBilling) {
    requiredFields.push('shippingAddress', 'shippingCity', 'shippingPostalCode');
  }
  
  // Add company fields if R1 invoice is requested
  if (formData.needsR1Invoice) {
    requiredFields.push('companyName', 'companyOib');
  }
  
  return requiredFields;
};

/**
 * Gets all fields that should be validated (required + optional)
 */
export const getAllValidationFields = (formData: FormData): string[] => {
  const requiredFields = getRequiredFields(formData);
  return [...requiredFields, 'additionalNotes'];
}; 