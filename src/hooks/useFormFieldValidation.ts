import { useState, useEffect, useCallback } from 'react';
import { validateFormField } from '../utils/formFieldValidation';

export const useFormFieldValidation = (
  name: string,
  value: string,
  label: string,
  required: boolean,
  validateOnChange: boolean,
  validateOnBlur: boolean
) => {
  const [touched, setTouched] = useState(false);
  const [internalError, setInternalError] = useState<string>('');

  const validateField = useCallback((fieldValue: string, shouldSetTouched = false) => {
    if (shouldSetTouched) {
      setTouched(true);
    }

    // Only validate if field is touched or has a value
    if (!touched && !fieldValue && !shouldSetTouched) {
      return;
    }

    const result = validateFormField(name, fieldValue, label, required);
    setInternalError(result.errorMessage);
    return result;
  }, [name, label, required, touched]);

  // Validate on value change
  useEffect(() => {
    if (validateOnChange && touched) {
      const timeoutId = setTimeout(() => {
        validateField(value);
      }, 300); // Debounce validation

      return () => clearTimeout(timeoutId);
    }
  }, [value, validateOnChange, touched, validateField]);

  const handleBlur = () => {
    if (validateOnBlur) {
      validateField(value, true);
    }
  };

  const handleTouch = () => {
    if (!touched) {
      setTouched(true);
    }
  };

  return {
    touched,
    internalError,
    handleBlur,
    handleTouch,
    validateField
  };
}; 