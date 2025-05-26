import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';
import { dialCodeToCountry } from '../data/phoneCountryData';

/**
 * Formats phone number for display
 * @param phoneNumber - Phone number to format
 * @param countryCode - Country code for context
 * @param format - 'national' or 'international'
 */
export const formatPhoneNumberDisplay = (
  phoneNumber: string,
  countryCode: string,
  format: 'national' | 'international' = 'national'
): string => {
  try {
    const parsed = parsePhoneNumber(phoneNumber, countryCode as CountryCode);
    if (!parsed || !parsed.isValid()) return phoneNumber;
    
    return format === 'national' 
      ? parsed.formatNational() 
      : parsed.formatInternational();
  } catch {
    return phoneNumber;
  }
};

/**
 * Gets country code from dial code
 * @param dialCode - The dial code (e.g., '+385', '+1', '+44')
 * @returns ISO country code or null if not found
 */
export const getCountryCodeFromDialCode = (dialCode: string): string | null => {
  return dialCodeToCountry[dialCode] || null;
}; 