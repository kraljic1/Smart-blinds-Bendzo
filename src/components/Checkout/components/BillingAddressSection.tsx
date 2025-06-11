import React from 'react';
import { ValidatedInput } from '../../UI/ValidatedInput';
import { FormData } from '../CheckoutFormTypes';

interface BillingAddressSectionProps {
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

/**
 * BillingAddressSection component handles the billing address form fields
 * including street address, city, and postal code with validation
 */
const BillingAddressSection: React.FC<BillingAddressSectionProps> = ({
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
 <h3>Adresa naplate</h3>
 <ValidatedInput
 name="address"
 label="Adresa"
 value={formData.address}
 onChange={handleChange}
 onBlur={handleBlur}
 placeholder="Unesite vašu adresu"
 required
 validation={{
 showError: shouldShowError('address'),
 showSuccess: shouldShowSuccess('address'),
 showWarning: shouldShowWarning('address'),
 isValidating: getFieldState('address').isValidating,
 errorMessage: getFieldError('address'),
 warningMessage: getFieldWarning('address')
 }}
 autoComplete="street-address"
 />
 
 <div style={{ display: 'flex', gap: '16px' }}>
 <ValidatedInput
 name="city"
 label="Grad"
 value={formData.city}
 onChange={handleChange}
 onBlur={handleBlur}
 placeholder="Grad"
 required
 validation={{
 showError: shouldShowError('city'),
 showSuccess: shouldShowSuccess('city'),
 showWarning: shouldShowWarning('city'),
 isValidating: getFieldState('city').isValidating,
 errorMessage: getFieldError('city'),
 warningMessage: getFieldWarning('city')
 }}
 autoComplete="address-level2"
 />
 
 <ValidatedInput
 name="postalCode"
 label="Poštanski broj"
 value={formData.postalCode}
 onChange={handleChange}
 onBlur={handleBlur}
 placeholder="10000"
 required
 pattern="[0-9]{5}"
 title="Unesite 5-znamenkasti poštanski broj"
 validation={{
 showError: shouldShowError('postalCode'),
 showSuccess: shouldShowSuccess('postalCode'),
 showWarning: shouldShowWarning('postalCode'),
 isValidating: getFieldState('postalCode').isValidating,
 errorMessage: getFieldError('postalCode'),
 warningMessage: getFieldWarning('postalCode')
 }}
 autoComplete="postal-code"
 />
 </div>
 </div>
 );
};

export default BillingAddressSection; 