import { CroatianSEOProps } from '../types/croatianSeoTypes';
import { generateStructuredData } from '../utils/structuredDataHelpers';
import { generateCroatianKeywords } from '../utils/croatianSeoHelpers';
import { resolveMetaUrl, resolveOgImage, generateRobotsContent, generateCopyrightText } from '../utils/metaTagHelpers';

interface UseSEODataReturn {
  structuredData: Record<string, unknown> | Record<string, unknown>[];
  croatianKeywords: string;
  metaOgUrl: string;
  metaCanonicalUrl: string;
  metaOgImage: string;
  robotsContent: string;
  copyrightText: string;
}

export const useSEOData = ({
  keywords,
  pageType = 'info',
  description,
  productData,
  breadcrumbs,
  ogUrl,
  canonicalUrl,
  ogImage,
  noindex = false,
  nofollow = false
}: Pick<CroatianSEOProps, 'keywords' | 'pageType' | 'description' | 'productData' | 'breadcrumbs' | 'ogUrl' | 'canonicalUrl' | 'ogImage' | 'noindex' | 'nofollow'>): UseSEODataReturn => {
  
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

  return {
    structuredData,
    croatianKeywords,
    metaOgUrl,
    metaCanonicalUrl,
    metaOgImage,
    robotsContent,
    copyrightText
  };
}; 