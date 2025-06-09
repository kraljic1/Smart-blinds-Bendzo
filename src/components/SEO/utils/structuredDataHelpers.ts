/**
 * Utility functions for generating structured data for Croatian SEO
 */

export interface ProductData {
  name: string;
  price?: string;
  currency?: string;
  category: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  condition?: 'NewCondition' | 'UsedCondition';
  brand?: string;
  image?: string;
  sku?: string;
}

export interface Breadcrumb {
  name: string;
  item: string;
}

export type PageType = 'home' | 'product' | 'category' | 'info' | 'contact';

/**
 * Generates base organization structured data
 */
export const generateOrganizationData = () => ({
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
});

/**
 * Generates website structured data for home page
 */
export const generateWebsiteData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Smartblinds Hrvatska",
  "url": "https://bendzosmartblinds.netlify.app",
  "description": "Pametne rolete koje se prilagođavaju vašem rasporedu, štede energiju i stvaraju savršen ambijent u vašem domu.",
  "inLanguage": "hr"
});

/**
 * Generates product structured data
 */
export const generateProductData = (productData: ProductData, description: string) => ({
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

/**
 * Generates breadcrumb structured data
 */
export const generateBreadcrumbData = (breadcrumbs: Breadcrumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.item
  }))
});

/**
 * Generates complete structured data array based on page type and data
 */
export const generateStructuredData = (
  pageType: PageType,
  description: string,
  productData?: ProductData,
  breadcrumbs?: Breadcrumb[]
): Record<string, unknown>[] => {
  const structuredData: Record<string, unknown>[] = [generateOrganizationData()];

  if (pageType === 'home') {
    structuredData.push(generateWebsiteData());
  }

  if (pageType === 'product' && productData) {
    structuredData.push(generateProductData(productData, description));
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    structuredData.push(generateBreadcrumbData(breadcrumbs));
  }

  return structuredData;
}; 