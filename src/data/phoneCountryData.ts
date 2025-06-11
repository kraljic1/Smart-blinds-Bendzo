/**
 * Country-specific phone data
 * Contains dial codes, country names, and example phone numbers
 */

export interface CountryPhoneData {
 dialCode: string;
 countryCode: string;
 countryName: string;
 exampleNumber: string;
}

/**
 * Mapping of dial codes to country codes
 */
export const dialCodeToCountry: { [key: string]: string } = {
 '+385': 'HR', // Croatia
 '+355': 'AL', // Albania
 '+376': 'AD', // Andorra
 '+43': 'AT', // Austria
 '+375': 'BY', // Belarus
 '+32': 'BE', // Belgium
 '+387': 'BA', // Bosnia and Herzegovina
 '+359': 'BG', // Bulgaria
 '+357': 'CY', // Cyprus
 '+420': 'CZ', // Czech Republic
 '+45': 'DK', // Denmark
 '+372': 'EE', // Estonia
 '+298': 'FO', // Faroe Islands
 '+358': 'FI', // Finland
 '+33': 'FR', // France
 '+995': 'GE', // Georgia
 '+49': 'DE', // Germany
 '+350': 'GI', // Gibraltar
 '+30': 'GR', // Greece
 '+36': 'HU', // Hungary
 '+354': 'IS', // Iceland
 '+353': 'IE', // Ireland
 '+39': 'IT', // Italy
 '+371': 'LV', // Latvia
 '+423': 'LI', // Liechtenstein
 '+370': 'LT', // Lithuania
 '+352': 'LU', // Luxembourg
 '+356': 'MT', // Malta
 '+373': 'MD', // Moldova
 '+377': 'MC', // Monaco
 '+382': 'ME', // Montenegro
 '+31': 'NL', // Netherlands
 '+389': 'MK', // North Macedonia
 '+47': 'NO', // Norway
 '+48': 'PL', // Poland
 '+351': 'PT', // Portugal
 '+40': 'RO', // Romania
 '+7': 'RU', // Russia
 '+378': 'SM', // San Marino
 '+966': 'SA', // Saudi Arabia
 '+381': 'RS', // Serbia
 '+421': 'SK', // Slovakia
 '+386': 'SI', // Slovenia
 '+34': 'ES', // Spain
 '+46': 'SE', // Sweden
 '+41': 'CH', // Switzerland
 '+380': 'UA', // Ukraine
 '+44': 'GB', // United Kingdom
 '+1': 'US', // United States (default for +1)
 '+93': 'AF', // Afghanistan
 '+213': 'DZ', // Algeria
 '+244': 'AO', // Angola
 '+54': 'AR', // Argentina
 '+374': 'AM', // Armenia
 '+61': 'AU', // Australia
 '+994': 'AZ', // Azerbaijan
 '+1242': 'BS', // Bahamas
 '+973': 'BH', // Bahrain
 '+880': 'BD', // Bangladesh
 '+501': 'BZ', // Belize
 '+55': 'BR', // Brazil
 '+56': 'CL', // Chile
 '+86': 'CN', // China
 '+57': 'CO', // Colombia
 '+593': 'EC', // Ecuador
 '+20': 'EG', // Egypt
 '+852': 'HK', // Hong Kong
 '+91': 'IN', // India
 '+62': 'ID', // Indonesia
 '+98': 'IR', // Iran
 '+964': 'IQ', // Iraq
 '+972': 'IL', // Israel
 '+81': 'JP', // Japan
 '+962': 'JO', // Jordan
 '+254': 'KE', // Kenya
 '+965': 'KW', // Kuwait
 '+961': 'LB', // Lebanon
 '+218': 'LY', // Libya
 '+60': 'MY', // Malaysia
 '+52': 'MX', // Mexico
 '+976': 'MN', // Mongolia
 '+212': 'MA', // Morocco
 '+64': 'NZ', // New Zealand
 '+234': 'NG', // Nigeria
 '+92': 'PK', // Pakistan
 '+507': 'PA', // Panama
 '+51': 'PE', // Peru
 '+63': 'PH', // Philippines
 '+974': 'QA', // Qatar
 '+65': 'SG', // Singapore
 '+27': 'ZA', // South Africa
 '+82': 'KR', // South Korea
 '+886': 'TW', // Taiwan
 '+66': 'TH', // Thailand
 '+90': 'TR', // Turkey
 '+971': 'AE', // United Arab Emirates
 '+598': 'UY', // Uruguay
 '+998': 'UZ', // Uzbekistan
 '+58': 'VE', // Venezuela
 '+84': 'VN', // Vietnam
 '+967': 'YE' // Yemen
};

/**
 * Country names mapping
 */
export const countryNames: { [key: string]: string } = {
 'HR': 'Croatia',
 'US': 'United States',
 'GB': 'United Kingdom',
 'DE': 'Germany',
 'FR': 'France',
 'IT': 'Italy',
 'ES': 'Spain',
 'AT': 'Austria',
 'CH': 'Switzerland',
 'NL': 'Netherlands',
 'BE': 'Belgium',
 'PL': 'Poland',
 'CZ': 'Czech Republic',
 'SK': 'Slovakia',
 'SI': 'Slovenia',
 'HU': 'Hungary',
 'RO': 'Romania',
 'BG': 'Bulgaria',
 'RS': 'Serbia',
 'BA': 'Bosnia and Herzegovina',
 'ME': 'Montenegro',
 'MK': 'North Macedonia',
 'AL': 'Albania'
};

/**
 * Example phone numbers for each country
 */
export const phoneExamples: { [key: string]: string } = {
 'HR': '099 123 4567',
 'US': '(555) 123-4567',
 'GB': '07700 900123',
 'DE': '030 12345678',
 'FR': '01 23 45 67 89',
 'IT': '02 1234 5678',
 'ES': '91 123 45 67',
 'AT': '0664 123456',
 'CH': '079 123 45 67',
 'NL': '06 12345678',
 'BE': '0470 12 34 56',
 'PL': '512 345 678',
 'CZ': '601 123 456',
 'SK': '0905 123 456',
 'SI': '031 234 567',
 'HU': '06 30 123 4567',
 'RO': '0721 123 456',
 'BG': '087 123 4567',
 'RS': '064 123456',
 'BA': '061 123 456',
 'ME': '067 123 456',
 'MK': '070 123 456',
 'AL': '069 123 4567'
}; 