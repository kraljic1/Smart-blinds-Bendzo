/**
 * Utility functions for Croatian SEO specific functionality
 */

import { ProductData } from './structuredDataHelpers';

/**
 * Generates Croatian-specific keywords by appending local terms
 */
export const generateCroatianKeywords = (keywords?: string): string => {
 const baseKeywords = 'pametne rolete, automatske rolete, smart home, pametni dom, rolete na daljinski, električne rolete, rolete Zagreb, rolete Hrvatska';
 
 return keywords 
 ? `${keywords}, ${baseKeywords}`
 : baseKeywords;
};

/**
 * Transforms product data for SEO component compatibility
 */
export const transformProductDataForSEO = (productData?: ProductData) => {
 if (!productData) return undefined;

 return {
 price: productData.price,
 currency: productData.currency,
 availability: productData.availability?.toLowerCase() as 'instock' | 'outofstock' | 'preorder',
 condition: productData.condition?.toLowerCase().replace('condition', '') as 'new' | 'used' | 'refurbished',
 brand: productData.brand,
 category: productData.category
 };
}; 