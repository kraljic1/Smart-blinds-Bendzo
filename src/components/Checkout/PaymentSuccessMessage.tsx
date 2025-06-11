import React from 'react';

interface PaymentSuccessMessageProps {
 onContinueShopping: () => void;
}

const PaymentSuccessMessage: React.FC<PaymentSuccessMessageProps> = ({
 onContinueShopping
}) => {
 return (
 <>
 {/* Success Message */}
 <div className="success-message-section">
 <div className="success-icon">
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
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
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M19 12H5m7-7l-7 7 7 7"/>
 </svg>
 Nastavi kupovinu
 </button>
 
 <button 
 onClick={() => window.print()}
 className="print-receipt-btn"
 >
 <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <polyline points="6,9 6,2 18,2 18,9"></polyline>
 <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
 <rect x="6"y="14"width="12"height="8"></rect>
 </svg>
 Ispiši račun
 </button>
 </div>
 </>
 );
};

export default PaymentSuccessMessage; 