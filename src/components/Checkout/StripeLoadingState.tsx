import React from 'react';
import { getBrowserCompatibilityInfo } from '../../config/stripe';

interface StripeLoadingStateProps {
  browserInfo: ReturnType<typeof getBrowserCompatibilityInfo> | null;
}

const StripeLoadingState: React.FC<StripeLoadingStateProps> = ({ browserInfo }) => {
  return (
    <div className="stripe-loading">
      <div className="loading-spinner"></div>
      <p>
        {browserInfo?.isPrivacyMode 
          ? 'Učitavam Stripe sa poboljšanom kompatibilnošću...' 
          : 'Učitavam Stripe...'
        }
      </p>
      {browserInfo?.isPrivacyMode && (
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '8px' }}>
          Detektovan je privatni preglednik. Koristim optimizovanu strategiju učitavanja.
        </p>
      )}
    </div>
  );
};

export default StripeLoadingState; 