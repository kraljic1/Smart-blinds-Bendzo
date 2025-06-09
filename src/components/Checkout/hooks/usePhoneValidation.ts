import { useMemo } from 'react';

interface PhoneValidation {
  isValid: boolean;
  errorMessage?: string;
  suggestion?: string;
}

interface UsePhoneValidationProps {
  phoneValidation: PhoneValidation;
  phoneNumber: string;
  getFieldError?: (fieldName: string) => string | null;
  hasFieldError?: (fieldName: string) => boolean;
}

interface UsePhoneValidationReturn {
  displayError: string | null;
  hasError: boolean;
  suggestionMessage: string | null;
}

export const usePhoneValidation = ({
  phoneValidation,
  phoneNumber,
  getFieldError,
  hasFieldError
}: UsePhoneValidationProps): UsePhoneValidationReturn => {
  return useMemo(() => {
    const showPhoneError = !phoneValidation.isValid && 
                          phoneValidation.errorMessage && 
                          phoneNumber;
    
    const externalPhoneError = getFieldError ? getFieldError('phoneNumber') : null;
    const hasExternalError = hasFieldError ? hasFieldError('phoneNumber') : false;
    
    const displayError = externalPhoneError || 
                        (showPhoneError ? phoneValidation.errorMessage || null : null);
    
    const hasError = Boolean(hasExternalError || showPhoneError);
    const suggestionMessage = phoneValidation.suggestion || null;

    return {
      displayError,
      hasError,
      suggestionMessage
    };
  }, [phoneValidation, phoneNumber, getFieldError, hasFieldError]);
}; 