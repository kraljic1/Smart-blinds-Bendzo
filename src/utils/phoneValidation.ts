/**
 * Phone validation utilities
 * This file provides all phone-related validation and formatting functions
 */

/**
 * Phone validation result interface
 */
export interface PhoneValidationResult {
 isValid: boolean;
 error?: string;
 formattedNumber?: string;
 countryCode?: string;
}

/**
 * Validates a phone number
 */
export const validatePhoneNumber = (phoneNumber: string, countryCode?: string): PhoneValidationResult => {
 if (!phoneNumber || phoneNumber.trim().length === 0) {
 return { isValid: false, error: 'Phone number is required' };
 }

 // Basic validation - check if it contains only numbers, spaces, dashes, parentheses, and plus
 const phoneRegex = /^[+]?[0-9\s\-()]+$/;
 if (!phoneRegex.test(phoneNumber)) {
 return { isValid: false, error: 'Invalid phone number format' };
 }

 // Remove all non-digit characters except plus
 const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
 
 // Check minimum length
 if (cleanNumber.length < 7) {
 return { isValid: false, error: 'Phone number too short' };
 }

 // Check maximum length
 if (cleanNumber.length > 15) {
 return { isValid: false, error: 'Phone number too long' };
 }

 return { 
 isValid: true, 
 formattedNumber: cleanNumber,
 countryCode: countryCode 
 };
};

/**
 * Real-time phone validation for form inputs
 */
export const validatePhoneNumberRealTime = (phoneNumber: string, countryCode?: string): PhoneValidationResult => {
 // Allow empty during typing
 if (!phoneNumber || phoneNumber.trim().length === 0) {
 return { isValid: true };
 }

 return validatePhoneNumber(phoneNumber, countryCode);
};

/**
 * Formats phone number for display
 */
export const formatPhoneNumberDisplay = (phoneNumber: string): string => {
 if (!phoneNumber) return '';
 
 // Remove all non-digit characters except plus
 const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
 
 // Basic formatting - add spaces every 3-4 digits
 if (cleanNumber.length <= 3) return cleanNumber;
 if (cleanNumber.length <= 6) return `${cleanNumber.slice(0, 3)} ${cleanNumber.slice(3)}`;
 if (cleanNumber.length <= 10) return `${cleanNumber.slice(0, 3)} ${cleanNumber.slice(3, 6)} ${cleanNumber.slice(6)}`;
 
 return `${cleanNumber.slice(0, 3)} ${cleanNumber.slice(3, 6)} ${cleanNumber.slice(6, 10)} ${cleanNumber.slice(10)}`;
};

/**
 * Gets country code from dial code (simplified implementation)
 */
export const getCountryCodeFromDialCode = (dialCode: string): string => {
 // Basic mapping for common dial codes
 const dialCodeMap: Record<string, string> = {
 '+1': 'US',
 '+44': 'GB',
 '+49': 'DE',
 '+33': 'FR',
 '+39': 'IT',
 '+34': 'ES',
 '+385': 'HR', // Croatia
 '+86': 'CN',
 '+81': 'JP',
 '+82': 'KR'
 };
 
 return dialCodeMap[dialCode] || '';
};

/**
 * Secure phone validation (for security contexts)
 */
export const validatePhoneSecure = (phoneNumber: string): PhoneValidationResult => {
 // More strict validation for security contexts
 const result = validatePhoneNumber(phoneNumber);
 
 if (!result.isValid) return result;
 
 // Additional security checks
 const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
 
 // Check for suspicious patterns (repeated digits)
 if (/(\d)\1{6,}/.test(cleanNumber)) {
 return { isValid: false, error: 'Invalid phone number pattern' };
 }
 
 return result;
};

// Export example functions
export { getExamplePhoneNumber } from './phoneExamples'; 