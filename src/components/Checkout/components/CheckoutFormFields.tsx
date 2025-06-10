import React from 'react';
import CustomerInfoSection from '../CustomerInfoSection';
import PhoneNumberSection from '../PhoneNumberSection';
import BillingAddressSection from '../BillingAddressSection';
import CompanyInfoSection from '../CompanyInfoSection';
import ShippingAddressSection from '../ShippingAddressSection';
import PaymentMethodSection from '../PaymentMethodSection';
import ShippingMethodSection from '../ShippingMethodSection';
import AdditionalNotesSection from '../AdditionalNotesSection';
import { FormData, PhoneValidation } from '../CheckoutFormTypes';

interface CheckoutFormFieldsProps {
  formData: FormData;
  phoneValidation: PhoneValidation;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

/**
 * CheckoutFormFields component renders all the form sections
 * for the checkout process in a structured layout
 */
const CheckoutFormFields: React.FC<CheckoutFormFieldsProps> = ({
  formData,
  phoneValidation,
  handleChange
}) => {
  return (
    <>
      <div className="form-section">
        <CustomerInfoSection 
          formData={formData} 
          handleChange={handleChange} 
        />
      </div>
      
      <div className="form-section">
        <PhoneNumberSection 
          formData={formData} 
          phoneValidation={phoneValidation}
          handleChange={handleChange} 
        />
      </div>
      
      <BillingAddressSection 
        formData={formData} 
        handleChange={handleChange} 
      />
      
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

export default CheckoutFormFields; 