import type { ValidatorConfig } from '../types/validatorTypes';
import { 
  emailValidator, 
  fullNameValidator, 
  companyNameValidator, 
  companyOibValidator, 
  additionalNotesValidator 
} from '../validators/basicValidators';
import { 
  addressValidator, 
  shippingAddressValidator, 
  cityValidator, 
  shippingCityValidator, 
  postalCodeValidator, 
  shippingPostalCodeValidator 
} from '../validators/addressValidators';
import { phoneNumberValidator } from '../validators/phoneValidator';

export const fieldValidatorConfig: ValidatorConfig = {
  email: emailValidator,
  fullName: fullNameValidator,
  companyName: companyNameValidator,
  address: addressValidator,
  shippingAddress: shippingAddressValidator,
  city: cityValidator,
  shippingCity: shippingCityValidator,
  postalCode: postalCodeValidator,
  shippingPostalCode: shippingPostalCodeValidator,
  companyOib: companyOibValidator,
  additionalNotes: additionalNotesValidator,
  phoneNumber: phoneNumberValidator
}; 