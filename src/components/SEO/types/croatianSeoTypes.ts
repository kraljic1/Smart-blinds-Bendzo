/**
 * Type definitions for Croatian SEO components
 */

import { ProductData, Breadcrumb, PageType } from '../utils/structuredDataHelpers';

export interface CroatianSEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'product';
  pageType?: PageType;
  productData?: ProductData;
  breadcrumbs?: Breadcrumb[];
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

// Re-export types for convenience
export type { ProductData, Breadcrumb, PageType }; 