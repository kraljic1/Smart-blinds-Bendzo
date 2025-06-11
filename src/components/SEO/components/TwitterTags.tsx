// React import not needed with new JSX transform

interface TwitterTagsProps {
 title: string;
 description: string;
 twitterCard: string;
 ogImage: string;
}

/**
 * Component for rendering Twitter Card meta tags
 */
export const TwitterTags: React.FC<TwitterTagsProps> = ({
 title,
 description,
 twitterCard,
 ogImage
}) => {
 return (
 <>
 {/* Twitter Card Meta Tags */}
 <meta name="twitter:card"content={twitterCard} />
 <meta name="twitter:title"content={title} />
 <meta name="twitter:description"content={description} />
 <meta name="twitter:image"content={ogImage} />
 <meta name="twitter:image:alt"content={title} />
 <meta name="twitter:site"content="@smartblinds_hr"/>
 <meta name="twitter:creator"content="@smartblinds_hr"/>
 </>
 );
}; 