import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';
import { FormField } from './FormField';
import ToggleSwitch from '../UI/ToggleSwitch';

const BillingAddressSection: React.FC<Pick<CheckoutFormProps, 'formData' | 'handleChange'>> = ({
 formData,
 handleChange
}) => {
 return (
 <div className="address-section">
 <h3>
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
 <circle cx="12"cy="10"r="3"></circle>
 </svg>
 Adresa naplate
 </h3>
 
 <FormField
 type="text"
 id="address"
 name="address"
 value={formData.address}
 onChange={handleChange}
 required
 placeholder="Adresa (npr. Praska ulica 3)"
 autoComplete="street-address"
 label="Adresa"
 icon={
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
 <polyline points="9,22 9,12 15,12 15,22"></polyline>
 </svg>
 }
 />
 
 <div className="form-row address-row">
 <FormField
 type="text"
 id="postalCode"
 name="postalCode"
 value={formData.postalCode}
 onChange={handleChange}
 required
 placeholder="npr. 51511"
 autoComplete="postal-code"
 pattern="[0-9]{5}"
 title="Molimo unesite 5-znamenkasti poštanski broj"
 label="Poštanski broj"
 icon={
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M3 3h18v18H3zM12 8v8m-4-4h8"></path>
 </svg>
 }
 />
 
 <FormField
 type="text"
 id="city"
 name="city"
 value={formData.city}
 onChange={handleChange}
 required
 placeholder="npr. Malinska"
 autoComplete="address-level2"
 label="Grad"
 icon={
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M3 21h18m-2-18v18m-8-18v18m-4-18v18M3 9l9-7 9 7"></path>
 </svg>
 }
 />
 </div>
 
 <ToggleSwitch
 id="sameAsBilling"
 name="sameAsBilling"
 checked={formData.sameAsBilling}
 onChange={handleChange}
 label="Ista kao adresa za dostavu"
 variant="success"
 size="medium"
 />
 </div>
 );
};

export default BillingAddressSection; 