import React from 'react';
import { CheckoutFormProps } from './CheckoutFormTypes';
import { FormField } from './FormField';

const ShippingAddressSection: React.FC<Pick<CheckoutFormProps, 'formData' | 'handleChange'>> = ({
 formData,
 handleChange
}) => {
 if (formData.sameAsBilling) {
 return null;
 }

 return (
 <div className="address-section">
 <h3>
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M16 3h5v5M4 20L21 3l-3 3L6 18l-2 2z"></path>
 <path d="M21 14v5h-5M3 10v5h5"></path>
 </svg>
 Adresa dostave
 </h3>
 
 <FormField
 type="text"
 id="shippingAddress"
 name="shippingAddress"
 value={formData.shippingAddress}
 onChange={handleChange}
 required
 placeholder="Adresa (npr. Praska ulica 3)"
 autoComplete="shipping street-address"
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
 id="shippingPostalCode"
 name="shippingPostalCode"
 value={formData.shippingPostalCode}
 onChange={handleChange}
 required
 placeholder="npr. 51511"
 autoComplete="shipping postal-code"
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
 id="shippingCity"
 name="shippingCity"
 value={formData.shippingCity}
 onChange={handleChange}
 required
 placeholder="npr. Malinska"
 autoComplete="shipping address-level2"
 label="Grad"
 icon={
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M3 21h18m-2-18v18m-8-18v18m-4-18v18M3 9l9-7 9 7"></path>
 </svg>
 }
 />
 </div>
 </div>
 );
};

export default ShippingAddressSection; 