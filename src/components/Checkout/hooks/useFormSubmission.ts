import { useBasketContext } from '../../../hooks/useBasketContext';
import { FormData, PhoneValidation, PaymentState } from '../CheckoutFormTypes';
import { validateAllFields } from './validation';
import { handleFormSubmission, handlePaymentButtonClick } from './submission';

export const useFormSubmission = (
 formData: FormData,
 phoneValidation: PhoneValidation,
 setError: (error: string) => void,
 setSubmitting: (submitting: boolean) => void,
 setPaymentState: (state: PaymentState) => void
) => {
 const { items, getTotalPrice } = useBasketContext();

 const validateRequiredFields = (): boolean => {
 const validation = validateAllFields(formData, phoneValidation);
 if (!validation.isValid) {
 setError(validation.message || 'Validation failed');
 return false;
 }
 return true;
 };

 const handleSubmit = async (e: React.FormEvent) => {
 console.log('[CHECKOUT] handleSubmit called');
 e.preventDefault();
 
 await handleFormSubmission(
 formData,
 phoneValidation,
 { setError, setSubmitting, setPaymentState },
 { items, getTotalPrice }
 );
 };

 const handlePaymentButtonClickWrapper = (paymentState: PaymentState) => {
 handlePaymentButtonClick(paymentState, () => {
 handleSubmit(new Event('submit') as unknown as React.FormEvent);
 });
 };

 return {
 handleSubmit,
 handlePaymentButtonClick: handlePaymentButtonClickWrapper,
 validateRequiredFields
 };
}; 