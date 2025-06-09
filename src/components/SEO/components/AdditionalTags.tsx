// React import not needed with new JSX transform

interface AdditionalTagsProps {
  canonicalUrl: string;
}

/**
 * Component for rendering additional meta tags, theme colors, and preconnect links
 */
export const AdditionalTags: React.FC<AdditionalTagsProps> = ({ canonicalUrl }) => {
  return (
    <>
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="application-name" content="Smartblinds Hrvatska" />
      <meta name="apple-mobile-web-app-title" content="Smartblinds" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </>
  );
}; 