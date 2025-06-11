// React import not needed with new JSX transform

interface OpenGraphTagsProps {
 title: string;
 description: string;
 ogType: string;
 ogUrl: string;
 ogImage: string;
 article?: object;
 product?: object;
}

/**
 * Component for rendering Open Graph meta tags
 * Note: This component is now a placeholder since meta tags should be managed in the document head
 */
export const OpenGraphTags: React.FC<OpenGraphTagsProps> = () => {
 // Meta tags should be managed in the document head, not rendered as React components
 // This component is kept for compatibility but doesn't render anything
 return null;
}; 