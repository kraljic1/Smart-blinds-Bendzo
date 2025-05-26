import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';
import { countryNames } from '../data/phoneCountryData';
import { getExamplePhoneNumber } from './phoneExamples';

export interface PhoneValidationResult {
  isValid: boolean;
  formattedNumber?: string;
  errorMessage?: string;
  nationalFormat?: string;
  internationalFormat?: string;
}

/**
 * Validates a phone number for a specific country
 * @param phoneNumber - The phone number to validate (without country code)
 * @param countryCode - The ISO country code (e.g., 'HR', 'US', 'DE')
 * @returns PhoneValidationResult object with validation details
 */
export const validatePhoneNumber = (
  phoneNumber: string, 
  countryCode: string
): PhoneValidationResult => {
  try {
    // Remove any non-digit characters except + and spaces
    const cleanNumber = phoneNumber.replace(/[^\d\s+()-]/g, '');
    
    if (!cleanNumber || cleanNumber.length === 0) {
      return {
        isValid: false,
        errorMessage: 'Please enter a phone number'
      };
    }

    // Parse the phone number with the country context
    const parsed = parsePhoneNumber(cleanNumber, countryCode as CountryCode);
    
    if (!parsed) {
      return {
        isValid: false,
        errorMessage: `Invalid phone number format for ${getCountryName(countryCode)}`
      };
    }

    // Check if the number is valid
    const isValid = parsed.isValid();
    
    if (!isValid) {
      return {
        isValid: false,
        errorMessage: `Invalid phone number format for ${getCountryName(countryCode)}`
      };
    }

    return {
      isValid: true,
      formattedNumber: parsed.number,
      nationalFormat: parsed.formatNational(),
      internationalFormat: parsed.formatInternational()
    };

  } catch {
    return {
      isValid: false,
      errorMessage: `Invalid phone number format for ${getCountryName(countryCode)}`
    };
  }
};

/**
 * Validates phone number format in real-time as user types
 * @param phoneNumber - Current phone number input
 * @param countryCode - Selected country code
 * @returns Validation result with suggestions
 */
export const validatePhoneNumberRealTime = (
  phoneNumber: string,
  countryCode: string
): PhoneValidationResult & { suggestion?: string } => {
  const result = validatePhoneNumber(phoneNumber, countryCode);
  
  // If invalid and number is not empty, provide example
  if (!result.isValid && phoneNumber.length > 0) {
    const example = getExamplePhoneNumber(countryCode);
    if (example) {
      return {
        ...result,
        suggestion: `Example: ${example}`
      };
    }
  }
  
  return result;
};

/**
 * Helper function to get country name from code
 */
const getCountryName = (countryCode: string): string => {
  return countryNames[countryCode] || countryCode;
}; 