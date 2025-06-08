export interface CountryCode {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

export type CountryCodeMap = Record<string, string>; 