import React from 'react';

const PaymentMethodSection: React.FC = () => {
 return (
 <>
 <h3>
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <rect x="1"y="4"width="22"height="16"rx="2"ry="2"></rect>
 <line x1="1"y1="10"x2="23"y2="10"></line>
 </svg>
 Način plaćanja
 </h3>
 
 <div className="form-group">
 <div className="payment-method-info">
 <span className="payment-method-label">Odabrani način plaćanja:</span>
 <div id="payment-method-display"className="payment-method-fixed"role="status"aria-live="polite">
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round"className="payment-icon">
 <rect x="1"y="4"width="22"height="16"rx="2"ry="2"></rect>
 <line x1="1"y1="10"x2="23"y2="10"></line>
 </svg>
 <span>Kreditna ili debitna kartica</span>
 </div>
 </div>
 </div>
 </>
 );
};

export default PaymentMethodSection; 