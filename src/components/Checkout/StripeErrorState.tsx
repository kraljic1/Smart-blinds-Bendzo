import React from 'react';
import { getBrowserCompatibilityInfo } from '../../config/stripe';
import { BraveBrowserGuide } from './BraveBrowserGuide';

interface StripeErrorStateProps {
 initializationError: string | null;
 browserInfo: ReturnType<typeof getBrowserCompatibilityInfo> | null;
 onRetry: () => void;
 onShowTroubleshooting: () => void;
}

const StripeErrorState: React.FC<StripeErrorStateProps> = ({
 initializationError,
 browserInfo,
 onRetry,
 onShowTroubleshooting
}) => {
 return (
 <div className="stripe-error">
 <h3>Problem sa učitavanjem plaćanja</h3>
 <p>{initializationError || 'Stripe servis trenutno nije dostupan.'}</p>
 {browserInfo?.isPrivacyMode && (
 <div style={{ 
 background: '#f0f9ff', 
 padding: '12px', 
 borderRadius: '6px', 
 margin: '16px 0', 
 fontSize: '0.9rem' 
 }}>
 <strong>Privatni preglednik detektovan:</strong> {
 browserInfo.isBrave 
 ? 'Brave' 
 : browserInfo.isFirefoxStrict 
 ? 'Firefox (strikt mod)' 
 : 'Safari'
 }
 <br />
 Pokušavam sa poboljšanim strategijama učitavanja...
 </div>
 )}
 <div className="error-actions">
 <button onClick={onRetry} className="retry-button">
 Pokušaj ponovo
 </button>
 <button 
 onClick={onShowTroubleshooting}
 className="help-button"
 >
 Rešavanje problema
 </button>
 </div>
 <BraveBrowserGuide onRetry={onRetry} />
 </div>
 );
};

export default StripeErrorState; 