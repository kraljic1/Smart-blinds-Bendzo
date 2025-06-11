// React import not needed with new JSX transform
import { ArticleData, ProductData } from '../types/seoTypes';
import { ArticleTags } from './ArticleTags';
import { ProductTags } from './ProductTags';

interface OpenGraphTagsProps {
 title: string;
 description: string;
 ogType: string;
 ogUrl: string;
 ogImage: string;
 article?: ArticleData;
 product?: ProductData;
}

/**
 * Component for rendering Open Graph meta tags
 */
export const OpenGraphTags: React.FC<OpenGraphTagsProps> = ({
 title,
 description,
 ogType,
 ogUrl,
 ogImage,
 article,
 product
}) => {
 return (
 <>
 {/* Open Graph Meta Tags */}
 <meta property="og:title"content={title} />
 <meta property="og:description"content={description} />
 <meta property="og:type"content={ogType} />
 <meta property="og:url"content={ogUrl} />
 <meta property="og:image"content={ogImage} />
 <meta property="og:image:width"content="1200"/>
 <meta property="og:image:height"content="630"/>
 <meta property="og:image:alt"content={title} />
 <meta property="og:site_name"content="Smartblinds Hrvatska"/>
 <meta property="og:locale"content="hr_HR"/>
 <meta property="og:locale:alternate"content="en_US"/>
 
 {/* Article-specific Open Graph tags */}
 <ArticleTags article={article} />
 
 {/* Product-specific Open Graph tags */}
 <ProductTags product={product} />
 </>
 );
}; 