/**
 * Re-exports for backward compatibility
 * This file now serves as a central export point for all phone-related utilities
 */

// Export types
export type { PhoneValidationResult } from './phoneValidators';

// Export validation functions
export { 
  validatePhoneNumber, 
  validatePhoneNumberRealTime 
} from './phoneValidators';

// Export formatting functions
export { 
  formatPhoneNumberDisplay, 
  getCountryCodeFromDialCode 
} from './phoneFormatters';

// Export example functions
export { getExamplePhoneNumber } from './phoneExamples'; 