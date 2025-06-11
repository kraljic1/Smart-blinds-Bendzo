// React import not needed with new JSX transform

interface TwitterTagsProps {
 title: string;
 description: string;
 twitterCard: string;
 ogImage: string;
}

/**
 * Component for rendering Twitter Card meta tags
 * Note: This component is now a placeholder since meta tags should be managed in the document head
 */
export const TwitterTags: React.FC<TwitterTagsProps> = () => {
 // Meta tags should be managed in the document head, not rendered as React components
 // This component is kept for compatibility but doesn't render anything
 return null;
}; 