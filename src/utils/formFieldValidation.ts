export interface ValidationResult {
  valid: boolean;
  errorMessage: string;
}

export const validateFormField = (
  name: string,
  value: string,
  label: string,
  required: boolean
): ValidationResult => {
  let errorMessage = '';
  let valid = true;

  // Basic validation based on field name and type
  if (required && !value.trim()) {
    errorMessage = `${label} je obavezan`;
    valid = false;
  } else if (value.trim()) {
    switch (name) {
      case 'fullName':
        if (value.length < 2) {
          errorMessage = 'Ime mora imati najmanje 2 znakova';
          valid = false;
        } else if (!/^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/.test(value)) {
          errorMessage = 'Ime sadrži neispravne znakove';
          valid = false;
        }
        break;
      case 'email': {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Neispravna email adresa';
          valid = false;
        }
        break;
      }
      case 'city':
        if (value.length < 2) {
          errorMessage = 'Grad mora imati najmanje 2 znakova';
          valid = false;
        } else if (!/^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/.test(value)) {
          errorMessage = 'Grad sadrži neispravne znakove';
          valid = false;
        }
        break;
      case 'postalCode':
        if (!/^[0-9]{5}$/.test(value)) {
          errorMessage = 'Poštanski broj mora imati 5 brojeva';
          valid = false;
        }
        break;
      case 'address':
      case 'shippingAddress':
        if (value.length < 5) {
          errorMessage = 'Adresa mora imati najmanje 5 znakova';
          valid = false;
        }
        break;
      case 'shippingCity':
        if (value.length < 2) {
          errorMessage = 'Grad mora imati najmanje 2 znakova';
          valid = false;
        } else if (!/^[a-zA-ZÀ-ÿĀ-žА-я\s\-'.]+$/.test(value)) {
          errorMessage = 'Grad sadrži neispravne znakove';
          valid = false;
        }
        break;
      case 'shippingPostalCode':
        if (!/^[0-9]{5}$/.test(value)) {
          errorMessage = 'Poštanski broj mora imati 5 brojeva';
          valid = false;
        }
        break;
      case 'companyName':
        if (value.length < 2) {
          errorMessage = 'Naziv tvrtke mora imati najmanje 2 znakova';
          valid = false;
        } else if (value.length > 100) {
          errorMessage = 'Naziv tvrtke ne smije biti duži od 100 znakova';
          valid = false;
        }
        break;
      case 'companyOib':
        if (!/^[0-9]{11}$/.test(value)) {
          errorMessage = 'OIB mora imati točno 11 brojeva';
          valid = false;
        } else {
          // Basic OIB validation algorithm (Croatian tax number)
          const digits = value.split('').map(Number);
          let sum = 0;
          for (let i = 0; i < 10; i++) {
            sum += digits[i] * (10 - i);
          }
          const remainder = sum % 11;
          const checkDigit = remainder < 2 ? remainder : 11 - remainder;
          if (checkDigit !== digits[10]) {
            errorMessage = 'Neispravna kontrolna znamenka OIB-a';
            valid = false;
          }
        }
        break;
    }
  }

  return { valid, errorMessage };
}; 