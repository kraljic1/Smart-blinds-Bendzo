import React from 'react';
import { countryPhoneCodes, CountryCode } from '../../data/phoneCodes';
import { getCountryCodeFromDialCode, getExamplePhoneNumber } from '../../utils/phoneValidation';
import { CheckoutFormProps } from './CheckoutFormTypes';

interface PhoneNumberSectionProps extends Pick<CheckoutFormProps, 'formData' | 'phoneValidation' | 'handleChange'> {
  handleBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  getFieldError?: (fieldName: string) => string | null;
  hasFieldError?: (fieldName: string) => boolean;
}

const PhoneNumberSection: React.FC<PhoneNumberSectionProps> = ({ 
  formData, 
  phoneValidation, 
  handleChange,
  handleBlur,
  getFieldError,
  hasFieldError
}) => {
  // Determine if we should show phone validation error
  const showPhoneError = !phoneValidation.isValid && phoneValidation.errorMessage && formData.phoneNumber;
  const externalPhoneError = getFieldError ? getFieldError('phoneNumber') : null;
  const hasExternalError = hasFieldError ? hasFieldError('phoneNumber') : false;
  
  // Use external validation error if available, otherwise use phone validation error
  const displayError = externalPhoneError || (showPhoneError ? phoneValidation.errorMessage : null);
  const hasError = hasExternalError || showPhoneError;

  return (
    <div className="form-section">
      <h3>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        Kontakt telefon
      </h3>

      <div className="form-group">
        <label htmlFor="phoneCode">Broj telefona</label>
        <div className="phone-input-group">
          <select
            id="phoneCode"
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            onBlur={handleBlur}
            className="phone-code-select"
            aria-label="Pozivni broj zemlje"
          >
            {countryPhoneCodes.map((country: CountryCode) => (
              <option key={country.code} value={country.dial_code}>
                {country.flag} {country.name} ({country.dial_code})
              </option>
            ))}
          </select>

          <div className="input-wrapper">
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder={
                getCountryCodeFromDialCode(formData.phoneCode) 
                  ? getExamplePhoneNumber(getCountryCodeFromDialCode(formData.phoneCode)!) 
                  : "Unesite vaš broj telefona"
              }
              className={`phone-number-input ${hasError ? 'phone-error' : ''}`}
              aria-required="true"
              aria-invalid={hasError ? "true" : "false"}
              aria-describedby={hasError ? "phoneNumber-error" : undefined}
              pattern="[0-9\s\-\(\)]+"
              title="Molimo unesite važeći broj telefona"
              autoComplete="tel-national"
            />
            <span className="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </span>
          </div>
        </div>
        
        {/* Phone validation feedback */}
        {displayError && (
          <div id="phoneNumber-error" className="field-error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {displayError}
          </div>
        )}
        
        {/* Phone validation suggestion */}
        {phoneValidation.suggestion && !displayError && (
          <div className="field-suggestion">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            {phoneValidation.suggestion}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberSection; 