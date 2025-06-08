import React from 'react';

interface CustomerSectionProps {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  company?: {
    name: string;
    oib: string;
  };
  shipping: {
    method: string;
    address: {
      address: string;
      city: string;
      postalCode: string;
    };
  };
}

const CustomerSection: React.FC<CustomerSectionProps> = ({
  customer,
  company,
  shipping
}) => {
  return (
    <div className="customer-section">
      <div className="bill-to">
        <h3>Račun za:</h3>
        {company ? (
          <div className="company-billing">
            <p><strong>{company.name}</strong></p>
            <p>OIB: {company.oib}</p>
            <p>{customer.name}</p>
            <p>{customer.address}</p>
            <p>{customer.postalCode} {customer.city}</p>
            <p>{customer.country}</p>
            <p>Email: {customer.email}</p>
            <p>Tel: {customer.phone}</p>
          </div>
        ) : (
          <div className="personal-billing">
            <p><strong>{customer.name}</strong></p>
            <p>{customer.address}</p>
            <p>{customer.postalCode} {customer.city}</p>
            <p>{customer.country}</p>
            <p>Email: {customer.email}</p>
            <p>Tel: {customer.phone}</p>
          </div>
        )}
      </div>
      
      <div className="ship-to">
        <h3>Dostava na:</h3>
        <div className="shipping-info">
          <p><strong>Način dostave:</strong> {shipping.method}</p>
          <p>{shipping.address.address}</p>
          <p>{shipping.address.postalCode} {shipping.address.city}</p>
          <p>Hrvatska</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerSection; 