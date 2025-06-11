import React, { useRef } from 'react';
import Breadcrumb from '../Navigation/Breadcrumb';

interface BreadcrumbItem {
 label: string;
 path: string;
}

interface ProductPageHeaderProps {
 title: string;
 description: string;
 breadcrumbItems: BreadcrumbItem[];
 isLoaded: boolean;
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
 * Header component for product pages
 * Includes breadcrumb navigation, title, and description
 */
const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({
 title,
 description,
 breadcrumbItems,
 isLoaded
}) => {
 const headingRef = useRef<HTMLHeadingElement>(null);

 return (
 <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
 <div className={`mb-8 slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
 <Breadcrumb items={breadcrumbItems} />
 </div>
 
 <div className="relative">
 <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
 <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
 </div>
 
 <h1 
 ref={headingRef}
 className={`text-5xl font-bold text-gray-900 mb-4 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
 >
 {title}
 </h1>
 
 <p className={`text-lg text-gray-600 mb-8 max-w-2xl slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
 {description}
 </p>
 </div>
 );
};

export default ProductPageHeader; 