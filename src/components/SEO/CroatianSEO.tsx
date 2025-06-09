import SEO from './SEO';
import { CroatianSEOProps } from './types/croatianSeoTypes';
import { generateStructuredData } from './utils/structuredDataHelpers';
import { generateCroatianKeywords, transformProductDataForSEO } from './utils/croatianSeoHelpers';
import { CroatianMetaTags } from './components/CroatianMetaTags';
import { StructuredDataScript } from './components/StructuredDataScript';

/**
 * Croatian SEO component that provides localized SEO optimization for Croatian market
 */
export default function CroatianSEO({
  title,
  description,
  keywords,
  ogType = 'website',
  pageType = 'info',
  productData,
  breadcrumbs
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

  // Transform product data for SEO component
  const seoProductData = transformProductDataForSEO(productData);

  return (
    <SEO
      title={title}
      description={description}
      keywords={croatianKeywords}
      ogType={ogType}
      product={seoProductData}
    >
      <CroatianMetaTags />
      <StructuredDataScript data={structuredData} />
    </SEO>
  );
} 