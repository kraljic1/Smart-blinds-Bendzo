import { useCallback } from 'react';
import type { FieldValidationState } from './types';

interface UseFieldEventHandlersProps {
  validateField: (fieldName: string, value: unknown, immediate?: boolean) => void;
  validateOnChange: boolean;
  validateOnBlur: boolean;
  setFieldStates: React.Dispatch<React.SetStateAction<Record<string, FieldValidationState>>>;
}

export const useFieldEventHandlers = ({
  validateField,
  validateOnChange,
  validateOnBlur,
  setFieldStates
}: UseFieldEventHandlersProps) => {
  
  // Handle field change
  const handleFieldChange = useCallback((fieldName: string, value: unknown) => {
    if (validateOnChange) {
      validateField(fieldName, value, false);
    }
  }, [validateField, validateOnChange]);

  // Handle field blur
  const handleFieldBlur = useCallback((fieldName: string, value: unknown) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], touched: true }
    }));

    if (validateOnBlur) {
      validateField(fieldName, value, true);
    }
  }, [validateField, validateOnBlur, setFieldStates]);

  return {
    handleFieldChange,
    handleFieldBlur
  };
}; 