import React from 'react';
import PhoneNumberSection from '../PhoneNumberSection';
import CompanyInfoSection from '../CompanyInfoSection';
import ShippingAddressSection from '../ShippingAddressSection';
import PaymentMethodSection from '../PaymentMethodSection';
import ShippingMethodSection from '../ShippingMethodSection';
import AdditionalNotesSection from '../AdditionalNotesSection';
import { FormData, PhoneValidation } from '../CheckoutFormTypes';

interface FormSectionsProps {
  formData: FormData;
  phoneValidation: PhoneValidation;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  getFieldError: (fieldName: string) => string | null;
}

const FormSections: React.FC<FormSectionsProps> = ({
  formData,
  phoneValidation,
  handleChange,
  handleBlur,
  getFieldError
}) => {
  return (
    <>
      <div className="form-section">
        <PhoneNumberSection 
          formData={formData} 
          phoneValidation={phoneValidation}
          handleChange={handleChange}
          handleBlur={handleBlur}
          getFieldError={getFieldError}
          hasFieldError={(fieldName: string) => !!getFieldError(fieldName)}
        />
      </div>
      
      <div className="form-section">
        <CompanyInfoSection 
          formData={formData} 
          handleChange={handleChange}
        />
      </div>
      
      <ShippingAddressSection 
        formData={formData} 
        handleChange={handleChange}
      />
      
      <div className="form-section">
        <PaymentMethodSection />
      </div>
      
      <div className="form-section">
        <ShippingMethodSection 
          formData={formData} 
          handleChange={handleChange} 
        />
      </div>
      
      <div className="form-section">
        <AdditionalNotesSection 
          formData={formData} 
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default FormSections; 