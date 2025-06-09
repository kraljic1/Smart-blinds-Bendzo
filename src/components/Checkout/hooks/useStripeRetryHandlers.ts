import { useState } from 'react';

interface UseStripeRetryHandlersProps {
  resetConsent: () => void;
  resetStripe: () => void;
}

export const useStripeRetryHandlers = ({
  resetConsent,
  resetStripe
}: UseStripeRetryHandlersProps) => {
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const handleRetry = () => {
    setShowTroubleshooting(false);
    resetConsent();
    resetStripe();
  };

  const handleRetryFromDeclined = () => {
    resetConsent();
  };

  const handleShowTroubleshooting = () => {
    setShowTroubleshooting(true);
  };

  const handleCloseTroubleshooting = () => {
    setShowTroubleshooting(false);
  };

  return {
    showTroubleshooting,
    handleRetry,
    handleRetryFromDeclined,
    handleShowTroubleshooting,
    handleCloseTroubleshooting
  };
}; 