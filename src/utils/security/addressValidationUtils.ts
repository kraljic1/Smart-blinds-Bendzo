import { PLACEHOLDER_PATTERNS, ADDRESS_REGEX } from './validationConstants';

/**
 * Validate address content and structure
 */
export const validateAddressContent = (address: string): { errors: string[]; warnings: string[] } => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check minimum length
  if (address.length < 5) {
    errors.push('Address must be at least 5 characters long');
  }
  
  // Check if address is just numbers (invalid)
  if (/^\d+$/.test(address)) {
    errors.push('Address must include street name, not just a number');
  }
  
  // Check if address contains both letters and numbers (good practice)
  const hasLetters = /[a-zA-ZšđčćžŠĐČĆŽ]/.test(address);
  const hasNumbers = /\d/.test(address);
  
  if (!hasLetters) {
    errors.push('Address must contain street name with letters');
  }
  
  if (!hasNumbers) {
    warnings.push('Address should typically include a house number');
  }
  
  // Check for valid address patterns
  // Should contain at least one space (street name + number)
  if (!address.includes(' ') && hasLetters && hasNumbers) {
    warnings.push('Consider adding a space between street name and number');
  }
  
  return { errors, warnings };
};

/**
 * Validate address format and characters
 */
export const validateAddressFormat = (address: string): string[] => {
  const errors: string[] = [];
  
  // Check for suspicious patterns
  if (/^(.)\1{4,}/.test(address)) {
    errors.push('Address contains too many repeated characters');
  }
  
  // Check for minimum word count (should have at least street name)
  const words = address.split(/\s+/).filter(word => word.length > 0);
  if (words.length < 1) {
    errors.push('Address must contain at least a street name');
  }
  
  // Check for valid characters (letters, numbers, spaces, common punctuation)
  if (!ADDRESS_REGEX.test(address)) {
    errors.push('Address contains invalid characters');
  }
  
  return errors;
};

/**
 * Check for placeholder addresses
 */
export const checkPlaceholderAddress = (address: string): string[] => {
  const warnings: string[] = [];
  
  if (PLACEHOLDER_PATTERNS.some(pattern => pattern.test(address))) {
    warnings.push('Address appears to be a placeholder or test value');
  }
  
  return warnings;
}; 