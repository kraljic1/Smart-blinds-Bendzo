import { CookieConsentNotice } from '../CookieConsentNotice';
import { CookieTroubleshootingGuide } from '../CookieTroubleshootingGuide';
import StripeLoadingState from '../StripeLoadingState';
import StripeErrorState from '../StripeErrorState';
import CookieDeclinedState from '../CookieDeclinedState';
import { getBrowserCompatibilityInfo } from '../../../config/stripe';
import { Stripe } from '@stripe/stripe-js';

interface StripeStateRendererProps {
  cookieConsent: string;
  browserInfo: ReturnType<typeof getBrowserCompatibilityInfo> | null;
  stripeLoaded: boolean;
  stripeAvailable: boolean;
  stripePromise: Promise<Stripe | null> | null;
  initializationError: string | null;
  showTroubleshooting: boolean;
  handleCookieAccept: () => void;
  handleCookieDecline: () => void;
  handleRetry: () => void;
  handleRetryFromDeclined: () => void;
  handleShowTroubleshooting: () => void;
  handleCloseTroubleshooting: () => void;
}

export const StripeStateRenderer = (props: StripeStateRendererProps) => {
  // Cookie consent for privacy browsers
  if (props.cookieConsent === 'pending' && props.browserInfo?.isPrivacyMode) {
    return <CookieConsentNotice onAccept={props.handleCookieAccept} onDecline={props.handleCookieDecline} />;
  }

  // Troubleshooting guide
  if (props.showTroubleshooting) {
    return <CookieTroubleshootingGuide onClose={props.handleCloseTroubleshooting} onRetry={props.handleRetry} />;
  }

  // Cookie declined state
  if (props.cookieConsent === 'declined') {
    return <CookieDeclinedState onRetry={props.handleRetryFromDeclined} onShowTroubleshooting={props.handleShowTroubleshooting} />;
  }

  // Loading state
  if (!props.stripeLoaded) {
    return <StripeLoadingState browserInfo={props.browserInfo} />;
  }

  // Error state
  if (!props.stripeAvailable || !props.stripePromise) {
    return <StripeErrorState initializationError={props.initializationError} browserInfo={props.browserInfo} onRetry={props.handleRetry} onShowTroubleshooting={props.handleShowTroubleshooting} />;
  }

  return null; // No special state, continue with normal flow
}; 