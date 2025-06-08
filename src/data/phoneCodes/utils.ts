import { CountryCode } from './types';
import { countryPhoneCodes } from './data';
import { examplePhoneNumbers } from './exampleNumbers';

/**
 * Get country code from dial code
 * @param dialCode - The dial code (e.g., "+385")
 * @returns The country code or null if not found
 */
export const getCountryCodeFromDialCode = (dialCode: string): string | null => {
  const country = countryPhoneCodes.find((country: CountryCode) => country.dial_code === dialCode);
  return country ? country.code : null;
};

/**
 * Get example phone number for a country
 * @param countryCode - The country code (e.g., "HR")
 * @returns An example phone number or null if not found
 */
export const getExamplePhoneNumber = (countryCode: string): string | null => {
  return examplePhoneNumbers[countryCode] || null;
};

/**
 * Get country information by country code
 * @param countryCode - The country code (e.g., "HR")
 * @returns The country information or null if not found
 */
export const getCountryByCode = (countryCode: string): CountryCode | null => {
  return countryPhoneCodes.find((country: CountryCode) => country.code === countryCode) || null;
};

/**
 * Get country information by dial code
 * @param dialCode - The dial code (e.g., "+385")
 * @returns The country information or null if not found
 */
export const getCountryByDialCode = (dialCode: string): CountryCode | null => {
  return countryPhoneCodes.find((country: CountryCode) => country.dial_code === dialCode) || null;
};

/**
 * Search countries by name
 * @param searchTerm - The search term
 * @returns Array of matching countries
 */
export const searchCountriesByName = (searchTerm: string): CountryCode[] => {
  const term = searchTerm.toLowerCase();
  return countryPhoneCodes.filter((country: CountryCode) => 
    country.name.toLowerCase().includes(term)
  );
}; 