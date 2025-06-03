/**
 * Security Validation Types and Constants
 * Shared interfaces, types, and constants for security validation
 */

// Security constants
export const MAX_STRING_LENGTH = 1000;
export const MAX_EMAIL_LENGTH = 254;
export const MAX_PHONE_LENGTH = 20;
export const MAX_NAME_LENGTH = 100;
export const MAX_ADDRESS_LENGTH = 200;
export const MAX_NOTES_LENGTH = 2000;
export const MAX_COMPANY_NAME_LENGTH = 150;

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  sanitizedValue?: string;
  errors: string[];
  warnings?: string[];
}

// Form data interface for comprehensive validation
export interface FormDataForValidation {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  phoneCode?: string;
  address?: string;
  shippingAddress?: string;
  city?: string;
  shippingCity?: string;
  postalCode?: string;
  shippingPostalCode?: string;
  companyName?: string;
  companyOib?: string;
  additionalNotes?: string;
  sameAsBilling?: boolean;
  needsR1Invoice?: boolean;
  [key: string]: unknown;
}

// Comprehensive validation result interface
export interface ComprehensiveValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  sanitizedData: FormDataForValidation;
}

// Security threat detection patterns
export const DANGEROUS_PATTERNS = [
  '<script',
  'javascript:',
  'data:text/html',
  'vbscript:',
  'onload=',
  'onerror=',
  'onclick=',
  'onmouseover=',
  '<iframe',
  '<object',
  '<embed',
  'SELECT ',
  'INSERT ',
  'UPDATE ',
  'DELETE ',
  'DROP ',
  'CREATE ',
  'ALTER ',
  'EXEC ',
  'UNION ',
  'SCRIPT',
  '../',
  '..\\',
  '/etc/passwd',
  '/bin/',
  'cmd.exe',
  'powershell'
]; 