// React import not needed with new JSX transform

interface AdditionalTagsProps {
 canonicalUrl: string;
}

/**
 * Component for rendering additional meta tags, theme colors, and preconnect links
 * Note: This component is now a placeholder since meta tags should be managed in the document head
 */
export const AdditionalTags: React.FC<AdditionalTagsProps> = () => {
 // Meta tags should be managed in the document head, not rendered as React components
 // This component is kept for compatibility but doesn't render anything
 return null;
}; 