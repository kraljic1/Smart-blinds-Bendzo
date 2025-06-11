interface CroatianLinksAndStructuredDataProps {
 metaCanonicalUrl: string;
 structuredData: Record<string, unknown> | Record<string, unknown>[];
}

export const CroatianLinksAndStructuredData: React.FC<CroatianLinksAndStructuredDataProps> = ({
 metaCanonicalUrl,
 structuredData
}) => {
 return (
 <>
 {/* Canonical URL */}
 <link rel="canonical"href={metaCanonicalUrl} />
 
 {/* Preconnect to external domains */}
 <link rel="preconnect"href="https://fonts.googleapis.com"/>
 <link rel="preconnect"href="https://fonts.gstatic.com"crossOrigin=""/>
 <link rel="preconnect"href="https://images.unsplash.com"/>
 
 {/* DNS Prefetch */}
 <link rel="dns-prefetch"href="https://fonts.googleapis.com"/>
 <link rel="dns-prefetch"href="https://fonts.gstatic.com"/>

 {/* Structured Data */}
 <script type="application/ld+json">
 {JSON.stringify(structuredData, null, 2)}
 </script>
 </>
 );
}; 