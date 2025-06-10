import React from 'react';
import CheckoutFormContainer from './CheckoutFormContainer';
import { FormData, FormStatus, PhoneValidation } from '../../CheckoutFormTypes';

interface ValidationHooks {
  shouldShowError: (fieldName: string) => boolean;
  shouldShowSuccess: (fieldName: string) => boolean;
  shouldShowWarning: (fieldName: string) => boolean;
  getFieldError: (fieldName: string) => string | null;
  getFieldWarning: (fieldName: string) => string | null;
  getFieldState: (fieldName: string) => { isValidating: boolean };
  isFormValid: () => boolean;
}

interface CheckoutFormSectionProps {
  formData: FormData;
  formStatus: FormStatus;
  phoneValidation: PhoneValidation;
  handleEnhancedChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleEnhancedBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleEnhancedSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePaymentButtonClickWrapper: () => void;
  validationHooks: ValidationHooks;
}

const CheckoutFormSection = ({
  formData,
  formStatus,
  phoneValidation,
  handleEnhancedChange,
  handleEnhancedBlur,
  handleEnhancedSubmit,
  handlePaymentButtonClickWrapper,
  validationHooks
}: CheckoutFormSectionProps) => {
  return (
    <CheckoutFormContainer
      formData={formData}
      formStatus={formStatus}
      phoneValidation={phoneValidation}
      handleEnhancedChange={handleEnhancedChange}
      handleEnhancedBlur={handleEnhancedBlur}
      handleEnhancedSubmit={handleEnhancedSubmit}
      handlePaymentButtonClickWrapper={handlePaymentButtonClickWrapper}
      shouldShowError={(fieldName: string) => !!validationHooks.shouldShowError(fieldName)}
      shouldShowSuccess={(fieldName: string) => !!validationHooks.shouldShowSuccess(fieldName)}
      shouldShowWarning={(fieldName: string) => !!validationHooks.shouldShowWarning(fieldName)}
      getFieldError={validationHooks.getFieldError}
      getFieldWarning={validationHooks.getFieldWarning}
      getFieldState={validationHooks.getFieldState}
      isFormValid={validationHooks.isFormValid}
    />
  );
};

export default CheckoutFormSection; 