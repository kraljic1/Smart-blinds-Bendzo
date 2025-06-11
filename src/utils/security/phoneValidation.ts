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

// Basic input validation
const validateBasicInput = (phoneNumber: string): string[] => {
 const errors: string[] = [];
 
 if (!phoneNumber || typeof phoneNumber !== 'string') {
 errors.push('Phone number is required');
 return errors;
 }
 
 if (phoneNumber.length > MAX_PHONE_LENGTH) {
 errors.push(`Phone number must be less than ${MAX_PHONE_LENGTH} characters`);
 }
 
 return errors;
};

// Security validation
const validateSecurity = (sanitizedPhone: string): string[] => {
 const errors: string[] = [];
 
 if (containsSecurityThreats(sanitizedPhone)) {
 errors.push('Phone number contains potentially malicious content');
 }
 
 // Phone pattern validation (digits, spaces, hyphens, parentheses, plus)
 const phoneRegex = /^[\d\s\-()+ ]+$/;
 if (!phoneRegex.test(sanitizedPhone)) {
 errors.push('Phone number contains invalid characters');
 }
 
 return errors;
};

// Length validation for digits
const validateDigitLength = (digitsOnly: string): string[] => {
 const errors: string[] = [];
 
 if (digitsOnly.length < 8) {
 errors.push('Phone number must have at least 8 digits');
 }
 
 if (digitsOnly.length > 15) {
 errors.push('Phone number must have at most 15 digits');
 }
 
 return errors;
};

// Croatian phone number validation
const validateCroatianPhone = (digitsOnly: string, countryCode: string): string[] => {
 const errors: string[] = [];
 
 if (countryCode !== 'HR' && countryCode !== '+385') {
 return errors;
 }
 
 const isLocalNumber = !digitsOnly.startsWith('385') && digitsOnly.length === 8;
 const isInternationalNumber = digitsOnly.startsWith('385') && digitsOnly.length === 11;
 
 if (isLocalNumber) {
 if (!digitsOnly.match(/^[1-9]/)) {
 errors.push('Invalid Croatian phone number format');
 }
 } else if (isInternationalNumber) {
 const localPart = digitsOnly.substring(3);
 if (!localPart.match(/^[1-9]/)) {
 errors.push('Invalid Croatian phone number format');
 }
 }
 
 return errors;
};

// Phone number validation (enhanced)
export const validatePhoneSecure = (phoneNumber: string, countryCode: string): ValidationResult => {
 // Basic input validation
 const basicErrors = validateBasicInput(phoneNumber);
 if (basicErrors.length > 0) {
 return { isValid: false, errors: basicErrors };
 }
 
 // Sanitize input
 const sanitizedPhone = DOMPurify.sanitize(phoneNumber.trim());
 
 // Collect all validation errors
 const allErrors = [
 ...validateSecurity(sanitizedPhone),
 ...validateDigitLength(sanitizedPhone.replace(/\D/g, '')),
 ...validateCroatianPhone(sanitizedPhone.replace(/\D/g, ''), countryCode)
 ];
 
 return {
 isValid: allErrors.length === 0,
 sanitizedValue: sanitizedPhone,
 errors: allErrors
 };
}; 