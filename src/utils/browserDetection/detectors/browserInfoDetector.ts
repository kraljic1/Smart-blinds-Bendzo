import { detectBrave } from './braveDetector';
import { BrowserInfo } from '../types/browserTypes';

/**
 * Detect Safari browser with accurate logic
 */
export function detectSafari(userAgent: string, isBrave: boolean): boolean {
 return userAgent.includes('Safari') && 
 !userAgent.includes('Chrome') && 
 !userAgent.includes('Chromium') &&
 !isBrave;
}

/**
 * Detect Chrome browser (excluding Brave and Safari)
 */
export function detectChrome(userAgent: string, isBrave: boolean, isSafari: boolean): boolean {
 return userAgent.includes('Chrome') && !isBrave && !isSafari;
}

/**
 * Get comprehensive browser information
 */
export async function getBrowserInfo(): Promise<BrowserInfo> {
 const userAgent = navigator.userAgent;
 const isBrave = await detectBrave();
 const isSafari = detectSafari(userAgent, isBrave);
 
 return {
 isBrave,
 isChrome: detectChrome(userAgent, isBrave, isSafari),
 isFirefox: userAgent.includes('Firefox'),
 isSafari,
 isEdge: userAgent.includes('Edge'),
 userAgent
 };
} 