import { 
  validateEmail, 
  validateName, 
  validateCompanyName, 
  validateOIB, 
  validateNotes
} from '../../securityValidation';
import type { FieldValidator } from '../types/validatorTypes';

export const emailValidator: FieldValidator = (value) => {
  return validateEmail(value as string);
};

export const fullNameValidator: FieldValidator = (value) => {
  return validateName(value as string, 'Full name');
};

export const companyNameValidator: FieldValidator = (value) => {
  return validateCompanyName(value as string);
};

export const companyOibValidator: FieldValidator = (value) => {
  return validateOIB(value as string);
};

export const additionalNotesValidator: FieldValidator = (value) => {
  return validateNotes(value as string);
}; 