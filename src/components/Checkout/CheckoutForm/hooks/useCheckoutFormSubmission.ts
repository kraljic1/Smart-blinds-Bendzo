import { useRef } from 'react';
import { useCheckoutForm } from '../../../../hooks/useCheckoutForm';

export const useCheckoutFormSubmission = () => {
 const formRef = useRef<HTMLFormElement>(null);
 const {
 formData,
 formStatus,
 items,
 getTotalPrice,
 handleChange,
 setFormStatus,
 prepareFormSubmission,
 handleSubmitSuccess,
 handleSubmitError
 } = useCheckoutForm();

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 
 if (items.length === 0) {
 setFormStatus({
 submitting: false,
 success: false,
 error:"Please add some products to your basket before checking out."
 });
 return;
 }
 
 setFormStatus({ submitting: true, success: false, error: null });
 
 try {
 const formSubmission = prepareFormSubmission();
 console.log('Submitting form data:', formSubmission);
 
 if (formRef.current) {
 formRef.current.submit();
 handleSubmitSuccess();
 }
 } catch (error) {
 handleSubmitError(error);
 }
 };

 return {
 formRef,
 formData,
 formStatus,
 items,
 getTotalPrice,
 handleChange,
 handleSubmit
 };
}; 