/**
 * Validation Constants
 * Common constants used across validation functions
 */

// Valid TLDs for email validation
export const VALID_TLDS = [
 // Generic TLDs
 'com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'info', 'biz', 'name', 'pro',
 // Country code TLDs (common ones)
 'hr', 'us', 'uk', 'de', 'fr', 'it', 'es', 'nl', 'be', 'ch', 'at', 'se', 'no', 'dk', 'fi',
 'pl', 'cz', 'sk', 'hu', 'si', 'rs', 'ba', 'me', 'mk', 'bg', 'ro', 'gr', 'cy', 'mt',
 'ie', 'pt', 'lu', 'li', 'is', 'ee', 'lv', 'lt', 'ru', 'ua', 'by', 'md', 'ge', 'am', 'az',
 'ca', 'mx', 'br', 'ar', 'cl', 'co', 've', 'pe', 'ec', 'uy', 'py', 'bo', 'gf', 'sr', 'gy',
 'au', 'nz', 'jp', 'kr', 'cn', 'hk', 'tw', 'sg', 'my', 'th', 'vn', 'ph', 'id', 'in', 'pk',
 'bd', 'lk', 'np', 'bt', 'mv', 'af', 'ir', 'iq', 'sy', 'lb', 'jo', 'il', 'ps', 'sa', 'ae',
 'om', 'ye', 'kw', 'qa', 'bh', 'tr', 'eg', 'ly', 'tn', 'dz', 'ma', 'za', 'ng', 'ke', 'et',
 'gh', 'ug', 'tz', 'mz', 'mg', 'mu', 'sc', 'zm', 'zw', 'bw', 'na', 'sz', 'ls', 'mw', 'rw',
 // New generic TLDs (popular ones)
 'app', 'dev', 'tech', 'online', 'store', 'shop', 'blog', 'news', 'media', 'design',
 'agency', 'company', 'business', 'services', 'solutions', 'consulting', 'marketing',
 'digital', 'web', 'site', 'website', 'email', 'cloud', 'ai', 'io', 'co', 'me', 'tv'
];

// Fake domains for email validation
export const FAKE_DOMAINS = ['aaaa', 'bbbb', 'cccc', 'dddd', 'test', 'example'];

// Suspicious domains for email validation
export const SUSPICIOUS_DOMAINS = ['tempmail', '10minutemail', 'guerrillamail', 'mailinator'];

// Placeholder patterns for address validation
export const PLACEHOLDER_PATTERNS = [
 /^test/i,
 /^example/i,
 /^sample/i,
 /^dummy/i,
 /^fake/i,
 /^placeholder/i
];

// Regular expressions
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const NAME_REGEX = /^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/;
export const ADDRESS_REGEX = /^[a-zA-ZšđčćžŠĐČĆŽ0-9\s.,-/\\]+$/; 