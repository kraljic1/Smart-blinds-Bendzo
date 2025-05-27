import React from 'react';
import { Helmet } from 'react-helmet-async';

// Types for structured data objects
type WebsiteData = {
  name: string;
  url: string;
  potentialAction?: {
    target: string;
  };
};

type BreadcrumbListItem = {
  position: number;
  name: string;
  item: string;
};

type BreadcrumbList = {
  itemListElement: BreadcrumbListItem[];
};

type ProductData = {
  name: string;
  image: string | string[];
  description: string;
  sku?: string;
  brand?: {
    name: string;
  };
  offers?: {
    price: number;
    priceCurrency: string;
    availability: string;
    url?: string;
  };
};

// Main component props
interface StructuredDataProps {
  type: 'website' | 'product' | 'breadcrumb';
  data: WebsiteData | ProductData | BreadcrumbList;
}

/**
 * Component for adding structured data (JSON-LD) to pages for improved SEO
 */
const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  // Prepare the JSON-LD structured data based on the type
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          ...data,
          potentialAction: (data as WebsiteData).potentialAction
            ? {
                '@type': 'SearchAction',
                target: (data as WebsiteData).potentialAction?.target,
              }
            : undefined,
        };

      case 'product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          ...(data as ProductData),
          offers: (data as ProductData).offers
            ? {
                '@type': 'Offer',
                ...(data as ProductData).offers,
              }
            : undefined,
          brand: (data as ProductData).brand
            ? {
                '@type': 'Brand',
                ...(data as ProductData).brand,
              }
            : undefined,
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: ((data as BreadcrumbList).itemListElement || []).map((item) => ({
            '@type': 'ListItem',
            ...item,
          })),
        };

      default:
        return {};
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(getStructuredData())}</script>
    </Helmet>
  );
};

export default StructuredData; 