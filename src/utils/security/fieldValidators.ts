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
  
  // Enhanced email regex with stricter validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(sanitizedEmail)) {
    errors.push('Invalid email format');
  } else {
    // Additional validation for realistic email addresses
    const [localPart, domainPart] = sanitizedEmail.split('@');
    
    // Check local part (before @)
    if (localPart.length < 2) {
      errors.push('Email address is too short');
    }
    
    // Check domain part (after @)
    if (domainPart) {
      const domainParts = domainPart.split('.');
      
      // Must have at least one dot in domain
      if (domainParts.length < 2) {
        errors.push('Email domain must contain at least one dot');
      }
      
      // Check each domain part
      for (const part of domainParts) {
        if (part.length < 2) {
          errors.push('Email domain parts must be at least 2 characters');
          break;
        }
        
        // Domain parts should contain letters, not just repeated characters
        if (/^(.)\1+$/.test(part)) {
          errors.push('Email domain contains invalid repeated characters');
          break;
        }
      }
      
      // Check for valid TLD (top-level domain)
      const tld = domainParts[domainParts.length - 1];
      if (tld.length < 2 || !/^[a-z]+$/.test(tld)) {
        errors.push('Email must have a valid domain extension');
      } else {
        // Validate against common TLDs
        const validTlds = [
          // Generic TLDs
          'com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'info', 'biz', 'name', 'pro',
          // Country code TLDs (common ones)
          'hr', 'us', 'uk', 'de', 'fr', 'it', 'es', 'nl', 'be', 'ch', 'at', 'se', 'no', 'dk', 'fi',
          'pl', 'cz', 'sk', 'hu', 'si', 'rs', 'ba', 'me', 'mk', 'bg', 'ro', 'gr', 'cy', 'mt',
          'ie', 'pt', 'lu', 'li', 'is', 'ee', 'lv', 'lt', 'ru', 'ua', 'by', 'md', 'ge', 'am', 'az',
          'ca', 'mx', 'br', 'ar', 'cl', 'co', 've', 'pe', 'ec', 'uy', 'py', 'bo', 'gf', 'sr', 'gy',
          'au', 'nz', 'jp', 'kr', 'cn', 'hk', 'tw', 'sg', 'my', 'th', 'vn', 'ph', 'id', 'in', 'pk',
          'bd', 'lk', 'np', 'bt', 'mv', 'af', 'ir', 'iq', 'sy', 'lb', 'jo', 'il', 'ps', 'sa', 'ae',
          'om', 'ye', 'kw', 'qa', 'bh', 'tr', 'eg', 'ly', 'tn', 'dz', 'ma', 'za', 'ng', 'ke', 'et',
          'gh', 'ug', 'tz', 'mz', 'mg', 'mu', 'sc', 'zm', 'zw', 'bw', 'na', 'sz', 'ls', 'mw', 'rw',
          // New generic TLDs (popular ones)
          'app', 'dev', 'tech', 'online', 'store', 'shop', 'blog', 'news', 'media', 'design',
          'agency', 'company', 'business', 'services', 'solutions', 'consulting', 'marketing',
          'digital', 'web', 'site', 'website', 'email', 'cloud', 'ai', 'io', 'co', 'me', 'tv'
        ];
        
        if (!validTlds.includes(tld.toLowerCase())) {
          errors.push('Email must end with a valid domain extension (e.g., .com, .hr, .org)');
        }
      }
      
      // Check for obviously fake domains
      const fakeDomains = ['aaaa', 'bbbb', 'cccc', 'dddd', 'test', 'example'];
      if (fakeDomains.some(fake => domainPart.includes(fake))) {
        warnings.push('Email domain appears to be a test or placeholder address');
      }
    }
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
  
  // Check minimum length
  if (trimmedAddress.length < 5) {
    errors.push('Address must be at least 5 characters long');
  }
  
  // Check if address is just numbers (invalid)
  if (/^\d+$/.test(trimmedAddress)) {
    errors.push('Address must include street name, not just a number');
  }
  
  // Check if address contains both letters and numbers (good practice)
  const hasLetters = /[a-zA-ZšđčćžŠĐČĆŽ]/.test(trimmedAddress);
  const hasNumbers = /\d/.test(trimmedAddress);
  
  if (!hasLetters) {
    errors.push('Address must contain street name with letters');
  }
  
  if (!hasNumbers) {
    warnings.push('Address should typically include a house number');
  }
  
  // Check for valid address patterns
  // Should contain at least one space (street name + number)
  if (!trimmedAddress.includes(' ') && hasLetters && hasNumbers) {
    warnings.push('Consider adding a space between street name and number');
  }
  
  // Check for suspicious patterns
  if (/^(.)\1{4,}/.test(trimmedAddress)) {
    errors.push('Address contains too many repeated characters');
  }
  
  // Check for minimum word count (should have at least street name)
  const words = trimmedAddress.split(/\s+/).filter(word => word.length > 0);
  if (words.length < 1) {
    errors.push('Address must contain at least a street name');
  }
  
  // Check for valid characters (letters, numbers, spaces, common punctuation)
  if (!/^[a-zA-ZšđčćžŠĐČĆŽ0-9\s.,-/\\]+$/.test(trimmedAddress)) {
    errors.push('Address contains invalid characters');
  }
  
  // Check for common placeholder addresses
  const placeholderPatterns = [
    /^test/i,
    /^example/i,
    /^sample/i,
    /^dummy/i,
    /^fake/i,
    /^placeholder/i
  ];
  
  if (placeholderPatterns.some(pattern => pattern.test(trimmedAddress))) {
    warnings.push('Address appears to be a placeholder or test value');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedAddress,
    errors,
    warnings
  };
}; 