import { useCheckoutForm } from '../useCheckoutForm';
import { useBasketContext } from '../../../hooks/useBasketContext';
import { getShippingCost } from '../../../utils/shippingCosts';
import { usePaymentHandling } from './usePaymentHandling';
import { usePaymentState } from './usePaymentState';
import { useFormSubmission } from './useFormSubmission';

/**
 * Custom hook that manages all checkout-related state and logic
 * Combines form state, payment state, and submission handling
 */
export const useCheckoutState = () => {
 const {
 formData,
 formStatus,
 phoneValidation,
 handleChange,
 setError,
 setSubmitting
 } = useCheckoutForm();

 const { getTotalPrice } = useBasketContext();
 
 // Calculate total including shipping
 const calculateTotalWithShipping = () => {
 const subtotal = getTotalPrice();
 const shippingCost = getShippingCost(formData.shippingMethod || 'Standard delivery');
 return subtotal + shippingCost;
 };

 const {
 paymentState: stripePaymentState,
 setBrowserInfo,
 handleClosePayment,
 updatePaymentState
 } = usePaymentState();

 const {
 paymentState: handlingState,
 handlePaymentSuccess,
 handlePaymentError,
 handleContinueShopping
 } = usePaymentHandling(formData, setError, setSubmitting);

 const {
 handleSubmit,
 handlePaymentButtonClick
 } = useFormSubmission(
 formData,
 phoneValidation,
 setError,
 setSubmitting,
 updatePaymentState
 );

 const handlePaymentButtonClickWrapper = () => {
 handlePaymentButtonClick(stripePaymentState);
 };

 return {
 // Form state
 formData,
 formStatus,
 phoneValidation,
 handleChange,
 handleSubmit,
 
 // Payment state
 stripePaymentState,
 handlingState,
 calculateTotalWithShipping,
 
 // Event handlers
 handlePaymentButtonClickWrapper,
 handlePaymentSuccess,
 handlePaymentError,
 handleClosePayment,
 setBrowserInfo,
 handleContinueShopping
 };
}; 