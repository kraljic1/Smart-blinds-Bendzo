import { safeLog } from '../../../../utils/errorHandler';
import { FormData, PhoneValidation } from '../../CheckoutFormTypes';

/**
 * Validates basic required fields
 */
export const validateBasicFields = (formData: FormData): { isValid: boolean; message?: string } => {
  const requiredFields = [
    'fullName', 'email', 'phoneNumber', 'address', 'city', 'postalCode', 'shippingMethod'
  ];
  
  for (const field of requiredFields) {
    if (!formData[field as keyof typeof formData]) {
      const message = getFieldErrorMessage(field);
      safeLog.info(`Required field missing: ${field}`);
      return { isValid: false, message };
    }
  }
  
  return { isValid: true };
};

/**
 * Validates company-specific fields for R1 invoice
 */
export const validateCompanyFields = (formData: FormData): { isValid: boolean; message?: string } => {
  if (!formData.needsR1Invoice) {
    return { isValid: true };
  }
  
  if (!formData.companyName) {
    safeLog.info('Company name missing for R1 invoice');
    return { isValid: false, message: 'Molimo unesite naziv tvrtke za R1 račun' };
  }
  
  if (!formData.companyOib) {
    safeLog.info('Company OIB missing for R1 invoice');
    return { isValid: false, message: 'Molimo unesite OIB tvrtke za R1 račun' };
  }
  
  return { isValid: true };
};

/**
 * Validates phone number
 */
export const validatePhoneNumber = (phoneValidation: PhoneValidation): { isValid: boolean; message?: string } => {
  if (!phoneValidation.isValid) {
    safeLog.info('Phone validation failed');
    return { isValid: false, message: 'Molimo unesite ispravan broj telefona' };
  }
  
  return { isValid: true };
};

/**
 * Gets user-friendly error message for a field
 */
const getFieldErrorMessage = (field: string): string => {
  const fieldMessages: Record<string, string> = {
    fullName: 'ime i prezime',
    email: 'email adresu',
    phoneNumber: 'broj telefona',
    address: 'adresu',
    city: 'grad',
    postalCode: 'poštanski broj',
    shippingMethod: 'način dostave'
  };
  
  const fieldName = fieldMessages[field] || field;
  return `Molimo unesite ${fieldName}`;
}; 