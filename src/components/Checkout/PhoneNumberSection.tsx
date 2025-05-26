import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';
import { countryPhoneCodes, CountryCode } from '../../data/phoneCodes';
import { getCountryCodeFromDialCode, getExamplePhoneNumber } from '../../utils/phoneValidation';

const PhoneNumberSection: React.FC<Pick<CheckoutFormProps, 'formData' | 'phoneValidation' | 'handleChange'>> = ({
  formData,
  phoneValidation,
  handleChange
}) => {
  return (
    <div className="form-group phone-group">
      <label htmlFor="phoneNumber">Broj telefona</label>
      <div className="phone-input-container" role="group" aria-labelledby="phone-label">
        <span id="phone-label" className="sr-only">Broj telefona s pozivnim brojem zemlje</span>
        <div className="input-wrapper select-wrapper">
          <select
            id="phoneCode"
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            className="phone-code-select"
            aria-label="Pozivni broj zemlje"
            required
            autoComplete="tel-country-code"
          >
            {countryPhoneCodes.map((country: CountryCode) => (
              <option key={country.code} value={country.dial_code}>
                {country.flag} {country.name} ({country.dial_code})
              </option>
            ))}
          </select>
          <span className="select-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
        <div className="input-wrapper">
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder={
              getCountryCodeFromDialCode(formData.phoneCode) 
                ? getExamplePhoneNumber(getCountryCodeFromDialCode(formData.phoneCode)!) 
                : "Unesite vaš broj telefona"
            }
            className={`phone-number-input ${!phoneValidation.isValid && formData.phoneNumber ? 'phone-error' : ''}`}
            aria-required="true"
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
        
        {/* Phone validation feedback */}
        {formData.phoneNumber && !phoneValidation.isValid && (
          <div className="phone-validation-error">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{phoneValidation.errorMessage}</span>
          </div>
        )}
        
        {phoneValidation.suggestion && (
          <div className="phone-validation-suggestion">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <span>{phoneValidation.suggestion}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberSection; 