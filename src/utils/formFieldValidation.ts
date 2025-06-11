export interface ValidationResult {
 valid: boolean;
 errorMessage: string;
}

// Validation helper functions
const validateName = (value: string, fieldLabel: string): ValidationResult => {
 if (value.length < 2) {
 return { valid: false, errorMessage: `${fieldLabel} mora imati najmanje 2 znakova` };
 }
 if (!/^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/.test(value)) {
 return { valid: false, errorMessage: `${fieldLabel} sadrži neispravne znakove` };
 }
 return { valid: true, errorMessage: '' };
};

const validateEmail = (value: string): ValidationResult => {
 const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
 if (!emailRegex.test(value)) {
 return { valid: false, errorMessage: 'Neispravna email adresa' };
 }
 return { valid: true, errorMessage: '' };
};

const validatePostalCode = (value: string): ValidationResult => {
 if (!/^[0-9]{5}$/.test(value)) {
 return { valid: false, errorMessage: 'Poštanski broj mora imati 5 brojeva' };
 }
 return { valid: true, errorMessage: '' };
};

const validateAddress = (value: string): ValidationResult => {
 if (value.length < 5) {
 return { valid: false, errorMessage: 'Adresa mora imati najmanje 5 znakova' };
 }
 return { valid: true, errorMessage: '' };
};

const validateCompanyName = (value: string): ValidationResult => {
 if (value.length < 2) {
 return { valid: false, errorMessage: 'Naziv tvrtke mora imati najmanje 2 znakova' };
 }
 if (value.length > 100) {
 return { valid: false, errorMessage: 'Naziv tvrtke ne smije biti duži od 100 znakova' };
 }
 return { valid: true, errorMessage: '' };
};

const validateOib = (value: string): ValidationResult => {
 if (!/^[0-9]{11}$/.test(value)) {
 return { valid: false, errorMessage: 'OIB mora imati točno 11 brojeva' };
 }
 
 // Basic OIB validation algorithm (Croatian tax number)
 const digits = value.split('').map(Number);
 let sum = 0;
 for (let i = 0; i < 10; i++) {
 sum += digits[i] * (10 - i);
 }
 const remainder = sum % 11;
 const checkDigit = remainder < 2 ? remainder : 11 - remainder;
 
 if (checkDigit !== digits[10]) {
 return { valid: false, errorMessage: 'Neispravna kontrolna znamenka OIB-a' };
 }
 
 return { valid: true, errorMessage: '' };
};

// Validation registry mapping field names to their validation functions
const validationRegistry: Record<string, (value: string) => ValidationResult> = {
 fullName: (value: string) => validateName(value, 'Ime'),
 email: validateEmail,
 city: (value: string) => validateName(value, 'Grad'),
 postalCode: validatePostalCode,
 address: validateAddress,
 shippingAddress: validateAddress,
 shippingCity: (value: string) => validateName(value, 'Grad'),
 shippingPostalCode: validatePostalCode,
 companyName: validateCompanyName,
 companyOib: validateOib,
};

export const validateFormField = (
 name: string,
 value: string,
 label: string,
 required: boolean
): ValidationResult => {
 // Check if field is required and empty
 if (required && !value.trim()) {
 return { valid: false, errorMessage: `${label} je obavezan` };
 }

 // If field is empty and not required, it's valid
 if (!value.trim()) {
 return { valid: true, errorMessage: '' };
 }

 // Get the appropriate validator for this field
 const validator = validationRegistry[name];
 if (validator) {
 return validator(value);
 }

 // If no specific validator exists, field is valid
 return { valid: true, errorMessage: '' };
}; 