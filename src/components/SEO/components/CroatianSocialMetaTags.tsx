interface CroatianSocialMetaTagsProps {
 title: string;
 description: string;
 ogType: string;
 metaOgUrl: string;
 metaOgImage: string;
}

export const CroatianSocialMetaTags: React.FC<CroatianSocialMetaTagsProps> = ({
 title,
 description,
 ogType,
 metaOgUrl,
 metaOgImage
}) => {
 return (
 <>
 {/* Open Graph Meta Tags */}
 <meta property="og:title"content={title} />
 <meta property="og:description"content={description} />
 <meta property="og:type"content={ogType} />
 <meta property="og:url"content={metaOgUrl} />
 <meta property="og:image"content={metaOgImage} />
 <meta property="og:image:width"content="1200"/>
 <meta property="og:image:height"content="630"/>
 <meta property="og:image:alt"content={title} />
 <meta property="og:site_name"content="Smartblinds Hrvatska"/>
 <meta property="og:locale"content="hr_HR"/>
 <meta property="og:locale:alternate"content="en_US"/>

 {/* Twitter Meta Tags */}
 <meta name="twitter:card"content="summary_large_image"/>
 <meta name="twitter:title"content={title} />
 <meta name="twitter:description"content={description} />
 <meta name="twitter:image"content={metaOgImage} />
 </>
 );
}; 