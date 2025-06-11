import React from 'react';
import OrderSummarySection from './OrderSummarySection';
import { CustomerAndBillingSection, FormSections, FormActions } from './components';
import { FormData, FormStatus, PhoneValidation } from './CheckoutFormTypes';

interface EnhancedCheckoutFormContentProps {
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

const EnhancedCheckoutFormContent: React.FC<EnhancedCheckoutFormContentProps> = ({
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
}) => {
 return (
 <div className="enhanced-checkout-form">
 <form onSubmit={handleEnhancedSubmit} className="checkout-form">
 <CustomerAndBillingSection
 formData={formData}
 handleChange={handleEnhancedChange}
 handleBlur={handleEnhancedBlur}
 shouldShowError={shouldShowError}
 shouldShowSuccess={shouldShowSuccess}
 shouldShowWarning={shouldShowWarning}
 getFieldError={getFieldError}
 getFieldWarning={getFieldWarning}
 getFieldState={getFieldState}
 />
 
 <FormSections
 formData={formData}
 phoneValidation={phoneValidation}
 handleChange={handleEnhancedChange}
 handleBlur={handleEnhancedBlur}
 getFieldError={getFieldError}
 />
 
 <FormActions
 formStatus={formStatus}
 isFormValid={isFormValid}
 handlePaymentButtonClick={handlePaymentButtonClickWrapper}
 />
 </form>
 
 <OrderSummarySection shippingMethod={formData.shippingMethod} />
 </div>
 );
};

export default EnhancedCheckoutFormContent; 