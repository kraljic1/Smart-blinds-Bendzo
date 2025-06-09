// React import not needed with new JSX transform
import { ArticleData } from '../types/seoTypes';

interface ArticleTagsProps {
  article?: ArticleData;
}

/**
 * Component for rendering article-specific Open Graph meta tags
 */
export const ArticleTags: React.FC<ArticleTagsProps> = ({ article }) => {
  if (!article) return null;

  return (
    <>
      {article.author && <meta property="article:author" content={article.author} />}
      {article.section && <meta property="article:section" content={article.section} />}
      {article.tag && <meta property="article:tag" content={article.tag} />}
      {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
    </>
  );
}; 