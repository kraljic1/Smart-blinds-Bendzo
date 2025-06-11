import { validateCity, validatePostalCode } from '../../securityValidation';
import { validateAddress } from '../../security/fieldValidators';
import type { FieldValidator } from '../types/validatorTypes';

export const addressValidator: FieldValidator = (value) => {
 return validateAddress(value as string);
};

export const shippingAddressValidator: FieldValidator = (value) => {
 return validateAddress(value as string);
};

export const cityValidator: FieldValidator = (value) => {
 return validateCity(value as string);
};

export const shippingCityValidator: FieldValidator = (value) => {
 return validateCity(value as string);
};

export const postalCodeValidator: FieldValidator = (value) => {
 return validatePostalCode(value as string);
};

export const shippingPostalCodeValidator: FieldValidator = (value) => {
 return validatePostalCode(value as string);
}; 