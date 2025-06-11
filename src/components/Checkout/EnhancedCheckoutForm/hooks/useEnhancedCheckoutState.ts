import { useEffect } from 'react';
import { useBasketContext } from '../../../../hooks/useBasketContext';
import { getShippingCost } from '../../../../utils/shippingCosts';
import { useCheckoutForm } from '../../useCheckoutForm';
import { usePaymentHandling } from '../../hooks/usePaymentHandling';
import { usePaymentState } from '../../hooks/usePaymentState';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import { useRealTimeValidation } from '../../../../hooks/useRealTimeValidation';

export const useEnhancedCheckoutState = () => {
 console.log('[CHECKOUT] EnhancedCheckoutForm component mounted');
 
 const { getTotalPrice } = useBasketContext();
 
 const checkoutFormHooks = useCheckoutForm();
 const { formData, formStatus, phoneValidation, handleChange, setError, setSubmitting } = checkoutFormHooks;
 
 const calculateTotalWithShipping = () => {
 const subtotal = getTotalPrice();
 const shippingCost = getShippingCost(formData.shippingMethod || 'Standard delivery');
 return subtotal + shippingCost;
 };

 const validationHooks = useRealTimeValidation(formData, {
 debounceMs: 500,
 validateOnChange: true,
 validateOnBlur: true
 });

 useEffect(() => {
 return validationHooks.cleanup;
 }, [validationHooks.cleanup]);

 const paymentStateHooks = usePaymentState();
 const paymentHandlingHooks = usePaymentHandling(formData, setError, setSubmitting);
 const formSubmissionHooks = useFormSubmission(
 formData,
 phoneValidation,
 setError,
 setSubmitting,
 paymentStateHooks.updatePaymentState
 );

 return {
 formData,
 formStatus,
 phoneValidation,
 handleChange,
 setError,
 calculateTotalWithShipping,
 validationHooks,
 paymentStateHooks,
 paymentHandlingHooks,
 formSubmissionHooks
 };
}; 