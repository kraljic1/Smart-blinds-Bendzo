import { getCategoryTitle } from '../utils/categoryUtils';

interface ProductsPageHeaderProps {
  categoryId: string;
  isLoaded: boolean;
}

/**
 * Component for rendering the products page header with category title
 */
export const ProductsPageHeader = ({ categoryId, isLoaded }: ProductsPageHeaderProps) => {
  const categoryTitle = getCategoryTitle(categoryId);

  return (
    <h2 
      className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 fade-in-scale delay-150 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {categoryTitle}
    </h2>
  );
}; 