/**
 * Utility functions for generating meta tag values and handling SEO-related logic
 */

/**
 * Gets the current URL or falls back to provided URL
 */
export const getCurrentUrl = (): string => {
 return typeof window !== 'undefined' ? window.location.href : '';
};

/**
 * Resolves the meta URL with fallback to current URL
 */
export const resolveMetaUrl = (providedUrl?: string): string => {
 return providedUrl || getCurrentUrl();
};

/**
 * Resolves the OG image with fallback to default
 */
export const resolveOgImage = (providedImage?: string): string => {
 const defaultOgImage = 'https://bendzosmartblinds.netlify.app/og-image.jpg';
 return providedImage || defaultOgImage;
};

/**
 * Generates robots meta content based on noindex and nofollow flags
 */
export const generateRobotsContent = (noindex: boolean, nofollow: boolean): string => {
 const indexValue = noindex ? 'noindex' : 'index';
 const followValue = nofollow ? 'nofollow' : 'follow';
 return `${indexValue},${followValue}`;
};

/**
 * Generates copyright text with current year
 */
export const generateCopyrightText = (): string => {
 const currentYear = new Date().getFullYear();
 return `© ${currentYear} Smartblinds Hrvatska. Sva prava pridržana.`;
}; 