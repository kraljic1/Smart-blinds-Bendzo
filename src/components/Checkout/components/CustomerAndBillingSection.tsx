import React from 'react';
import EnhancedCustomerSection from '../EnhancedCustomerSection';
import BillingAddressSection from './BillingAddressSection';
import { FormData } from '../CheckoutFormTypes';

interface CustomerAndBillingSectionProps {
 formData: FormData;
 handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
 handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
 shouldShowError: (fieldName: string) => boolean;
 shouldShowSuccess: (fieldName: string) => boolean;
 shouldShowWarning: (fieldName: string) => boolean;
 getFieldError: (fieldName: string) => string | null;
 getFieldWarning: (fieldName: string) => string | null;
 getFieldState: (fieldName: string) => { isValidating: boolean };
}

const CustomerAndBillingSection: React.FC<CustomerAndBillingSectionProps> = ({
 formData,
 handleChange,
 handleBlur,
 shouldShowError,
 shouldShowSuccess,
 shouldShowWarning,
 getFieldError,
 getFieldWarning,
 getFieldState
}) => {
 return (
 <>
 <EnhancedCustomerSection
 formData={formData}
 handleChange={handleChange}
 handleBlur={handleBlur}
 shouldShowError={shouldShowError}
 shouldShowSuccess={shouldShowSuccess}
 shouldShowWarning={shouldShowWarning}
 getFieldError={getFieldError}
 getFieldWarning={getFieldWarning}
 getFieldState={getFieldState}
 />
 
 <BillingAddressSection
 formData={formData}
 handleChange={handleChange}
 handleBlur={handleBlur}
 shouldShowError={shouldShowError}
 shouldShowSuccess={shouldShowSuccess}
 shouldShowWarning={shouldShowWarning}
 getFieldError={getFieldError}
 getFieldWarning={getFieldWarning}
 getFieldState={getFieldState}
 />
 </>
 );
};

export default CustomerAndBillingSection; 