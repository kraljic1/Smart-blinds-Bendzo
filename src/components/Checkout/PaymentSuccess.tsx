import React from 'react';
import './PaymentSuccess.css';

interface PaymentSuccessProps {
  orderDetails: {
    paymentIntentId: string;
    amount: number;
    currency: string;
    customerEmail: string;
    customerName: string;
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
          <div className="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22,4 12,14.01 9,11.01"></polyline>
            </svg>
          </div>
          
          <h1>Plaćanje uspješno!</h1>
          <p className="success-message">
            Hvala vam na kupovini! Vaša narudžba je uspješno obrađena.
          </p>
          
          <div className="order-summary">
            <h3>Detalji narudžbe:</h3>
            <div className="order-detail">
              <span>Broj narudžbe:</span>
              <span>{orderDetails.paymentIntentId}</span>
            </div>
            <div className="order-detail">
              <span>Iznos:</span>
              <span>{orderDetails.amount.toFixed(2)} {orderDetails.currency.toUpperCase()}</span>
            </div>
            <div className="order-detail">
              <span>Email:</span>
              <span>{orderDetails.customerEmail}</span>
            </div>
          </div>
          
          <div className="next-steps">
            <h3>Što slijedi?</h3>
            <ul>
              <li>Poslat ćemo vam potvrdu narudžbe na email</li>
              <li>Kontaktirat ćemo vas za dogovaranje termina instalacije</li>
              <li>Naš tim će vam se javiti u roku od 24 sata</li>
            </ul>
          </div>
          
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