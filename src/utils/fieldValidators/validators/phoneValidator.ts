import { validatePhoneNumberRealTime, getCountryCodeFromDialCode } from '../../phoneValidation';
import type { FieldValidator } from '../types/validatorTypes';

export const phoneNumberValidator: FieldValidator = (value, formData = {}) => {
  const countryCode = getCountryCodeFromDialCode(formData.phoneCode || '+385');
  
  if (countryCode) {
    const result = validatePhoneNumberRealTime(value as string, countryCode);
    return {
      isValid: result.isValid,
      sanitizedValue: value as string,
      errors: result.error ? [result.error] : [],
      warnings: []
    };
  }
  
  return { 
    isValid: false, 
    errors: ['Invalid phone number'], 
    sanitizedValue: value as string,
    warnings: []
  };
}; 