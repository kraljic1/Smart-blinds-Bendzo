/**
 * Comprehensive Validation
 * Orchestrates all validators for complete form validation
 */

import { validateEmail, validateName } from './fieldValidators';
import { validateAddress, validateCity, validatePostalCode } from './basicValidators';
import { validateCompanyName, validateOIB, validateNotes } from './businessValidators';
import { validatePhoneSecure } from './phoneValidation';
import { FormDataForValidation, ComprehensiveValidationResult } from './types';

// Comprehensive form validation
export const validateFormData = (formData: FormDataForValidation): ComprehensiveValidationResult => {
 const errors: Record<string, string[]> = {};
 const sanitizedData: FormDataForValidation = {};
 
 // Validate each field
 const validations = [
 { field: 'fullName', validator: (value: string) => validateName(value, 'Full name') },
 { field: 'email', validator: validateEmail },
 { field: 'phoneNumber', validator: (value: string) => validatePhoneSecure(value, formData.phoneCode as string || 'HR') },
 { field: 'address', validator: (value: string) => validateAddress(value, 'Address') },
 { field: 'city', validator: validateCity },
 { field: 'postalCode', validator: validatePostalCode },
 { field: 'additionalNotes', validator: validateNotes }
 ];
 
 // Add shipping address validation if different from billing
 if (!formData.sameAsBilling) {
 validations.push(
 { field: 'shippingAddress', validator: (value: string) => validateAddress(value, 'Shipping address') },
 { field: 'shippingCity', validator: validateCity },
 { field: 'shippingPostalCode', validator: validatePostalCode }
 );
 }
 
 // Add company validation if R1 invoice is requested
 if (formData.needsR1Invoice) {
 validations.push(
 { field: 'companyName', validator: validateCompanyName },
 { field: 'companyOib', validator: validateOIB }
 );
 }
 
 // Run validations
 for (const { field, validator } of validations) {
 const value = formData[field] as string;
 const result = validator(value);
 
 if (!result.isValid) {
 errors[field] = result.errors;
 } else {
 sanitizedData[field] = result.sanitizedValue;
 }
 }
 
 // Copy non-validated fields
 const validatedFields = validations.map(v => v.field);
 for (const [key, value] of Object.entries(formData)) {
 if (!validatedFields.includes(key)) {
 sanitizedData[key] = value;
 }
 }
 
 return {
 isValid: Object.keys(errors).length === 0,
 errors,
 sanitizedData
 };
}; 