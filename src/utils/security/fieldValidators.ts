/**
 * Field Validators
 * Core validation functions for email and name fields
 */

import DOMPurify from 'dompurify';
import { 
  ValidationResult, 
  MAX_EMAIL_LENGTH, 
  MAX_NAME_LENGTH,
  DANGEROUS_PATTERNS 
} from './types';

// Security threat detection
const containsSecurityThreats = (input: string): boolean => {
  const lowerInput = input.toLowerCase();
  return DANGEROUS_PATTERNS.some(pattern => lowerInput.includes(pattern.toLowerCase()));
};

// Email validation with enhanced security
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!email || typeof email !== 'string') {
    return { isValid: false, errors: ['Email is required'] };
  }
  
  // Length check
  if (email.length > MAX_EMAIL_LENGTH) {
    errors.push(`Email must be less than ${MAX_EMAIL_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedEmail = DOMPurify.sanitize(email.trim().toLowerCase());
  
  // Security checks
  if (containsSecurityThreats(sanitizedEmail)) {
    errors.push('Email contains potentially malicious content');
  }
  
  // Enhanced email regex with security considerations
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(sanitizedEmail)) {
    errors.push('Invalid email format');
  }
  
  // Check for suspicious patterns
  if (sanitizedEmail.includes('..')) {
    errors.push('Email contains invalid consecutive dots');
  }
  
  // Check for suspicious domains (basic check)
  const suspiciousDomains = ['tempmail', '10minutemail', 'guerrillamail', 'mailinator'];
  const domain = sanitizedEmail.split('@')[1];
  if (domain && suspiciousDomains.some(suspicious => domain.includes(suspicious))) {
    warnings.push('Temporary email domain detected');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedEmail,
    errors,
    warnings
  };
};

// Name validation with security checks
export const validateName = (name: string, fieldName: string = 'Name'): ValidationResult => {
  const errors: string[] = [];
  
  if (!name || typeof name !== 'string') {
    return { isValid: false, errors: [`${fieldName} is required`] };
  }
  
  // Length check
  if (name.length > MAX_NAME_LENGTH) {
    errors.push(`${fieldName} must be less than ${MAX_NAME_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedName = DOMPurify.sanitize(name.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedName)) {
    errors.push(`${fieldName} contains potentially malicious content`);
  }
  
  // Name pattern validation (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/;
  if (!nameRegex.test(sanitizedName)) {
    errors.push(`${fieldName} contains invalid characters`);
  }
  
  // Minimum length check
  if (sanitizedName.length < 2) {
    errors.push(`${fieldName} must be at least 2 characters long`);
  }
  
  // Check for excessive repetition
  if (/(.)\1{4,}/.test(sanitizedName)) {
    errors.push(`${fieldName} contains excessive character repetition`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedName,
    errors
  };
}; 