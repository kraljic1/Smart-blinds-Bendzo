// React import not needed with new JSX transform

interface BasicMetaTagsProps {
 title: string;
 description: string;
 keywords?: string;
 noindex: boolean;
 nofollow: boolean;
}

/**
 * Component for rendering basic meta tags including title, description, and robots
 * Note: This component is now a placeholder since meta tags should be managed in the document head
 */
export const BasicMetaTags: React.FC<BasicMetaTagsProps> = () => {
 // Meta tags should be managed in the document head, not rendered as React components
 // This component is kept for compatibility but doesn't render anything
 return null;
}; 