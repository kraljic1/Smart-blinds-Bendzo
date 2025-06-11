import React from 'react';
import PhoneIcon from './PhoneIcon';
import { getCountryCodeFromDialCode, getExamplePhoneNumber } from '../../../utils/phoneValidation';

interface PhoneNumberInputProps {
 value: string;
 phoneCode: string;
 hasError: boolean;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
 value,
 phoneCode,
 hasError,
 onChange,
 onBlur
}) => {
 const getPlaceholder = (): string => {
 const countryCode = getCountryCodeFromDialCode(phoneCode);
 return countryCode 
 ? getExamplePhoneNumber(countryCode) 
 :"Unesite vaš broj telefona";
 };

 return (
 <div className="input-wrapper">
 <input
 type="tel"
 id="phoneNumber"
 name="phoneNumber"
 value={value}
 onChange={onChange}
 onBlur={onBlur}
 required
 placeholder={getPlaceholder()}
 className={`phone-number-input ${hasError ? 'phone-error' : ''}`}
 aria-required="true"
 aria-invalid={hasError ?"true":"false"}
 aria-describedby={hasError ?"phoneNumber-error": undefined}
 pattern="[0-9\s\-\(\)]+"
 title="Molimo unesite važeći broj telefona"
 autoComplete="tel-national"
 />
 <span className="input-icon">
 <PhoneIcon />
 </span>
 </div>
 );
};

export default PhoneNumberInput; 