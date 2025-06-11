import React from 'react';
import { ValidatedInput } from '../UI/ValidatedInput';
import { FormData } from './CheckoutFormTypes';

interface EnhancedCustomerSectionProps {
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

const EnhancedCustomerSection: React.FC<EnhancedCustomerSectionProps> = ({
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
 <div className="form-section">
 <h3>Podaci o kupcu</h3>
 <ValidatedInput
 name="fullName"
 label="Puno ime"
 value={formData.fullName}
 onChange={handleChange}
 onBlur={handleBlur}
 placeholder="Unesite vaše puno ime"
 required
 showError={!!shouldShowError('fullName')}
 showSuccess={!!shouldShowSuccess('fullName')}
 showWarning={!!shouldShowWarning('fullName')}
 isValidating={getFieldState('fullName').isValidating}
 errorMessage={getFieldError('fullName')}
 warningMessage={getFieldWarning('fullName')}
 autoComplete="name"
 />
 
 <ValidatedInput
 name="email"
 label="Email adresa"
 type="email"
 value={formData.email}
 onChange={handleChange}
 onBlur={handleBlur}
 placeholder="vaš@email.com"
 required
 showError={!!shouldShowError('email')}
 showSuccess={!!shouldShowSuccess('email')}
 showWarning={!!shouldShowWarning('email')}
 isValidating={getFieldState('email').isValidating}
 errorMessage={getFieldError('email')}
 warningMessage={getFieldWarning('email')}
 autoComplete="email"
 />
 </div>
 );
};

export default EnhancedCustomerSection; 