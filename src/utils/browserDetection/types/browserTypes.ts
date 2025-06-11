/**
 * Browser detection type definitions
 */

// Extend global interfaces for browser-specific properties
declare global {
 interface Navigator {
 brave?: {
 isBrave: () => Promise<boolean>;
 };
 }
 
 interface Window {
 chrome?: {
 runtime?: {
 onConnect?: unknown;
 getManifest?: () => unknown;
 };
 };
 }
}

export interface BrowserInfo {
 isBrave: boolean;
 isChrome: boolean;
 isFirefox: boolean;
 isSafari: boolean;
 isEdge: boolean;
 userAgent: string;
}

export interface StripeCompatibilityResult {
 isBlocked: boolean;
 canLoadStripe: boolean;
 recommendations: string[];
}

export interface PaymentInstructions {
 title: string;
 instructions: string[];
 troubleshootingOptions: string[];
} 