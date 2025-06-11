import React from 'react';
import { AddressHeader } from './components/AddressHeader';
import { StreetAddressField } from './components/StreetAddressField';
import { PostalCodeField } from './components/PostalCodeField';
import { CityField } from './components/CityField';

interface AddressInputProps {
 streetAddress: string;
 city: string;
 postalCode: string;
 onStreetAddressChange: (value: string) => void;
 onCityChange: (value: string) => void;
 onPostalCodeChange: (value: string) => void;
 disabled?: boolean;
 fieldPrefix?: string;
 title?: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({
 streetAddress,
 city,
 postalCode,
 onStreetAddressChange,
 onCityChange,
 onPostalCodeChange,
 disabled = false,
 fieldPrefix = '',
 title = 'Address'
}) => {
 return (
 <div className="address-section">
 <AddressHeader title={title} />
 
 <StreetAddressField
 value={streetAddress}
 onChange={onStreetAddressChange}
 fieldPrefix={fieldPrefix}
 disabled={disabled}
 />
 
 <div className="form-row address-row">
 <PostalCodeField
 value={postalCode}
 onChange={onPostalCodeChange}
 fieldPrefix={fieldPrefix}
 disabled={disabled}
 />
 
 <CityField
 value={city}
 onChange={onCityChange}
 fieldPrefix={fieldPrefix}
 disabled={disabled}
 />
 </div>
 </div>
 );
}; 