import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';
import ToggleSwitch from '../UI/ToggleSwitch';
import { FormField } from './FormField';

const CompanyInfoSection: React.FC<Pick<CheckoutFormProps, 'formData' | 'handleChange'>> = ({
 formData,
 handleChange
}) => {
 return (
 <>
 <h3>
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <rect x="3"y="4"width="18"height="12"rx="2"ry="2"></rect>
 <line x1="8"y1="21"x2="16"y2="21"></line>
 <line x1="12"y1="17"x2="12"y2="21"></line>
 </svg>
 Podaci za tvrtku
 </h3>
 
 <ToggleSwitch
 id="needsR1Invoice"
 name="needsR1Invoice"
 checked={formData.needsR1Invoice}
 onChange={handleChange}
 label="Želim R1 račun za tvrtku"
 variant="primary"
 size="medium"
 />

 {formData.needsR1Invoice && (
 <div className="form-row">
 <FormField
 type="text"
 id="companyName"
 name="companyName"
 value={formData.companyName}
 onChange={handleChange}
 required={formData.needsR1Invoice}
 placeholder="Naziv tvrtke"
 autoComplete="organization"
 label="Tvrtka"
 icon={
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M3 21h18"></path>
 <path d="M5 21V7l8-4v18"></path>
 <path d="M19 21V11l-6-4"></path>
 </svg>
 }
 />
 
 <FormField
 type="text"
 id="companyOib"
 name="companyOib"
 value={formData.companyOib}
 onChange={handleChange}
 required={formData.needsR1Invoice}
 placeholder="OIB tvrtke (11 znamenki)"
 pattern="[0-9]{11}"
 title="OIB mora imati točno 11 znamenki"
 label="OIB (samo za tvrtke)"
 icon={
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <rect x="3"y="4"width="18"height="12"rx="2"ry="2"></rect>
 <line x1="8"y1="21"x2="16"y2="21"></line>
 <line x1="12"y1="17"x2="12"y2="21"></line>
 </svg>
 }
 />
 </div>
 )}
 </>
 );
};

export default CompanyInfoSection; 