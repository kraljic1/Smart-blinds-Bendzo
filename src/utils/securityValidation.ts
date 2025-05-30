/**
 * Comprehensive Security Validation Utilities
 * Provides robust input validation, sanitization, and security checks
 */

import DOMPurify from 'dompurify';

// Security constants
const MAX_STRING_LENGTH = 1000;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MAX_NAME_LENGTH = 100;
const MAX_ADDRESS_LENGTH = 200;
const MAX_NOTES_LENGTH = 2000;
const MAX_COMPANY_NAME_LENGTH = 150;

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
const DANGEROUS_PATTERNS = [
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

// Address validation with security checks
export const validateAddress = (address: string, fieldName: string = 'Address'): ValidationResult => {
  const errors: string[] = [];
  
  if (!address || typeof address !== 'string') {
    return { isValid: false, errors: [`${fieldName} is required`] };
  }
  
  // Length check
  if (address.length > MAX_ADDRESS_LENGTH) {
    errors.push(`${fieldName} must be less than ${MAX_ADDRESS_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedAddress = DOMPurify.sanitize(address.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedAddress)) {
    errors.push(`${fieldName} contains potentially malicious content`);
  }
  
  // Address pattern validation (letters, numbers, spaces, common punctuation)
  const addressRegex = /^[a-zA-ZÀ-ÿĀ-žА-я0-9\s\-'./,#]+$/;
  if (!addressRegex.test(sanitizedAddress)) {
    errors.push(`${fieldName} contains invalid characters`);
  }
  
  // Minimum length check
  if (sanitizedAddress.length < 5) {
    errors.push(`${fieldName} must be at least 5 characters long`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedAddress,
    errors
  };
};

// City validation
export const validateCity = (city: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!city || typeof city !== 'string') {
    return { isValid: false, errors: ['City is required'] };
  }
  
  // Sanitize input
  const sanitizedCity = DOMPurify.sanitize(city.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedCity)) {
    errors.push('City contains potentially malicious content');
  }
  
  // City pattern validation (letters, spaces, hyphens, apostrophes)
  const cityRegex = /^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/;
  if (!cityRegex.test(sanitizedCity)) {
    errors.push('City contains invalid characters');
  }
  
  // Length checks
  if (sanitizedCity.length < 2) {
    errors.push('City must be at least 2 characters long');
  }
  
  if (sanitizedCity.length > 50) {
    errors.push('City must be less than 50 characters');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedCity,
    errors
  };
};

// Postal code validation (Croatian format)
export const validatePostalCode = (postalCode: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!postalCode || typeof postalCode !== 'string') {
    return { isValid: false, errors: ['Postal code is required'] };
  }
  
  // Sanitize input
  const sanitizedPostalCode = DOMPurify.sanitize(postalCode.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedPostalCode)) {
    errors.push('Postal code contains potentially malicious content');
  }
  
  // Croatian postal code format (5 digits)
  const postalCodeRegex = /^[0-9]{5}$/;
  if (!postalCodeRegex.test(sanitizedPostalCode)) {
    errors.push('Postal code must be exactly 5 digits');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedPostalCode,
    errors
  };
};

// Company name validation
export const validateCompanyName = (companyName: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!companyName || typeof companyName !== 'string') {
    return { isValid: false, errors: ['Company name is required'] };
  }
  
  // Length check
  if (companyName.length > MAX_COMPANY_NAME_LENGTH) {
    errors.push(`Company name must be less than ${MAX_COMPANY_NAME_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedCompanyName = DOMPurify.sanitize(companyName.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedCompanyName)) {
    errors.push('Company name contains potentially malicious content');
  }
  
  // Company name pattern validation
  const companyNameRegex = /^[a-zA-ZÀ-ÿĀ-žА-я0-9\s\-'.&,()]+$/;
  if (!companyNameRegex.test(sanitizedCompanyName)) {
    errors.push('Company name contains invalid characters');
  }
  
  // Minimum length check
  if (sanitizedCompanyName.length < 2) {
    errors.push('Company name must be at least 2 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedCompanyName,
    errors
  };
};

// Croatian OIB validation
export const validateOIB = (oib: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!oib || typeof oib !== 'string') {
    return { isValid: false, errors: ['OIB is required'] };
  }
  
  // Sanitize input
  const sanitizedOIB = DOMPurify.sanitize(oib.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedOIB)) {
    errors.push('OIB contains potentially malicious content');
  }
  
  // OIB format validation (11 digits)
  const oibRegex = /^[0-9]{11}$/;
  if (!oibRegex.test(sanitizedOIB)) {
    errors.push('OIB must be exactly 11 digits');
  }
  
  // OIB checksum validation (Croatian algorithm)
  if (sanitizedOIB.length === 11) {
    const isValidOIB = validateOIBChecksum(sanitizedOIB);
    if (!isValidOIB) {
      errors.push('Invalid OIB checksum');
    }
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedOIB,
    errors
  };
};

// Notes validation
export const validateNotes = (notes: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!notes) {
    return { isValid: true, sanitizedValue: '', errors: [] };
  }
  
  if (typeof notes !== 'string') {
    return { isValid: false, errors: ['Notes must be text'] };
  }
  
  // Length check
  if (notes.length > MAX_NOTES_LENGTH) {
    errors.push(`Notes must be less than ${MAX_NOTES_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedNotes = DOMPurify.sanitize(notes.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedNotes)) {
    errors.push('Notes contain potentially malicious content');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedNotes,
    errors
  };
};

// Generic text validation
export const validateText = (
  text: string, 
  fieldName: string, 
  minLength: number = 1, 
  maxLength: number = MAX_STRING_LENGTH,
  required: boolean = true
): ValidationResult => {
  const errors: string[] = [];
  
  if (!text || typeof text !== 'string') {
    if (required) {
      return { isValid: false, errors: [`${fieldName} is required`] };
    } else {
      return { isValid: true, sanitizedValue: '', errors: [] };
    }
  }
  
  // Sanitize input
  const sanitizedText = DOMPurify.sanitize(text.trim());
  
  // Length checks
  if (sanitizedText.length < minLength) {
    errors.push(`${fieldName} must be at least ${minLength} characters long`);
  }
  
  if (sanitizedText.length > maxLength) {
    errors.push(`${fieldName} must be less than ${maxLength} characters`);
  }
  
  // Security checks
  if (containsSecurityThreats(sanitizedText)) {
    errors.push(`${fieldName} contains potentially malicious content`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedText,
    errors
  };
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
  
  // Use existing phone validation logic
  try {
    // Dynamic import to avoid require() linter error
    import('./phoneValidators').then(({ validatePhoneNumber }) => {
      const result = validatePhoneNumber(sanitizedPhone, countryCode);
      
      if (!result.isValid) {
        errors.push(result.errorMessage || 'Invalid phone number format');
      }
    }).catch(() => {
      errors.push('Phone validation service unavailable');
    });
  } catch {
    errors.push('Phone validation service unavailable');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedPhone,
    errors
  };
};

// Security threat detection
const containsSecurityThreats = (input: string): boolean => {
  const lowerInput = input.toLowerCase();
  return DANGEROUS_PATTERNS.some(pattern => lowerInput.includes(pattern.toLowerCase()));
};

// Croatian OIB checksum validation
const validateOIBChecksum = (oib: string): boolean => {
  if (oib.length !== 11) return false;
  
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(oib[i]) * (10 - i);
  }
  
  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? remainder : 11 - remainder;
  
  return checkDigit === parseInt(oib[10]);
};

// Comprehensive form validation
export const validateFormData = (formData: FormDataForValidation): ComprehensiveValidationResult => {
  const errors: Record<string, string[]> = {};
  const sanitizedData: FormDataForValidation = {};
  
  // Validate each field
  const validations = [
    { field: 'fullName', validator: (value: string) => validateName(value, 'Full name') },
    { field: 'email', validator: validateEmail },
    { field: 'phoneNumber', validator: (value: string) => validatePhoneSecure(value, formData.phoneCode as string || 'HR') },
    { field: 'address', validator: (value: string) => validateAddress(value, 'Address') },
    { field: 'city', validator: validateCity },
    { field: 'postalCode', validator: validatePostalCode },
    { field: 'additionalNotes', validator: validateNotes }
  ];
  
  // Add shipping address validation if different from billing
  if (!formData.sameAsBilling) {
    validations.push(
      { field: 'shippingAddress', validator: (value: string) => validateAddress(value, 'Shipping address') },
      { field: 'shippingCity', validator: validateCity },
      { field: 'shippingPostalCode', validator: validatePostalCode }
    );
  }
  
  // Add company validation if R1 invoice is requested
  if (formData.needsR1Invoice) {
    validations.push(
      { field: 'companyName', validator: validateCompanyName },
      { field: 'companyOib', validator: validateOIB }
    );
  }
  
  // Run validations
  for (const { field, validator } of validations) {
    const value = formData[field] as string;
    const result = validator(value);
    
    if (!result.isValid) {
      errors[field] = result.errors;
    } else {
      sanitizedData[field] = result.sanitizedValue;
    }
  }
  
  // Copy non-validated fields
  const validatedFields = validations.map(v => v.field);
  for (const [key, value] of Object.entries(formData)) {
    if (!validatedFields.includes(key)) {
      sanitizedData[key] = value;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData
  };
};

// Rate limiting helper (client-side basic implementation)
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;
  
  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return true;
  }
  
  getRemainingAttempts(identifier: string): number {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    return Math.max(0, this.maxAttempts - recentAttempts.length);
  }
}

// Export rate limiter instance
export const formSubmissionLimiter = new RateLimiter(3, 60000); // 3 attempts per minute 