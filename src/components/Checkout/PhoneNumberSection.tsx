import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';
import { usePhoneValidation } from './hooks/usePhoneValidation';
import PhoneSectionHeader from './components/PhoneSectionHeader';
import PhoneCodeSelect from './components/PhoneCodeSelect';
import PhoneNumberInput from './components/PhoneNumberInput';
import PhoneValidationFeedback from './components/PhoneValidationFeedback';

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
 const { displayError, hasError, suggestionMessage } = usePhoneValidation({
 phoneValidation,
 phoneNumber: formData.phoneNumber,
 getFieldError,
 hasFieldError
 });

 return (
 <div className="form-section">
 <PhoneSectionHeader />

 <div className="form-group">
 <label htmlFor="phoneCode">Broj telefona</label>
 <div className="phone-input-group">
 <PhoneCodeSelect
 value={formData.phoneCode}
 onChange={handleChange}
 onBlur={handleBlur}
 />

 <PhoneNumberInput
 value={formData.phoneNumber}
 phoneCode={formData.phoneCode}
 hasError={hasError}
 onChange={handleChange}
 onBlur={handleBlur}
 />
 </div>
 
 <PhoneValidationFeedback
 errorMessage={displayError}
 suggestionMessage={suggestionMessage}
 />
 </div>
 </div>
 );
};

export default PhoneNumberSection; 