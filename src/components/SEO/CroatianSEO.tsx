import { Helmet } from 'react-helmet-async';
import { CroatianSEOProps } from './types/croatianSeoTypes';
import { useSEOData } from './hooks';
import {
  CroatianBasicMetaTags,
  CroatianSocialMetaTags,
  CroatianLocalBusinessMetaTags,
  CroatianLinksAndStructuredData
} from './components';

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
  
  const {
    structuredData,
    croatianKeywords,
    metaOgUrl,
    metaCanonicalUrl,
    metaOgImage,
    robotsContent,
    copyrightText
  } = useSEOData({
    keywords,
    pageType,
    description,
    productData,
    breadcrumbs,
    ogUrl,
    canonicalUrl,
    ogImage,
    noindex,
    nofollow
  });

  return (
    <Helmet>
      <CroatianBasicMetaTags
        title={title}
        description={description}
        croatianKeywords={croatianKeywords}
        robotsContent={robotsContent}
        copyrightText={copyrightText}
      />
      
      <CroatianSocialMetaTags
        title={title}
        description={description}
        ogType={ogType}
        metaOgUrl={metaOgUrl}
        metaOgImage={metaOgImage}
      />
      
      <CroatianLocalBusinessMetaTags />
      
      <CroatianLinksAndStructuredData
        metaCanonicalUrl={metaCanonicalUrl}
        structuredData={structuredData}
      />
    </Helmet>
  );
} 