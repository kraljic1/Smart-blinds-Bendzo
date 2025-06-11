/**
 * Address and Location Validators
 * Validation functions for address, city, and postal code fields
 */

import DOMPurify from 'dompurify';
import { 
 ValidationResult, 
 MAX_ADDRESS_LENGTH,
 DANGEROUS_PATTERNS 
} from './types';

// Re-export field validators from separate module
export { validateEmail, validateName } from './fieldValidators';

// Security threat detection
const containsSecurityThreats = (input: string): boolean => {
 const lowerInput = input.toLowerCase();
 return DANGEROUS_PATTERNS.some(pattern => lowerInput.includes(pattern.toLowerCase()));
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