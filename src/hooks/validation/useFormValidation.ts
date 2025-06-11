import { useCallback } from 'react';
import type { FormData } from '../../components/Checkout/CheckoutFormTypes';
import type { FieldValidationState } from './types';

interface UseFormValidationProps {
 formData: FormData;
 getFieldState: (fieldName: string) => FieldValidationState;
}

export const useFormValidation = ({ formData, getFieldState }: UseFormValidationProps) => {
 
 // Check if form is valid
 const isFormValid = useCallback(() => {
 const requiredFields = ['fullName', 'email', 'phoneNumber', 'address', 'city', 'postalCode'];
 
 // Add conditional fields
 const fieldsToCheck = [...requiredFields];
 if (!formData.sameAsBilling) {
 fieldsToCheck.push('shippingAddress', 'shippingCity', 'shippingPostalCode');
 }
 if (formData.needsR1Invoice) {
 fieldsToCheck.push('companyName', 'companyOib');
 }

 return fieldsToCheck.every(field => {
 const state = getFieldState(field);
 return state.isValid;
 });
 }, [formData, getFieldState]);

 return {
 isFormValid
 };
}; 