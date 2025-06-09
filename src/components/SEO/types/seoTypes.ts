import { ReactNode } from 'react';

/**
 * Type definitions for SEO components
 */

export interface ArticleData {
  author?: string;
  section?: string;
  tag?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export interface ProductData {
  price?: string;
  currency?: string;
  availability?: 'instock' | 'outofstock' | 'preorder';
  condition?: 'new' | 'used' | 'refurbished';
  brand?: string;
  category?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'product' | string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonicalUrl?: string;
  children?: ReactNode;
  article?: ArticleData;
  product?: ProductData;
  noindex?: boolean;
  nofollow?: boolean;
} 