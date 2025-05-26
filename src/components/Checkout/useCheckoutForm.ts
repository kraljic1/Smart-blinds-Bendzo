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
  additionalNotes: ''
};

const initialFormStatus: FormStatus = {
  submitting: false,
  success: false,
  error: null
};

const initialPhoneValidation: PhoneValidation = {
  isValid: true,
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
    if (formData.phoneNumber) {
      const countryCode = getCountryCodeFromDialCode(formData.phoneCode);
      if (countryCode) {
        const validation = validatePhoneNumberRealTime(formData.phoneNumber, countryCode);
        setPhoneValidation({
          isValid: validation.isValid,
          errorMessage: validation.errorMessage || '',
          suggestion: validation.suggestion || ''
        });
      }
    } else {
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