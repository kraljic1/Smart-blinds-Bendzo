import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from './SEO';

interface CroatianSEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'product';
  pageType?: 'home' | 'product' | 'category' | 'info' | 'contact';
  productData?: {
    name: string;
    price?: string;
    currency?: string;
    category: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    condition?: 'NewCondition' | 'UsedCondition';
    brand?: string;
    image?: string;
    sku?: string;
  };
  breadcrumbs?: Array<{
    name: string;
    item: string;
  }>;
}

export default function CroatianSEO({
  title,
  description,
  keywords,
  ogType = 'website',
  pageType = 'info',
  productData,
  breadcrumbs
}: CroatianSEOProps) {
  
  // Generate structured data based on page type
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Smartblinds Hrvatska",
      "url": "https://bendzosmartblinds.netlify.app",
      "logo": "https://bendzosmartblinds.netlify.app/logo.png",
      "description": "Pametne rolete i zavjese za moderni dom - Smartblinds Hrvatska",
      "telephone": "+385-1-2345-678",
      "email": "info@smartblinds.hr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ilica 123",
        "addressLocality": "Zagreb",
        "postalCode": "10000",
        "addressCountry": "HR"
      },
      "sameAs": [
        "https://www.facebook.com/smartblindshrvaska",
        "https://www.instagram.com/smartblinds_hr"
      ]
    };

    const structuredData: Record<string, unknown>[] = [baseData];

    // Add WebSite structured data for home page
    if (pageType === 'home') {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Smartblinds Hrvatska",
        "url": "https://bendzosmartblinds.netlify.app",
        "description": "Pametne rolete koje se prilagođavaju vašem rasporedu, štede energiju i stvaraju savršen ambijent u vašem domu.",
        "inLanguage": "hr"
      });
    }

    // Add Product structured data
    if (pageType === 'product' && productData) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productData.name,
        "description": description,
        "category": productData.category,
        "brand": {
          "@type": "Brand",
          "name": productData.brand || "Smartblinds"
        },
        "image": productData.image || "https://bendzosmartblinds.netlify.app/og-image.jpg",
        "sku": productData.sku,
        "offers": {
          "@type": "Offer",
          "price": productData.price,
          "priceCurrency": productData.currency || "EUR",
          "availability": `https://schema.org/${productData.availability || 'InStock'}`,
          "itemCondition": `https://schema.org/${productData.condition || 'NewCondition'}`,
          "seller": {
            "@type": "Organization",
            "name": "Smartblinds Hrvatska"
          }
        }
      });
    }

    // Add BreadcrumbList structured data
    if (breadcrumbs && breadcrumbs.length > 0) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.item
        }))
      });
    }

    return structuredData;
  };

  const structuredData = generateStructuredData();

  // Croatian-specific keywords
  const croatianKeywords = keywords 
    ? `${keywords}, pametne rolete, automatske rolete, smart home, pametni dom, rolete na daljinski, električne rolete, rolete Zagreb, rolete Hrvatska`
    : 'pametne rolete, automatske rolete, smart home, pametni dom, rolete na daljinski, električne rolete, rolete Zagreb, rolete Hrvatska';

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={croatianKeywords}
        ogType={ogType}
        product={productData ? {
          price: productData.price,
          currency: productData.currency,
          availability: productData.availability?.toLowerCase() as 'instock' | 'outofstock' | 'preorder',
          condition: productData.condition?.toLowerCase().replace('condition', '') as 'new' | 'used' | 'refurbished',
          brand: productData.brand,
          category: productData.category
        } : undefined}
      />
      
      <Helmet>
        {/* Croatian Language Meta Tags */}
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
        
        {/* Croatian Specific Social Meta */}
        <meta property="og:locale" content="hr_HR" />
        <meta property="og:locale:alternate" content="en_US" />
        
        {/* Content Language */}
        <meta httpEquiv="content-language" content="hr" />
        
        {/* Currency and Pricing */}
        <meta name="currency" content="EUR" />
        <meta name="price_range" content="€€" />
        
        {/* Local SEO */}
        <meta name="geo.region" content="HR-21" />
        <meta name="geo.placename" content="Zagreb, Hrvatska" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData, null, 2)}
        </script>
      </Helmet>
    </>
  );
} 