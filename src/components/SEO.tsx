import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'product' | string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonicalUrl?: string;
  children?: React.ReactNode;
  // New Croatian-specific props
  article?: {
    author?: string;
    section?: string;
    tag?: string;
    publishedTime?: string;
    modifiedTime?: string;
  };
  product?: {
    price?: string;
    currency?: string;
    availability?: 'instock' | 'outofstock' | 'preorder';
    condition?: 'new' | 'used' | 'refurbished';
    brand?: string;
    category?: string;
  };
  noindex?: boolean;
  nofollow?: boolean;
}

export default function SEO({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  canonicalUrl,
  children,
  article,
  product,
  noindex = false,
  nofollow = false
}: SEOProps) {
  // Use current URL if ogUrl or canonicalUrl is not provided
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const metaOgUrl = ogUrl || currentUrl;
  const metaCanonicalUrl = canonicalUrl || currentUrl;
  
  // Default OG image
  const defaultOgImage = 'https://bendzosmartblinds.netlify.app/og-image.jpg';
  const metaOgImage = ogImage || defaultOgImage;
  
  // Robots meta tag
  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      
      {/* Language and Location */}
      <html lang="hr" />
      <meta name="language" content="Croatian" />
      <meta name="geo.region" content="HR" />
      <meta name="geo.country" content="Croatia" />
      <meta name="geo.placename" content="Zagreb" />
      
      {/* Author and Copyright */}
      <meta name="author" content="Smartblinds Hrvatska" />
      <meta name="copyright" content={`© ${new Date().getFullYear()} Smartblinds Hrvatska. Sva prava pridržana.`} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={metaOgUrl} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Smartblinds Hrvatska" />
      <meta property="og:locale" content="hr_HR" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Article-specific Open Graph tags */}
      {article && (
        <>
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tag && <meta property="article:tag" content={article.tag} />}
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
        </>
      )}
      
      {/* Product-specific Open Graph tags */}
      {product && (
        <>
          {product.price && <meta property="product:price:amount" content={product.price} />}
          {product.currency && <meta property="product:price:currency" content={product.currency} />}
          {product.availability && <meta property="product:availability" content={product.availability} />}
          {product.condition && <meta property="product:condition" content={product.condition} />}
          {product.brand && <meta property="product:brand" content={product.brand} />}
          {product.category && <meta property="product:category" content={product.category} />}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@smartblinds_hr" />
      <meta name="twitter:creator" content="@smartblinds_hr" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="application-name" content="Smartblinds Hrvatska" />
      <meta name="apple-mobile-web-app-title" content="Smartblinds" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metaCanonicalUrl} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Additional Meta Tags */}
      {children}
    </Helmet>
  );
} 