// React import not needed with new JSX transform
import { generateRobotsContent, generateCopyrightText } from '../utils/metaTagHelpers';

interface BasicMetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  noindex: boolean;
  nofollow: boolean;
}

/**
 * Component for rendering basic meta tags including title, description, and robots
 */
export const BasicMetaTags: React.FC<BasicMetaTagsProps> = ({
  title,
  description,
  keywords,
  noindex,
  nofollow
}) => {
  const robotsContent = generateRobotsContent(noindex, nofollow);
  const copyrightText = generateCopyrightText();

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
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