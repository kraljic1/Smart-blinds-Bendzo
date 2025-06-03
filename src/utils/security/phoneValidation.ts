/**
 * Phone Validation
 * Specialized validation for phone numbers with security checks
 */

import DOMPurify from 'dompurify';
import { ValidationResult, MAX_PHONE_LENGTH, DANGEROUS_PATTERNS } from './types';

// Security threat detection
const containsSecurityThreats = (input: string): boolean => {
  const lowerInput = input.toLowerCase();
  return DANGEROUS_PATTERNS.some(pattern => lowerInput.includes(pattern.toLowerCase()));
};

// Phone number validation (enhanced)
export const validatePhoneSecure = (phoneNumber: string, countryCode: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return { isValid: false, errors: ['Phone number is required'] };
  }
  
  // Length check
  if (phoneNumber.length > MAX_PHONE_LENGTH) {
    errors.push(`Phone number must be less than ${MAX_PHONE_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedPhone = DOMPurify.sanitize(phoneNumber.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedPhone)) {
    errors.push('Phone number contains potentially malicious content');
  }
  
  // Phone pattern validation (digits, spaces, hyphens, parentheses, plus)
  const phoneRegex = /^[\d\s\-()+ ]+$/;
  if (!phoneRegex.test(sanitizedPhone)) {
    errors.push('Phone number contains invalid characters');
  }
  
  // Basic phone validation (since phoneValidators module may not exist)
  // Remove all non-digit characters for length check
  const digitsOnly = sanitizedPhone.replace(/\D/g, '');
  
  // Check minimum and maximum length
  if (digitsOnly.length < 8) {
    errors.push('Phone number must have at least 8 digits');
  }
  
  if (digitsOnly.length > 15) {
    errors.push('Phone number must have at most 15 digits');
  }
  
  // Croatian phone number specific validation
  if (countryCode === 'HR' || countryCode === '+385') {
    if (!digitsOnly.startsWith('385') && digitsOnly.length === 8) {
      // Local Croatian number (8 digits)
      if (!digitsOnly.match(/^[1-9]/)) {
        errors.push('Invalid Croatian phone number format');
      }
    } else if (digitsOnly.startsWith('385') && digitsOnly.length === 11) {
      // International Croatian number
      const localPart = digitsOnly.substring(3);
      if (!localPart.match(/^[1-9]/)) {
        errors.push('Invalid Croatian phone number format');
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedPhone,
    errors
  };
}; 