import { Helmet } from 'react-helmet-async';
import { CroatianSEOProps } from './types/croatianSeoTypes';
import { generateStructuredData } from './utils/structuredDataHelpers';
import { generateCroatianKeywords } from './utils/croatianSeoHelpers';
import { resolveMetaUrl, resolveOgImage } from './utils/metaTagHelpers';
import { generateRobotsContent, generateCopyrightText } from './utils/metaTagHelpers';

/**
 * Croatian SEO component that provides localized SEO optimization for Croatian market
 * Fixed to avoid Helmet nesting issues - all meta tags are directly inside Helmet
 */
export default function CroatianSEO({
  title,
  description,
  keywords,
  ogType = 'website',
  pageType = 'info',
  productData,
  breadcrumbs,
  ogImage,
  ogUrl,
  canonicalUrl,
  noindex = false,
  nofollow = false
}: CroatianSEOProps) {
  
  // Generate structured data for the page
  const structuredData = generateStructuredData(
    pageType,
    description,
    productData,
    breadcrumbs
  );

  // Generate Croatian-specific keywords
  const croatianKeywords = generateCroatianKeywords(keywords);

  // Resolve URLs and images with fallbacks
  const metaOgUrl = resolveMetaUrl(ogUrl);
  const metaCanonicalUrl = resolveMetaUrl(canonicalUrl);
  const metaOgImage = resolveOgImage(ogImage);
  const robotsContent = generateRobotsContent(noindex, nofollow);
  const copyrightText = generateCopyrightText();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {croatianKeywords && <meta name="keywords" content={croatianKeywords} />}
      <meta name="robots" content={robotsContent} />
      
      {/* Language and Location */}
      <html lang="hr" />
      <meta name="language" content="Croatian" />
      <meta name="geo.region" content="HR" />
      <meta name="geo.country" content="Croatia" />
      <meta name="geo.placename" content="Zagreb" />
      
      {/* Author and Copyright */}
      <meta name="author" content="Smartblinds Hrvatska" />
      <meta name="copyright" content={copyrightText} />

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

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaOgImage} />

      {/* Croatian-specific Meta Tags */}
      <meta name="geo.position" content="45.815;15.9819" />
      <meta name="ICBM" content="45.815, 15.9819" />
      <meta name="dc.language" content="hr" />
      
      {/* Local Business Information */}
      <meta name="business:contact_data:street_address" content="Ilica 123" />
      <meta name="business:contact_data:locality" content="Zagreb" />
      <meta name="business:contact_data:region" content="Zagreb" />
      <meta name="business:contact_data:postal_code" content="10000" />
      <meta name="business:contact_data:country_name" content="Hrvatska" />
      <meta name="business:contact_data:phone_number" content="+385-1-2345-678" />
      <meta name="business:contact_data:email" content="info@smartblinds.hr" />
      
      {/* Content Language */}
      <meta httpEquiv="content-language" content="hr" />
      
      {/* Currency and Pricing */}
      <meta name="currency" content="EUR" />
      <meta name="price_range" content="€€" />
      
      {/* Local SEO */}
      <meta name="geo.region" content="HR-21" />
      <meta name="geo.placename" content="Zagreb, Hrvatska" />

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

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
} 