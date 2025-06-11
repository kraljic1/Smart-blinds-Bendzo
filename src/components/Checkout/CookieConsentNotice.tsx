import { useState, useEffect } from 'react';

interface CookieConsentNoticeProps {
 onAccept: () => void;
 onDecline: () => void;
}

export function CookieConsentNotice({ onAccept, onDecline }: CookieConsentNoticeProps) {
 const [isVisible, setIsVisible] = useState(false);
 const [showDetails, setShowDetails] = useState(false);

 useEffect(() => {
 // Check if user has already made a choice
 const consent = localStorage.getItem('stripe-cookie-consent');
 if (!consent) {
 setIsVisible(true);
 } else if (consent === 'accepted') {
 onAccept();
 } else {
 onDecline();
 }
 }, [onAccept, onDecline]);

const handleAccept = () => {
 try {
 localStorage.setItem('stripe-cookie-consent', 'accepted');
 setIsVisible(false);
 onAccept();
 } catch (error) {
 console.error('Error saving consent to localStorage:', error);
 // Still proceed with acceptance for this session
 setIsVisible(false);
 onAccept();
 }
 };

 const handleDecline = () => {
 try {
 localStorage.setItem('stripe-cookie-consent', 'declined');
 setIsVisible(false);
 onDecline();
 } catch (error) {
 console.error('Error saving consent to localStorage:', error);
 // Still proceed with decline for this session
 setIsVisible(false);
 onDecline();
 }
 };

 if (!isVisible) {
 return null;
 }

 return (
 <div className="cookie-consent-overlay">
 <div className="cookie-consent-modal">
 <div className="cookie-consent-header">
 <h3>Kolačići za plaćanje</h3>
 <div className="security-badge">
 <span className="security-icon">🔒</span>
 <span>Sigurno plaćanje</span>
 </div>
 </div>
 
 <div className="cookie-consent-content">
 <p>
 Za sigurno procesiranje plaćanja koristimo Stripe servis koji postavlja kolačiće 
 potrebne za funkcionalnost plaćanja. Ovi kolačići su neophodni za:
 </p>
 
 <ul>
 <li>Sigurno procesiranje vaše kartice</li>
 <li>Sprečavanje prevara</li>
 <li>Održavanje sesije tokom plaćanja</li>
 <li>Usklađenost sa PCI DSS standardima</li>
 </ul>
 
 <div className="warning-notice">
 <span className="warning-icon">⚠️</span>
 <p>
 <strong>Napomena:</strong> Bez ovih kolačića nećete moći da završite plaćanje karticom.
 Možete izabrati plaćanje gotovinom pri dostavi.
 </p>
 </div>

 {showDetails && (
 <div className="technical-details">
 <h4>Tehnički detalji:</h4>
 <p>
 Stripe koristi kolačiće sa atributima <code>SameSite=None; Secure</code> 
 koji omogućavaju sigurnu komunikaciju između različitih domena. 
 Ovo je standardna praksa za sigurne platne sisteme.
 </p>
 <p>
 Vaši podaci se obrađuju u skladu sa GDPR propisima i Stripe-ovom 
 politikom privatnosti.
 </p>
 </div>
 )}
 </div>
 
 <div className="cookie-consent-actions">
 <button 
 onClick={handleAccept}
 className="cookie-consent-accept"
 >
 Prihvatam kolačiće
 </button>
 <button 
 onClick={handleDecline}
 className="cookie-consent-decline"
 >
 Odbijam (samo gotovina)
 </button>
 <button 
 onClick={() => setShowDetails(!showDetails)}
 className="cookie-consent-details"
 >
 {showDetails ? 'Sakrij detalje' : 'Više detalja'}
 </button>
 </div>
 </div>
 </div>
 );
} 