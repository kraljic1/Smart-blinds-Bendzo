/**
 * Utility functions for category-related operations
 */

/**
 * Determines the current category ID from the URL path
 */
export const getCurrentCategoryId = (pathname: string): string => {
 if (pathname === '/products') return 'all';
 if (pathname.includes('roller-blinds')) return 'roller';
 if (pathname.includes('zebra-blinds')) return 'zebra';
 if (pathname.includes('curtain-blinds')) return 'curtain';
 if (pathname.includes('accessories')) return 'accessories';
 return 'all';
};

/**
 * Maps category ID to display title
 */
export const getCategoryTitle = (categoryId: string): string => {
 const categoryTitles: Record<string, string> = {
 all: 'All Products',
 roller: 'Roller Blinds',
 zebra: 'Zebra Blinds',
 curtain: 'Curtain Blinds',
 accessories: 'Accessories'
 };
 
 return categoryTitles[categoryId] || 'All Products';
}; 