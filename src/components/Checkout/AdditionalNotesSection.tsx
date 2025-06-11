import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';

const AdditionalNotesSection: React.FC<Pick<CheckoutFormProps, 'formData' | 'handleChange'>> = ({
 formData,
 handleChange
}) => {
 return (
 <>
 <h3>
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
 <polyline points="14,2 14,8 20,8"></polyline>
 <line x1="16"y1="13"x2="8"y2="13"></line>
 <line x1="16"y1="17"x2="8"y2="17"></line>
 <polyline points="10,9 9,9 8,9"></polyline>
 </svg>
 Dodatne napomene
 </h3>
 
 <div className="form-group">
 <label htmlFor="additionalNotes">
 Posebni zahtjevi <span className="optional-label">(neobavezno)</span>
 </label>
 <div className="input-wrapper textarea-wrapper">
 <textarea
 id="additionalNotes"
 name="additionalNotes"
 value={formData.additionalNotes}
 onChange={handleChange}
 rows={4}
 placeholder="Posebni zahtjevi ili dodatne informacije"
 aria-label="Dodatne napomene ili zahtjevi"
 autoComplete="off"
 />
 <span className="input-icon textarea-icon">
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <line x1="21"y1="6"x2="3"y2="6"></line>
 <line x1="15"y1="12"x2="3"y2="12"></line>
 <line x1="17"y1="18"x2="3"y2="18"></line>
 </svg>
 </span>
 </div>
 </div>
 </>
 );
};

export default AdditionalNotesSection; 