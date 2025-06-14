import { useState, useEffect } from 'react';
import { FormData, FormStatus, PhoneValidation, PaymentState } from './CheckoutFormTypes';
import { validatePhoneNumberRealTime, getCountryCodeFromDialCode } from '../../utils/phoneValidation';

const initialFormData: FormData = {
 fullName: '',
 email: '',
 phoneCode: '+385',
 phoneNumber: '',
 address: '',
 city: '',
 postalCode: '',
 shippingAddress: '',
 shippingCity: '',
 shippingPostalCode: '',
 sameAsBilling: true,
 paymentMethod: 'credit_card',
 shippingMethod: 'Standard delivery',
 additionalNotes: '',
 needsR1Invoice: false,
 companyName: '',
 companyOib: ''
};

const initialFormStatus: FormStatus = {
 submitting: false,
 success: false,
 error: null
};

const initialPhoneValidation: PhoneValidation = {
 isValid: true, // Allow empty phone initially
 errorMessage: '',
 suggestion: ''
};

const initialPaymentState: PaymentState = {
 clientSecret: '',
 paymentIntentId: '',
 showStripeForm: false,
 processingPayment: false
};

export const useCheckoutForm = () => {
 const [formData, setFormData] = useState<FormData>(initialFormData);
 const [formStatus, setFormStatus] = useState<FormStatus>(initialFormStatus);
 const [phoneValidation, setPhoneValidation] = useState<PhoneValidation>(initialPhoneValidation);
 const [paymentState, setPaymentState] = useState<PaymentState>(initialPaymentState);

 // Phone validation effect
 useEffect(() => {
 console.log('Phone validation effect triggered:', { phoneNumber: formData.phoneNumber, phoneCode: formData.phoneCode });
 if (formData.phoneNumber) {
 const countryCode = getCountryCodeFromDialCode(formData.phoneCode);
 console.log('Country code from dial code:', countryCode);
 if (countryCode) {
 const validation = validatePhoneNumberRealTime(formData.phoneNumber, countryCode);
 console.log('Phone validation result:', validation);
 setPhoneValidation({
 isValid: validation.isValid,
 errorMessage: validation.errorMessage || '',
 suggestion: validation.suggestion || ''
 });
 }
 } else {
 console.log('No phone number, setting initial validation');
 setPhoneValidation(initialPhoneValidation);
 }
 }, [formData.phoneNumber, formData.phoneCode]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
 const { name, value, type } = e.target;
 
 setFormData(prev => ({
 ...prev,
 [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
 }));
 };

 const resetForm = () => {
 setFormData(initialFormData);
 setFormStatus(initialFormStatus);
 setPhoneValidation(initialPhoneValidation);
 setPaymentState(initialPaymentState);
 };

 const setError = (error: string) => {
 setFormStatus(prev => ({ ...prev, error, submitting: false }));
 };

 const setSubmitting = (submitting: boolean) => {
 setFormStatus(prev => ({ ...prev, submitting, error: null }));
 };

 const setSuccess = (success: boolean) => {
 setFormStatus(prev => ({ ...prev, success, submitting: false }));
 };

 return {
 formData,
 formStatus,
 phoneValidation,
 paymentState,
 handleChange,
 resetForm,
 setError,
 setSubmitting,
 setSuccess,
 setPaymentState
 };
}; 