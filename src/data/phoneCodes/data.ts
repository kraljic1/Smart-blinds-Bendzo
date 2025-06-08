import { CountryCode } from './types';
import { croatiaPhoneCode } from './croatia';
import { europeanPhoneCodes } from './europe';
import { restOfWorldPhoneCodes } from './restOfWorld';

// Combined country phone codes array (Croatia first, then Europe, then rest of world)
export const countryPhoneCodes: CountryCode[] = [
  croatiaPhoneCode,
  ...europeanPhoneCodes,
  ...restOfWorldPhoneCodes,
]; 