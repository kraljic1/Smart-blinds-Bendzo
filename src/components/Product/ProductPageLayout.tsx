import React from 'react';
import ProductPageHero from './ProductPageHero';
import ProductPageHeader from './ProductPageHeader';
import ProductGridSection from './ProductGridSection';
import { Product } from '../../types/product';

interface BreadcrumbItem {
 label: string;
 path: string;
}

interface ProductPageLayoutProps {
 // Hero section props
 heroTitle: string;
 heroDescription: string;
 heroImage: string;
 heroImageAlt: string;
 
 // Header section props
 pageTitle: string;
 pageDescription: string;
 breadcrumbItems: BreadcrumbItem[];
 
 // Products section props
 categoryId: string;
 allProducts: Product[];
 filteredProducts: Product[];
 groupedProducts: Product[];
 
 // State and handlers
 isLoaded: boolean;
 onFilteredProductsChange: (products: Product[]) => void;
 onExploreClick?: (e: React.MouseEvent) => void;
 
 // SEO data
 structuredData?: {
 name: string;
 image: string[];
 description: string;
 brand: { name: string };
 offers: {
 price: number;
 priceCurrency: string;
 availability: string;
 url: string;
 };
 };
}

/**
 * Layout component for product pages
 * Combines hero, header, and products grid sections
 */
const ProductPageLayout: React.FC<ProductPageLayoutProps> = ({
 heroTitle,
 heroDescription,
 heroImage,
 heroImageAlt,
 pageTitle,
 pageDescription,
 breadcrumbItems,
 categoryId,
 allProducts,
 filteredProducts,
 groupedProducts,
 isLoaded,
 onFilteredProductsChange,
 onExploreClick,
 structuredData
}) => {
 return (
 <div className="pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white">
 <ProductPageHero
 title={heroTitle}
 description={heroDescription}
 heroImage={heroImage}
 imageAlt={heroImageAlt}
 isLoaded={isLoaded}
 onExploreClick={onExploreClick}
 />
 
 <ProductPageHeader
 title={pageTitle}
 description={pageDescription}
 breadcrumbItems={breadcrumbItems}
 isLoaded={isLoaded}
 structuredData={structuredData}
 />
 
 <ProductGridSection
 categoryId={categoryId}
 allProducts={allProducts}
 filteredProducts={filteredProducts}
 groupedProducts={groupedProducts}
 isLoaded={isLoaded}
 onFilteredProductsChange={onFilteredProductsChange}
 />
 </div>
 );
};

export default ProductPageLayout; 