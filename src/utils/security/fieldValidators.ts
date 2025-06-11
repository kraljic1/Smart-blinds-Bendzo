/**
 * Field Validators
 * Core validation functions for email and name fields
 */

import DOMPurify from 'dompurify';
import { 
 ValidationResult, 
 MAX_EMAIL_LENGTH, 
 MAX_NAME_LENGTH,
 DANGEROUS_PATTERNS,
 MAX_ADDRESS_LENGTH
} from './types';
import { EMAIL_REGEX, NAME_REGEX } from './validationConstants';
import { 
 validateEmailDomain, 
 checkSuspiciousDomains, 
 validateEmailLocalPart 
} from './emailValidationUtils';
import { 
 validateAddressContent, 
 validateAddressFormat, 
 checkPlaceholderAddress 
} from './addressValidationUtils';

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
 
 // Enhanced email regex validation
 if (!EMAIL_REGEX.test(sanitizedEmail)) {
 errors.push('Invalid email format');
 } else {
 // Additional validation for realistic email addresses
 const [localPart, domainPart] = sanitizedEmail.split('@');
 
 // Check local part (before @)
 errors.push(...validateEmailLocalPart(localPart));
 
 // Check domain part (after @)
 if (domainPart) {
 const domainValidation = validateEmailDomain(domainPart);
 errors.push(...domainValidation.errors);
 warnings.push(...domainValidation.warnings);
 }
 }
 
 // Check for suspicious patterns
 if (sanitizedEmail.includes('..')) {
 errors.push('Email contains invalid consecutive dots');
 }
 
 // Check for suspicious domains
 warnings.push(...checkSuspiciousDomains(sanitizedEmail));
 
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
 if (!NAME_REGEX.test(sanitizedName)) {
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

// Address validation with enhanced requirements
export const validateAddress = (address: string): ValidationResult => {
 const errors: string[] = [];
 const warnings: string[] = [];
 
 if (!address || typeof address !== 'string') {
 return { isValid: false, errors: ['Address is required'] };
 }
 
 // Length check
 if (address.length > MAX_ADDRESS_LENGTH) {
 errors.push(`Address must be less than ${MAX_ADDRESS_LENGTH} characters`);
 }
 
 // Sanitize input
 const sanitizedAddress = DOMPurify.sanitize(address.trim());
 
 // Security checks
 if (containsSecurityThreats(sanitizedAddress)) {
 errors.push('Address contains potentially malicious content');
 }
 
 // Enhanced address validation
 const trimmedAddress = sanitizedAddress.trim();
 
 // Validate address content and structure
 const contentValidation = validateAddressContent(trimmedAddress);
 errors.push(...contentValidation.errors);
 warnings.push(...contentValidation.warnings);
 
 // Validate address format and characters
 errors.push(...validateAddressFormat(trimmedAddress));
 
 // Check for placeholder addresses
 warnings.push(...checkPlaceholderAddress(trimmedAddress));
 
 return {
 isValid: errors.length === 0,
 sanitizedValue: sanitizedAddress,
 errors,
 warnings
 };
}; 