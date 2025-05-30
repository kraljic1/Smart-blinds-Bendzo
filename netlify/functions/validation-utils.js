/**
 * Server-side validation utilities for Netlify functions
 * Provides comprehensive input validation and sanitization
 */

// Security constants
const MAX_STRING_LENGTH = 1000;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MAX_NAME_LENGTH = 100;
const MAX_ADDRESS_LENGTH = 200;
const MAX_NOTES_LENGTH = 2000;
const MAX_COMPANY_NAME_LENGTH = 150;

// Dangerous patterns for security threat detection
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
  'powershell',
  'eval(',
  'function(',
  'setTimeout(',
  'setInterval('
];

/**
 * Basic HTML sanitization (server-side)
 */
const sanitizeHtml = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Security threat detection
 */
const containsSecurityThreats = (input) => {
  if (typeof input !== 'string') return false;
  
  const lowerInput = input.toLowerCase();
  return DANGEROUS_PATTERNS.some(pattern => lowerInput.includes(pattern.toLowerCase()));
};

/**
 * Validate email address
 */
const validateEmail = (email) => {
  const errors = [];
  
  if (!email || typeof email !== 'string') {
    return { isValid: false, errors: ['Email is required'], sanitizedValue: '' };
  }
  
  // Length check
  if (email.length > MAX_EMAIL_LENGTH) {
    errors.push(`Email must be less than ${MAX_EMAIL_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedEmail = sanitizeHtml(email.trim().toLowerCase());
  
  // Security checks
  if (containsSecurityThreats(sanitizedEmail)) {
    errors.push('Email contains potentially malicious content');
  }
  
  // Email regex validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(sanitizedEmail)) {
    errors.push('Invalid email format');
  }
  
  // Check for suspicious patterns
  if (sanitizedEmail.includes('..')) {
    errors.push('Email contains invalid consecutive dots');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedEmail,
    errors
  };
};

/**
 * Validate name fields
 */
const validateName = (name, fieldName = 'Name') => {
  const errors = [];
  
  if (!name || typeof name !== 'string') {
    return { isValid: false, errors: [`${fieldName} is required`], sanitizedValue: '' };
  }
  
  // Length check
  if (name.length > MAX_NAME_LENGTH) {
    errors.push(`${fieldName} must be less than ${MAX_NAME_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedName = sanitizeHtml(name.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedName)) {
    errors.push(`${fieldName} contains potentially malicious content`);
  }
  
  // Name pattern validation
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

/**
 * Validate address fields
 */
const validateAddress = (address, fieldName = 'Address') => {
  const errors = [];
  
  if (!address || typeof address !== 'string') {
    return { isValid: false, errors: [`${fieldName} is required`], sanitizedValue: '' };
  }
  
  // Length check
  if (address.length > MAX_ADDRESS_LENGTH) {
    errors.push(`${fieldName} must be less than ${MAX_ADDRESS_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedAddress = sanitizeHtml(address.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedAddress)) {
    errors.push(`${fieldName} contains potentially malicious content`);
  }
  
  // Address pattern validation
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

/**
 * Validate phone number
 */
const validatePhone = (phone) => {
  const errors = [];
  
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, errors: ['Phone number is required'], sanitizedValue: '' };
  }
  
  // Length check
  if (phone.length > MAX_PHONE_LENGTH) {
    errors.push(`Phone number must be less than ${MAX_PHONE_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedPhone = sanitizeHtml(phone.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedPhone)) {
    errors.push('Phone number contains potentially malicious content');
  }
  
  // Phone pattern validation
  const phoneRegex = /^[\d\s\-()+ ]+$/;
  if (!phoneRegex.test(sanitizedPhone)) {
    errors.push('Phone number contains invalid characters');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: sanitizedPhone,
    errors
  };
};

/**
 * Validate postal code (Croatian format)
 */
const validatePostalCode = (postalCode) => {
  const errors = [];
  
  if (!postalCode || typeof postalCode !== 'string') {
    return { isValid: false, errors: ['Postal code is required'], sanitizedValue: '' };
  }
  
  // Sanitize input
  const sanitizedPostalCode = sanitizeHtml(postalCode.trim());
  
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

/**
 * Validate Croatian OIB
 */
const validateOIB = (oib) => {
  const errors = [];
  
  if (!oib || typeof oib !== 'string') {
    return { isValid: false, errors: ['OIB is required'], sanitizedValue: '' };
  }
  
  // Sanitize input
  const sanitizedOIB = sanitizeHtml(oib.trim());
  
  // Security checks
  if (containsSecurityThreats(sanitizedOIB)) {
    errors.push('OIB contains potentially malicious content');
  }
  
  // OIB format validation (11 digits)
  const oibRegex = /^[0-9]{11}$/;
  if (!oibRegex.test(sanitizedOIB)) {
    errors.push('OIB must be exactly 11 digits');
  }
  
  // OIB checksum validation
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

/**
 * Croatian OIB checksum validation
 */
const validateOIBChecksum = (oib) => {
  if (oib.length !== 11) return false;
  
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(oib[i]) * (10 - i);
  }
  
  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? remainder : 11 - remainder;
  
  return checkDigit === parseInt(oib[10]);
};

/**
 * Validate notes/text fields
 */
const validateNotes = (notes) => {
  const errors = [];
  
  if (!notes) {
    return { isValid: true, sanitizedValue: '', errors: [] };
  }
  
  if (typeof notes !== 'string') {
    return { isValid: false, errors: ['Notes must be text'], sanitizedValue: '' };
  }
  
  // Length check
  if (notes.length > MAX_NOTES_LENGTH) {
    errors.push(`Notes must be less than ${MAX_NOTES_LENGTH} characters`);
  }
  
  // Sanitize input
  const sanitizedNotes = sanitizeHtml(notes.trim());
  
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

/**
 * Validate numeric values
 */
const validateNumeric = (value, fieldName, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const errors = [];
  
  if (value === null || value === undefined) {
    return { isValid: false, errors: [`${fieldName} is required`], sanitizedValue: 0 };
  }
  
  const numValue = Number(value);
  
  if (isNaN(numValue)) {
    errors.push(`${fieldName} must be a valid number`);
  } else {
    if (numValue < min) {
      errors.push(`${fieldName} must be at least ${min}`);
    }
    if (numValue > max) {
      errors.push(`${fieldName} must be at most ${max}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue: numValue,
    errors
  };
};

/**
 * Comprehensive order data validation
 */
const validateOrderData = (orderData) => {
  const errors = {};
  const sanitizedData = {};
  
  // Validate customer data
  if (orderData.customer) {
    const customer = orderData.customer;
    
    // Validate required customer fields
    const nameValidation = validateName(customer.fullName, 'Full name');
    if (!nameValidation.isValid) {
      errors.customerName = nameValidation.errors;
    } else {
      sanitizedData.customer_name = nameValidation.sanitizedValue;
    }
    
    const emailValidation = validateEmail(customer.email);
    if (!emailValidation.isValid) {
      errors.customerEmail = emailValidation.errors;
    } else {
      sanitizedData.customer_email = emailValidation.sanitizedValue;
    }
    
    const phoneValidation = validatePhone(customer.phone);
    if (!phoneValidation.isValid) {
      errors.customerPhone = phoneValidation.errors;
    } else {
      sanitizedData.customer_phone = phoneValidation.sanitizedValue;
    }
    
    const addressValidation = validateAddress(customer.address, 'Billing address');
    if (!addressValidation.isValid) {
      errors.billingAddress = addressValidation.errors;
    } else {
      sanitizedData.billing_address = addressValidation.sanitizedValue;
    }
    
    // Validate shipping address if different
    if (customer.shippingAddress && customer.shippingAddress !== customer.address) {
      const shippingValidation = validateAddress(customer.shippingAddress, 'Shipping address');
      if (!shippingValidation.isValid) {
        errors.shippingAddress = shippingValidation.errors;
      } else {
        sanitizedData.shipping_address = shippingValidation.sanitizedValue;
      }
    } else {
      sanitizedData.shipping_address = sanitizedData.billing_address;
    }
    
    // Validate company data if provided
    if (customer.needsR1Invoice) {
      if (customer.companyName) {
        const companyNameValidation = validateName(customer.companyName, 'Company name');
        if (!companyNameValidation.isValid) {
          errors.companyName = companyNameValidation.errors;
        } else {
          sanitizedData.company_name = companyNameValidation.sanitizedValue;
        }
      }
      
      if (customer.companyOib) {
        const oibValidation = validateOIB(customer.companyOib);
        if (!oibValidation.isValid) {
          errors.companyOib = oibValidation.errors;
        } else {
          sanitizedData.company_oib = oibValidation.sanitizedValue;
        }
      }
    }
  }
  
  // Validate total amount
  if (orderData.totalAmount !== undefined) {
    const amountValidation = validateNumeric(orderData.totalAmount, 'Total amount', 0.01, 999999.99);
    if (!amountValidation.isValid) {
      errors.totalAmount = amountValidation.errors;
    } else {
      sanitizedData.total_amount = amountValidation.sanitizedValue;
    }
  }
  
  // Validate notes
  if (orderData.notes) {
    const notesValidation = validateNotes(orderData.notes);
    if (!notesValidation.isValid) {
      errors.notes = notesValidation.errors;
    } else {
      sanitizedData.notes = notesValidation.sanitizedValue;
    }
  }
  
  // Validate items array
  if (orderData.items && Array.isArray(orderData.items)) {
    const itemErrors = [];
    const sanitizedItems = [];
    
    orderData.items.forEach((item, index) => {
      const itemError = {};
      const sanitizedItem = {};
      
      // Validate product name
      if (item.productName || (item.product && item.product.name)) {
        const productName = item.productName || item.product.name;
        const nameValidation = validateName(productName, 'Product name');
        if (!nameValidation.isValid) {
          itemError.productName = nameValidation.errors;
        } else {
          sanitizedItem.product_name = nameValidation.sanitizedValue;
        }
      }
      
      // Validate quantity
      if (item.quantity !== undefined) {
        const quantityValidation = validateNumeric(item.quantity, 'Quantity', 1, 1000);
        if (!quantityValidation.isValid) {
          itemError.quantity = quantityValidation.errors;
        } else {
          sanitizedItem.quantity = quantityValidation.sanitizedValue;
        }
      }
      
      // Validate price
      if (item.price !== undefined || (item.product && item.product.price !== undefined)) {
        const price = item.price || item.product.price;
        const priceValidation = validateNumeric(price, 'Price', 0.01, 999999.99);
        if (!priceValidation.isValid) {
          itemError.price = priceValidation.errors;
        } else {
          sanitizedItem.unit_price = priceValidation.sanitizedValue;
        }
      }
      
      // Copy other safe fields
      if (item.productId || (item.product && item.product.id)) {
        sanitizedItem.product_id = item.productId || item.product.id;
      }
      
      if (Object.keys(itemError).length > 0) {
        itemErrors[index] = itemError;
      }
      
      sanitizedItems.push(sanitizedItem);
    });
    
    if (itemErrors.length > 0) {
      errors.items = itemErrors;
    } else {
      sanitizedData.items = sanitizedItems;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData
  };
};

/**
 * Rate limiting for server-side requests
 */
class ServerRateLimiter {
  constructor() {
    this.attempts = new Map();
    this.maxAttempts = 10; // 10 attempts per minute
    this.windowMs = 60000; // 1 minute
  }
  
  isAllowed(identifier) {
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
  
  getRemainingAttempts(identifier) {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    return Math.max(0, this.maxAttempts - recentAttempts.length);
  }
}

// Create rate limiter instance
const rateLimiter = new ServerRateLimiter();

// Export functions
module.exports = {
  validateEmail,
  validateName,
  validateAddress,
  validatePhone,
  validatePostalCode,
  validateOIB,
  validateNotes,
  validateNumeric,
  validateOrderData,
  sanitizeHtml,
  containsSecurityThreats,
  rateLimiter
}; 