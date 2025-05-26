import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';

const AdditionalNotesSection: React.FC<Pick<CheckoutFormProps, 'formData' | 'handleChange'>> = ({
  formData,
  handleChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor="additionalNotes">
        Dodatne napomene <span className="optional-label">(neobavezno)</span>
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="15" y1="12" x2="3" y2="12"></line>
            <line x1="17" y1="18" x2="3" y2="18"></line>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default AdditionalNotesSection; 