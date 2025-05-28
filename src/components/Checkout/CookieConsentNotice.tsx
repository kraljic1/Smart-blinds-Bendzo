import { useState, useEffect } from 'react';
import './CookieConsentNotice.css';

interface CookieConsentNoticeProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieConsentNotice({ onAccept, onDecline }: CookieConsentNoticeProps) {
  const [isVisible, setIsVisible] = useState(false);

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
          </ul>
          
          <p>
            <strong>Napomena:</strong> Bez ovih kolačića nećete moći da završite plaćanje karticom.
          </p>
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
        </div>
      </div>
    </div>
  );
} 