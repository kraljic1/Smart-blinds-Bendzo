interface CroatianSocialMetaTagsProps {
 title: string;
 description: string;
 ogType: string;
 metaOgUrl: string;
 metaOgImage: string;
}

/**
 * Component for rendering Croatian social meta tags
 * Note: This component is now a placeholder since meta tags should be managed in the document head
 */
export const CroatianSocialMetaTags: React.FC<CroatianSocialMetaTagsProps> = () => {
 // Meta tags should be managed in the document head, not rendered as React components
 // This component is kept for compatibility but doesn't render anything
 return null;
}; 