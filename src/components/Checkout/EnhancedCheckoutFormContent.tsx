import React from 'react';
import { ValidatedInput } from '../UI/ValidatedInput';
import PhoneNumberSection from './PhoneNumberSection';
import CompanyInfoSection from './CompanyInfoSection';
import ShippingAddressSection from './ShippingAddressSection';
import PaymentMethodSection from './PaymentMethodSection';
import ShippingMethodSection from './ShippingMethodSection';
import AdditionalNotesSection from './AdditionalNotesSection';
import OrderSummarySection from './OrderSummarySection';
import EnhancedCustomerSection from './EnhancedCustomerSection';
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
        <EnhancedCustomerSection
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
        
        <div className="form-section">
          <PhoneNumberSection 
            formData={formData} 
            phoneValidation={phoneValidation}
            handleChange={handleEnhancedChange}
            handleBlur={handleEnhancedBlur}
            getFieldError={getFieldError}
            hasFieldError={(fieldName: string) => !!getFieldError(fieldName)}
          />
        </div>
        
        <div className="form-section">
          <h3>Adresa naplate</h3>
          <ValidatedInput
            name="address"
            label="Adresa"
            value={formData.address}
            onChange={handleEnhancedChange}
            onBlur={handleEnhancedBlur}
            placeholder="Unesite vašu adresu"
            required
            showError={!!shouldShowError('address')}
            showSuccess={!!shouldShowSuccess('address')}
            showWarning={!!shouldShowWarning('address')}
            isValidating={getFieldState('address').isValidating}
            errorMessage={getFieldError('address')}
            warningMessage={getFieldWarning('address')}
            autoComplete="street-address"
          />
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <ValidatedInput
              name="city"
              label="Grad"
              value={formData.city}
              onChange={handleEnhancedChange}
              onBlur={handleEnhancedBlur}
              placeholder="Grad"
              required
              showError={!!shouldShowError('city')}
              showSuccess={!!shouldShowSuccess('city')}
              showWarning={!!shouldShowWarning('city')}
              isValidating={getFieldState('city').isValidating}
              errorMessage={getFieldError('city')}
              warningMessage={getFieldWarning('city')}
              autoComplete="address-level2"
            />
            
            <ValidatedInput
              name="postalCode"
              label="Poštanski broj"
              value={formData.postalCode}
              onChange={handleEnhancedChange}
              onBlur={handleEnhancedBlur}
              placeholder="10000"
              required
              pattern="[0-9]{5}"
              title="Unesite 5-znamenkasti poštanski broj"
              showError={!!shouldShowError('postalCode')}
              showSuccess={!!shouldShowSuccess('postalCode')}
              showWarning={!!shouldShowWarning('postalCode')}
              isValidating={getFieldState('postalCode').isValidating}
              errorMessage={getFieldError('postalCode')}
              warningMessage={getFieldWarning('postalCode')}
              autoComplete="postal-code"
            />
          </div>
        </div>
        
        <div className="form-section">
          <CompanyInfoSection 
            formData={formData} 
            handleChange={handleEnhancedChange}
          />
        </div>
        
        <ShippingAddressSection 
          formData={formData} 
          handleChange={handleEnhancedChange}
        />
        
        <div className="form-section">
          <PaymentMethodSection />
        </div>
        
        <div className="form-section">
          <ShippingMethodSection 
            formData={formData} 
            handleChange={handleEnhancedChange} 
          />
        </div>
        
        <div className="form-section">
          <AdditionalNotesSection 
            formData={formData} 
            handleChange={handleEnhancedChange}
          />
        </div>
        
        {formStatus.error && (
          <div className="checkout-error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {formStatus.error}
          </div>
        )}
        
        <button 
          type="submit" 
          className={`checkout-submit-btn ${!isFormValid() ? 'disabled' : ''}`}
          disabled={formStatus.submitting || !isFormValid()}
          aria-busy={formStatus.submitting ? "true" : "false"}
          onClick={handlePaymentButtonClickWrapper}
        >
          {formStatus.submitting ? (
            <>
              <span className="loading-spinner"></span>
              <span>Obrađuje se...</span>
            </>
          ) : (
            <>
              <span>Nastavi na plaćanje</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
      </form>
      
      <OrderSummarySection shippingMethod={formData.shippingMethod} />
    </div>
  );
};

export default EnhancedCheckoutFormContent; 