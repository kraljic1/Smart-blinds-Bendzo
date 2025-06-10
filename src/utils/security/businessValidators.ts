/**
 * Business Validators
 * Validation functions for business-specific fields and complex validation logic
 */

import DOMPurify from 'dompurify';
import { 
  ValidationResult, 
  MAX_COMPANY_NAME_LENGTH, 
  MAX_NOTES_LENGTH,
  MAX_STRING_LENGTH,
  DANGEROUS_PATTERNS 
} from './types';

// Re-export phone validation from separate module
export { validatePhoneSecure } from './phoneValidation';

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

// Order data validation for security tests
interface OrderItem {
  name?: string;
  price?: number;
  quantity?: number;
}

interface OrderCustomer {
  email?: string;
  fullName?: string;
}

interface OrderData {
  customer?: OrderCustomer;
  items?: OrderItem[];
  totalAmount?: number;
}

export const validateOrderData = (orderData: unknown): ValidationResult => {
  const errors: string[] = [];
  
  if (!orderData || typeof orderData !== 'object') {
    return { isValid: false, errors: ['Order data is required'] };
  }
  
  const order = orderData as OrderData;
  
  // Validate customer
  if (!order.customer) {
    errors.push('Customer information is required');
  } else {
    if (!order.customer.email) {
      errors.push('Customer email is required');
    }
    if (!order.customer.fullName) {
      errors.push('Customer name is required');
    }
  }
  
  // Validate items
  if (!order.items || !Array.isArray(order.items)) {
    errors.push('Order items are required');
  } else if (order.items.length === 0) {
    errors.push('At least one item is required');
  } else {
    // Check for negative prices
    const hasNegativePrice = order.items.some((item: OrderItem) => 
      item.price && item.price < 0
    );
    if (hasNegativePrice) {
      errors.push('Item prices cannot be negative');
    }
  }
  
  // Validate total amount
  if (typeof order.totalAmount !== 'number' || order.totalAmount < 0) {
    errors.push('Valid total amount is required');
  }
  
  // Price manipulation check
  if (order.items && order.totalAmount) {
    const calculatedTotal = order.items.reduce((sum: number, item: OrderItem) => {
      return sum + ((item.price || 0) * (item.quantity || 1));
    }, 0);
    
    if (Math.abs(calculatedTotal - order.totalAmount) > 0.01) {
      errors.push('Total amount does not match calculated sum');
    }
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: JSON.stringify(orderData),
    errors
  };
};

 