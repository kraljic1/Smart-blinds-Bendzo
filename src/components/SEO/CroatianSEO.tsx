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
 * Uses React 19's native document metadata support
 */
export default function CroatianSEO(props: CroatianSEOProps) {
  const {
    title, description, keywords, ogType = 'website', pageType = 'info',
    productData, breadcrumbs, ogImage, ogUrl, canonicalUrl,
    noindex = false, nofollow = false
  } = props;
  
  const seoData = useSEOData({
    keywords, pageType, description, productData, breadcrumbs,
    ogUrl, canonicalUrl, ogImage, noindex, nofollow
  });

  return (
    <>
      <CroatianBasicMetaTags
        title={title}
        description={description}
        croatianKeywords={seoData.croatianKeywords}
        robotsContent={seoData.robotsContent}
        copyrightText={seoData.copyrightText}
      />
      <CroatianSocialMetaTags
        title={title}
        description={description}
        ogType={ogType}
        metaOgUrl={seoData.metaOgUrl}
        metaOgImage={seoData.metaOgImage}
      />
      <CroatianLocalBusinessMetaTags />
      <CroatianLinksAndStructuredData
        metaCanonicalUrl={seoData.metaCanonicalUrl}
        structuredData={seoData.structuredData}
      />
    </>
  );
} 