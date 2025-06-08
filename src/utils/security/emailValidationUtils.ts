import { VALID_TLDS, FAKE_DOMAINS, SUSPICIOUS_DOMAINS } from './validationConstants';

/**
 * Validate email domain parts
 */
export const validateEmailDomain = (domainPart: string): { errors: string[]; warnings: string[] } => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const domainParts = domainPart.split('.');
  
  // Must have at least one dot in domain
  if (domainParts.length < 2) {
    errors.push('Email domain must contain at least one dot');
    return { errors, warnings };
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
  } else if (!VALID_TLDS.includes(tld.toLowerCase())) {
    errors.push('Email must end with a valid domain extension (e.g., .com, .hr, .org)');
  }
  
  // Check for obviously fake domains
  if (FAKE_DOMAINS.some(fake => domainPart.includes(fake))) {
    warnings.push('Email domain appears to be a test or placeholder address');
  }
  
  return { errors, warnings };
};

/**
 * Check for suspicious email domains
 */
export const checkSuspiciousDomains = (email: string): string[] => {
  const warnings: string[] = [];
  const domain = email.split('@')[1];
  
  if (domain && SUSPICIOUS_DOMAINS.some(suspicious => domain.includes(suspicious))) {
    warnings.push('Temporary email domain detected');
  }
  
  return warnings;
};

/**
 * Validate email local part (before @)
 */
export const validateEmailLocalPart = (localPart: string): string[] => {
  const errors: string[] = [];
  
  if (localPart.length < 2) {
    errors.push('Email address is too short');
  }
  
  return errors;
}; 