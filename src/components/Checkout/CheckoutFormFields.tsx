import React from 'react';
import { countryPhoneCodes, CountryCode } from '../../data/phoneCodes';

interface FormData {
 fullName: string;
 email: string;
 phoneCode: string;
 phoneNumber: string;
 address: string;
 additionalNotes: string;
}

interface CheckoutFormFieldsProps {
 formData: FormData;
 onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CheckoutFormFields: React.FC<CheckoutFormFieldsProps> = ({ formData, onChange }) => {
 return (
 <>
 <div className="form-group">
 <label htmlFor="fullName">Full Name</label>
 <input
 type="text"
 id="fullName"
 name="fullName"
 value={formData.fullName}
 onChange={onChange}
 required
 placeholder="Enter your full name"
 aria-required="true"
 />
 </div>
 
 <div className="form-group">
 <label htmlFor="email">Email</label>
 <input
 type="email"
 id="email"
 name="email"
 value={formData.email}
 onChange={onChange}
 required
 placeholder="Enter your email address"
 aria-required="true"
 />
 </div>
 
 <div className="form-group phone-group">
 <label htmlFor="phoneNumber">Phone Number</label>
 <div className="phone-input-container"role="group"aria-labelledby="phone-label">
 <span id="phone-label"className="sr-only">Phone Number with country code</span>
 <select
 id="phoneCode"
 name="phoneCode"
 value={formData.phoneCode}
 onChange={onChange}
 className="phone-code-select"
 aria-label="Country code"
 >
 {countryPhoneCodes.map((country: CountryCode) => (
 <option key={country.code} value={country.dial_code}>
 {country.name} ({country.dial_code})
 </option>
 ))}
 </select>
 <input
 type="tel"
 id="phoneNumber"
 name="phoneNumber"
 value={formData.phoneNumber}
 onChange={onChange}
 required
 placeholder="Enter your phone number"
 className="phone-number-input"
 aria-required="true"
 pattern="[0-9]+"
 title="Please enter only numbers"
 />
 </div>
 </div>
 
 <div className="form-group">
 <label htmlFor="address">Address</label>
 <input
 type="text"
 id="address"
 name="address"
 value={formData.address}
 onChange={onChange}
 required
 placeholder="Enter your full address"
 aria-required="true"
 />
 </div>
 
 <div className="form-group">
 <label htmlFor="additionalNotes">Additional Notes</label>
 <textarea
 id="additionalNotes"
 name="additionalNotes"
 value={formData.additionalNotes}
 onChange={onChange}
 rows={4}
 placeholder="Any special requests or additional information"
 aria-label="Additional notes or requests"
 />
 </div>
 </>
 );
};

export default CheckoutFormFields; 