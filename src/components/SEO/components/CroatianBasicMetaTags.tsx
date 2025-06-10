interface CroatianBasicMetaTagsProps {
  title: string;
  description: string;
  croatianKeywords: string;
  robotsContent: string;
  copyrightText: string;
}

export const CroatianBasicMetaTags: React.FC<CroatianBasicMetaTagsProps> = ({
  title,
  description,
  croatianKeywords,
  robotsContent,
  copyrightText
}) => {
  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {croatianKeywords && <meta name="keywords" content={croatianKeywords} />}
      <meta name="robots" content={robotsContent} />
      
      {/* Language and Location */}
      <html lang="hr" />
      <meta name="language" content="Croatian" />
      <meta name="geo.region" content="HR" />
      <meta name="geo.country" content="Croatia" />
      <meta name="geo.placename" content="Zagreb" />
      
      {/* Author and Copyright */}
      <meta name="author" content="Smartblinds Hrvatska" />
      <meta name="copyright" content={copyrightText} />
    </>
  );
}; 