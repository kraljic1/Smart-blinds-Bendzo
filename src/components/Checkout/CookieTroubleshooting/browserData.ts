import { BrowserGuides, BrowserType } from './types';

export const browserGuides: BrowserGuides = {
 chrome: {
 title: 'Google Chrome',
 icon: '🌐',
 steps: [
 'Kliknite na ikonu katanca pored URL-a',
 'Izaberite"Cookies"',
 'Omogućite"Third-party cookies"za ovaj sajt',
 'Osvežite stranicu'
 ]
 },
 firefox: {
 title: 'Mozilla Firefox',
 icon: '🦊',
 steps: [
 'Idite na Settings > Privacy & Security',
 'U sekciji"Cookies and Site Data"',
 'Kliknite"Manage Exceptions"',
 'Dodajte ovaj sajt kao izuzetak'
 ]
 },
 safari: {
 title: 'Safari',
 icon: '🧭',
 steps: [
 'Idite na Safari > Preferences',
 'Kliknite na"Privacy"tab',
 'Uklonite kvačicu sa"Prevent cross-site tracking"',
 'Osvežite stranicu'
 ]
 },
 brave: {
 title: 'Brave Browser',
 icon: '🦁',
 steps: [
 'Kliknite na Brave Shield ikonu',
 'Postavite"Cross-site cookies blocked"na"Allow"',
 'Ili isključite Shields za ovaj sajt',
 'Osvežite stranicu'
 ]
 }
};

export const detectBrowser = (): BrowserType => {
 const userAgent = navigator.userAgent.toLowerCase();
 if (userAgent.includes('brave')) return 'brave';
 if (userAgent.includes('firefox')) return 'firefox';
 if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'safari';
 return 'chrome';
}; 