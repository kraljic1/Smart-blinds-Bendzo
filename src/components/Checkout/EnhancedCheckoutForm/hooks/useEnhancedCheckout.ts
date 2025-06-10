import { useEnhancedCheckoutState } from './useEnhancedCheckoutState';
import { useEnhancedFormHandlers } from './useEnhancedFormHandlers';

export const useEnhancedCheckout = () => {
  const state = useEnhancedCheckoutState();
  
  const handlers = useEnhancedFormHandlers({
    handleChange: state.handleChange,
    handleFieldChange: state.validationHooks.handleFieldChange,
    handleFieldBlur: state.validationHooks.handleFieldBlur,
    handleSubmit: state.formSubmissionHooks.handleSubmit,
    handlePaymentButtonClick: state.formSubmissionHooks.handlePaymentButtonClick,
    isFormValid: state.validationHooks.isFormValid,
    setError: state.setError
  });

  return {
    ...state,
    ...handlers
  };
}; 