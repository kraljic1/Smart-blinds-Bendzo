import React from 'react';
import { countryPhoneCodes, CountryCode } from '../../../data/phoneCodes';

interface PhoneCodeSelectProps {
 value: string;
 onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
 onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const PhoneCodeSelect: React.FC<PhoneCodeSelectProps> = ({ 
 value, 
 onChange, 
 onBlur 
}) => {
 return (
 <select
 id="phoneCode"
 name="phoneCode"
 value={value}
 onChange={onChange}
 onBlur={onBlur}
 className="phone-code-select"
 aria-label="Pozivni broj zemlje"
 >
 {countryPhoneCodes.map((country: CountryCode) => (
 <option key={country.code} value={country.dial_code}>
 {country.flag} {country.name} ({country.dial_code})
 </option>
 ))}
 </select>
 );
};

export default PhoneCodeSelect; 