import { useState, useEffect } from 'react';

interface UseCookieConsentProps {
 isPrivacyMode: boolean;
 onInitializeStripe: () => void;
 onPaymentError: (error: string) => void;
}

export const useCookieConsent = ({ 
 isPrivacyMode, 
 onInitializeStripe, 
 onPaymentError 
}: UseCookieConsentProps) => {
 const [cookieConsent, setCookieConsent] = useState<'pending' | 'accepted' | 'declined'>('pending');

 useEffect(() => {
 // Check existing cookie consent
 const consent = localStorage.getItem('stripe-cookie-consent');
 if (consent === 'accepted') {
 setCookieConsent('accepted');
 onInitializeStripe();
 } else if (consent === 'declined') {
 setCookieConsent('declined');
 } else if (!isPrivacyMode) {
 // For non-privacy browsers, auto-accept and initialize
 setCookieConsent('accepted');
 localStorage.setItem('stripe-cookie-consent', 'accepted');
 onInitializeStripe();
 }
 }, [isPrivacyMode, onInitializeStripe]);

 const handleCookieAccept = () => {
 setCookieConsent('accepted');
 localStorage.setItem('stripe-cookie-consent', 'accepted');
 onInitializeStripe();
 };

 const handleCookieDecline = () => {
 setCookieConsent('declined');
 localStorage.setItem('stripe-cookie-consent', 'declined');
 onPaymentError('Plaćanje karticom nije dostupno bez prihvatanja kolačića. Molimo izaberite gotovinu kao način plaćanja.');
 };

 const resetConsent = () => {
 localStorage.removeItem('stripe-cookie-consent');
 setCookieConsent('pending');
 };

 return {
 cookieConsent,
 handleCookieAccept,
 handleCookieDecline,
 resetConsent
 };
}; 