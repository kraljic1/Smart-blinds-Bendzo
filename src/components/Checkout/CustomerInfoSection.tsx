import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';

const CustomerInfoSection: React.FC<Pick<CheckoutFormProps, 'formData' | 'handleChange'>> = ({
  formData,
  handleChange
}) => {
  return (
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="fullName">Puno ime</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Unesite vaše puno ime"
            aria-required="true"
            autoComplete="name"
          />
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email adresa</label>
        <div className="input-wrapper">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="vaš@email.com"
            aria-required="true"
            autoComplete="email"
          />
          <span className="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoSection; 