/**
 * Input Validation and Sanitization
 * Protects against XSS, SQL injection, and other input-based attacks
 */

export interface ValidationResult {
 isValid: boolean;
 sanitizedValue: string;
 errors: string[];
}

export type InputType = 'text' | 'email' | 'phone' | 'url' | 'number';

/**
 * Validate and sanitize user input
 */
export function validateInput(input: string, type: InputType): ValidationResult {
 const result: ValidationResult = {
 isValid: true,
 sanitizedValue: input,
 errors: []
 };

 // Basic sanitization - remove dangerous characters
 let sanitized = input.trim();

 // Check for malicious patterns
 const maliciousPatterns = [
 /<script[^>]*>.*?<\/script>/gi,
 /javascript:/gi,
 /on\w+\s*=/gi,
 /<iframe[^>]*>/gi,
 /<object[^>]*>/gi,
 /<embed[^>]*>/gi,
 /eval\s*\(/gi,
 /expression\s*\(/gi
 ];

 // SQL injection patterns
 const sqlPatterns = [
 /('|(\\')|(;)|(\\;)|(--)|(\s)|(\/\*)|(\*\/))/gi,
 /(union|select|insert|delete|update|drop|create|alter|exec|execute)/gi,
 /(\bor\b|\band\b)\s+\w+\s*=\s*\w+/gi
 ];

 // Check for XSS attempts
 for (const pattern of maliciousPatterns) {
 if (pattern.test(input)) {
 result.isValid = false;
 result.errors.push('Input contains potentially malicious content');
 break;
 }
 }

 // Check for SQL injection attempts
 for (const pattern of sqlPatterns) {
 if (pattern.test(input)) {
 result.isValid = false;
 result.errors.push('Input contains potentially malicious content');
 break;
 }
 }

 // Type-specific validation
 switch (type) {
 case 'email':
 if (!isValidEmail(sanitized)) {
 result.isValid = false;
 result.errors.push('Invalid email format');
 }
 break;
 case 'phone':
 if (!isValidPhone(sanitized)) {
 result.isValid = false;
 result.errors.push('Invalid phone format');
 }
 break;
 case 'url':
 if (!isValidUrl(sanitized)) {
 result.isValid = false;
 result.errors.push('Invalid URL format');
 }
 break;
 case 'number':
 if (!isValidNumber(sanitized)) {
 result.isValid = false;
 result.errors.push('Invalid number format');
 }
 break;
 }

 // Remove dangerous content completely for failed validation
 if (!result.isValid) {
 sanitized = sanitized
 .replace(/<script[^>]*>.*?<\/script>/gi, '')
 .replace(/javascript:/gi, '')
 .replace(/on\w+\s*=/gi, '')
 .replace(/<iframe[^>]*>/gi, '')
 .replace(/onclick/gi, '');
 }

 // Sanitize HTML entities
 sanitized = sanitized
 .replace(/&/g, '&amp;')
 .replace(/</g, '&lt;')
 .replace(/>/g, '&gt;')
 .replace(/"/g, '&quot;')
 .replace(/'/g, '&#x27;')
 .replace(/\//g, '&#x2F;');

 result.sanitizedValue = sanitized;
 return result;
}

function isValidEmail(email: string): boolean {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(email) && !/<|>|script/i.test(email);
}

function isValidPhone(phone: string): boolean {
 const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
 return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
}

function isValidUrl(url: string): boolean {
 try {
 new URL(url);
 return !/<|>|script|javascript:/i.test(url);
 } catch {
 return false;
 }
}

function isValidNumber(num: string): boolean {
 return !isNaN(Number(num)) && isFinite(Number(num));
} 