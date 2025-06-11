// React import not needed with new JSX transform
import { SEOProps } from './types/seoTypes';
import { resolveMetaUrl, resolveOgImage } from './utils/metaTagHelpers';
import { BasicMetaTags } from './components/BasicMetaTags';
import { OpenGraphTags } from './components/OpenGraphTags';
import { TwitterTags } from './components/TwitterTags';
import { AdditionalTags } from './components/AdditionalTags';

/**
 * Main SEO component that orchestrates all meta tags for optimal search engine optimization
 * Note: This component no longer wraps content in Helmet to prevent nesting issues.
 * Pages should wrap this component in their own Helmet.
 */
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
 // Resolve URLs and images with fallbacks
 const metaOgUrl = resolveMetaUrl(ogUrl);
 const metaCanonicalUrl = resolveMetaUrl(canonicalUrl);
 const metaOgImage = resolveOgImage(ogImage);

 return (
 <>
 <BasicMetaTags
 title={title}
 description={description}
 keywords={keywords}
 noindex={noindex}
 nofollow={nofollow}
 />
 
 <OpenGraphTags
 title={title}
 description={description}
 ogType={ogType}
 ogUrl={metaOgUrl}
 ogImage={metaOgImage}
 article={article}
 product={product}
 />
 
 <TwitterTags
 title={title}
 description={description}
 twitterCard={twitterCard}
 ogImage={metaOgImage}
 />
 
 <AdditionalTags canonicalUrl={metaCanonicalUrl} />
 
 {/* Additional Meta Tags */}
 {children}
 </>
 );
} 