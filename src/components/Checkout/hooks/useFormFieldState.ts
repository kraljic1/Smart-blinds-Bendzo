import { useFormFieldValidation } from '../../../hooks/useFormFieldValidation';

interface UseFormFieldStateProps {
  name: string;
  value: string;
  label: string;
  required: boolean;
  validateOnChange: boolean;
  validateOnBlur: boolean;
  externalError?: string | null;
  externalWarning?: string | null;
  showValidation: boolean;
}

export const useFormFieldState = ({
  name,
  value,
  label,
  required,
  validateOnChange,
  validateOnBlur,
  externalError,
  externalWarning,
  showValidation
}: UseFormFieldStateProps) => {
  const {
    touched,
    internalError,
    handleBlur,
    handleTouch
  } = useFormFieldValidation(
    name,
    value,
    label,
    required,
    validateOnChange,
    validateOnBlur
  );

  // Determine which error to show (external takes precedence)
  const displayError = showValidation ? (externalError || (touched ? internalError : '')) : '';
  const displayWarning = showValidation ? externalWarning : '';
  const hasError = !!displayError;
  const hasWarning = !!displayWarning && !hasError;

  return {
    touched,
    internalError,
    handleBlur,
    handleTouch,
    displayError,
    displayWarning,
    hasError,
    hasWarning
  };
}; 