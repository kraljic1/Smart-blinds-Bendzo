import { phoneExamples } from '../data/phoneCountryData';

/**
 * Gets an example phone number for a specific country
 * @param countryCode - The ISO country code
 * @returns Example phone number in national format
 */
export const getExamplePhoneNumber = (countryCode: string): string => {
 return phoneExamples[countryCode] || '';
}; 