import React from 'react';
import EnhancedCheckoutFormContent from '../../EnhancedCheckoutFormContent';
import { FormData, FormStatus, PhoneValidation } from '../../CheckoutFormTypes';

interface CheckoutFormContainerProps {
 formData: FormData;
 formStatus: FormStatus;
 phoneValidation: PhoneValidation;
 handleEnhancedChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
 handleEnhancedBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
 handleEnhancedSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
 handlePaymentButtonClickWrapper: () => void;
 shouldShowError: (fieldName: string) => boolean;
 shouldShowSuccess: (fieldName: string) => boolean;
 shouldShowWarning: (fieldName: string) => boolean;
 getFieldError: (fieldName: string) => string | null;
 getFieldWarning: (fieldName: string) => string | null;
 getFieldState: (fieldName: string) => { isValidating: boolean };
 isFormValid: () => boolean;
}

const CheckoutFormContainer = ({
 formData,
 formStatus,
 phoneValidation,
 handleEnhancedChange,
 handleEnhancedBlur,
 handleEnhancedSubmit,
 handlePaymentButtonClickWrapper,
 shouldShowError,
 shouldShowSuccess,
 shouldShowWarning,
 getFieldError,
 getFieldWarning,
 getFieldState,
 isFormValid
}: CheckoutFormContainerProps) => {
 return (
 <EnhancedCheckoutFormContent
 formData={formData}
 formStatus={formStatus}
 phoneValidation={phoneValidation}
 handleEnhancedChange={handleEnhancedChange}
 handleEnhancedBlur={handleEnhancedBlur}
 handleEnhancedSubmit={handleEnhancedSubmit}
 handlePaymentButtonClickWrapper={handlePaymentButtonClickWrapper}
 shouldShowError={shouldShowError}
 shouldShowSuccess={shouldShowSuccess}
 shouldShowWarning={shouldShowWarning}
 getFieldError={getFieldError}
 getFieldWarning={getFieldWarning}
 getFieldState={getFieldState}
 isFormValid={isFormValid}
 />
 );
};

export default CheckoutFormContainer; 