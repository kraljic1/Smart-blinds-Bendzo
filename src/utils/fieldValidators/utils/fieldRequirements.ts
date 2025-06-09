import type { FormData } from '../../../types/validation';

/**
 * Gets required fields based on form state
 */
export const getRequiredFields = (formData: FormData): string[] => {
  const requiredFields = ['fullName', 'email', 'phoneNumber', 'address', 'city', 'postalCode'];
  
  // Add shipping fields if different from billing
  if (!formData.sameAsBilling) {
    requiredFields.push('shippingAddress', 'shippingCity', 'shippingPostalCode');
  }
  
  // Add company fields if R1 invoice is requested
  if (formData.needsR1Invoice) {
    requiredFields.push('companyName', 'companyOib');
  }
  
  return requiredFields;
};

/**
 * Gets all fields that should be validated (required + optional)
 */
export const getAllValidationFields = (formData: FormData): string[] => {
  const requiredFields = getRequiredFields(formData);
  return [...requiredFields, 'additionalNotes'];
}; 