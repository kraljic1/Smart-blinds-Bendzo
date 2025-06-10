import { useState } from 'react';
import type { FormData } from '../components/Checkout/CheckoutFormTypes';
import { 
  useFieldValidation, 
  useFieldEventHandlers, 
  useFieldStateGetters, 
  useFormValidation,
  type FieldValidationState,
  type UseRealTimeValidationOptions
} from './validation';

export const useRealTimeValidation = (
  formData: FormData,
  options: UseRealTimeValidationOptions = {}
) => {
  const {
    debounceMs = 500,
    validateOnChange = true,
    validateOnBlur = true
  } = options;

  const [fieldStates, setFieldStates] = useState<Record<string, FieldValidationState>>({});

  // Use focused validation hooks
  const { validateField, cleanup } = useFieldValidation({
    formData,
    debounceMs,
    setFieldStates
  });

  const { handleFieldChange, handleFieldBlur } = useFieldEventHandlers({
    validateField,
    validateOnChange,
    validateOnBlur,
    setFieldStates
  });

  const fieldStateGetters = useFieldStateGetters({ fieldStates });

  const { isFormValid } = useFormValidation({
    formData,
    getFieldState: fieldStateGetters.getFieldState
  });

  return {
    handleFieldChange,
    handleFieldBlur,
    ...fieldStateGetters,
    isFormValid,
    cleanup
  };
}; 