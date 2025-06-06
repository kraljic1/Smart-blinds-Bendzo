import React from 'react';
import './PaymentSuccess.css';

interface PaymentSuccessProps {
  orderDetails: {
    paymentIntentId: string;
    orderNumber: string;
    date: string;
    time: string;
    amount: number;
    currency: string;
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
    items: {
      id: string;
      name: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      description: string;
    }[];
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
    notes: string;
  };
  onContinueShopping: () => void;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ 
  orderDetails, 
  onContinueShopping 
}) => {
  return (
    <div className="payment-success-overlay">
      <div className="payment-success-container">
        <div className="payment-success-content">
          {/* Invoice Header */}
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
                <p><strong>Broj računa:</strong> {orderDetails.orderNumber}</p>
                <p><strong>Datum:</strong> {orderDetails.date}</p>
                <p><strong>Vrijeme:</strong> {orderDetails.time}</p>
                <p><strong>Payment ID:</strong> {orderDetails.paymentIntentId}</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="customer-section">
            <div className="bill-to">
              <h3>Račun za:</h3>
              {orderDetails.company ? (
                <div className="company-billing">
                  <p><strong>{orderDetails.company.name}</strong></p>
                  <p>OIB: {orderDetails.company.oib}</p>
                  <p>{orderDetails.customer.name}</p>
                  <p>{orderDetails.customer.address}</p>
                  <p>{orderDetails.customer.postalCode} {orderDetails.customer.city}</p>
                  <p>{orderDetails.customer.country}</p>
                  <p>Email: {orderDetails.customer.email}</p>
                  <p>Tel: {orderDetails.customer.phone}</p>
                </div>
              ) : (
                <div className="personal-billing">
                  <p><strong>{orderDetails.customer.name}</strong></p>
                  <p>{orderDetails.customer.address}</p>
                  <p>{orderDetails.customer.postalCode} {orderDetails.customer.city}</p>
                  <p>{orderDetails.customer.country}</p>
                  <p>Email: {orderDetails.customer.email}</p>
                  <p>Tel: {orderDetails.customer.phone}</p>
                </div>
              )}
            </div>
            
            <div className="ship-to">
              <h3>Dostava na:</h3>
              <div className="shipping-info">
                <p><strong>Način dostave:</strong> {orderDetails.shipping.method}</p>
                <p>{orderDetails.shipping.address.address}</p>
                <p>{orderDetails.shipping.address.postalCode} {orderDetails.shipping.address.city}</p>
                <p>Hrvatska</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="items-section">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Proizvod</th>
                  <th>Količina</th>
                  <th>Jedinična cijena</th>
                  <th>Ukupno</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="item-info">
                        <strong>{item.name}</strong>
                        {item.description && <p className="item-description">{item.description}</p>}
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.unitPrice.toFixed(2)} {orderDetails.currency}</td>
                    <td>{item.totalPrice.toFixed(2)} {orderDetails.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="totals-section">
            <div className="totals-table">
              <div className="total-row">
                <span>Neto iznos:</span>
                <span>{(orderDetails.subtotal - orderDetails.tax).toFixed(2)} {orderDetails.currency}</span>
              </div>
              {orderDetails.shippingCost > 0 && (
                <div className="total-row">
                  <span>Dostava:</span>
                  <span>{orderDetails.shippingCost.toFixed(2)} {orderDetails.currency}</span>
                </div>
              )}
              <div className="total-row">
                <span>PDV (25%):</span>
                <span>{orderDetails.tax.toFixed(2)} {orderDetails.currency}</span>
              </div>
              <div className="total-row total-final">
                <span><strong>UKUPNO:</strong></span>
                <span><strong>{orderDetails.total.toFixed(2)} {orderDetails.currency}</strong></span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {orderDetails.notes && (
            <div className="notes-section">
              <h3>Napomene:</h3>
              <p>{orderDetails.notes}</p>
            </div>
          )}

          {/* Success Message */}
          <div className="success-message-section">
            <div className="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
              </svg>
            </div>
            <h2>Plaćanje uspješno!</h2>
            <p>Hvala vam na kupovini! Vaša narudžba je uspješno obrađena.</p>
          </div>

          {/* Next Steps */}
          <div className="next-steps">
            <h3>Što slijedi?</h3>
            <ul>
              <li>Poslat ćemo vam potvrdu narudžbe na email</li>
              <li>Kontaktirat ćemo vas za dogovaranje termina instalacije</li>
              <li>Naš tim će vam se javiti u roku od 24 sata</li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              onClick={onContinueShopping}
              className="continue-shopping-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5m7-7l-7 7 7 7"/>
              </svg>
              Nastavi kupovinu
            </button>
            
            <button 
              onClick={() => window.print()}
              className="print-receipt-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,9 6,2 18,2 18,9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Ispiši račun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 