import React from 'react';

interface InvoiceHeaderProps {
  orderNumber: string;
  date: string;
  time: string;
  paymentIntentId: string;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  orderNumber,
  date,
  time,
  paymentIntentId
}) => {
  return (
    <div className="invoice-header">
      <div className="company-info">
        <h1>Smartblinds Croatia</h1>
        <div className="company-details">
          <p>Code and Sail d.o.o.</p>
          <p>Mihovila Radića 3</p>
          <p>51511 Malinska, Hrvatska</p>
          <p>OIB: 12345678901</p>
          <p>Email: info@smartblinds.hr</p>
          <p>Tel: +385 98 986 1054</p>
        </div>
      </div>
      <div className="invoice-meta">
        <h2>RAČUN</h2>
        <div className="invoice-details">
          <p><strong>Broj računa:</strong> {orderNumber}</p>
          <p><strong>Datum:</strong> {date}</p>
          <p><strong>Vrijeme:</strong> {time}</p>
          <p><strong>Payment ID:</strong> {paymentIntentId}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader; 