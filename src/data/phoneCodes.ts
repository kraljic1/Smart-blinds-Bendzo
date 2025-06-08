/**
 * @deprecated This file has been restructured into smaller modules.
 * Please import from './phoneCodes/index' instead.
 * 
 * This file now serves as a compatibility layer for existing imports.
 */

// Re-export everything from the new modular structure
export type { CountryCode, CountryCodeMap } from './phoneCodes/types';
export {
  countryPhoneCodes,
  croatiaPhoneCode,
  europeanPhoneCodes,
  restOfWorldPhoneCodes,
  examplePhoneNumbers,
  getCountryCodeFromDialCode,
  getExamplePhoneNumber,
  getCountryByCode,
  getCountryByDialCode,
  searchCountriesByName,
} from './phoneCodes/index'; 