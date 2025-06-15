import { useState, useEffect } from 'react';
import React from 'react';
import CroatianSEO from '../components/SEO/CroatianSEO';
import RollerBlindsHeroSection from './components/RollerBlindsHeroSection';
import ProductPageHeader from '../components/Product/ProductPageHeader';
import ProductGridSection from '../components/Product/ProductGridSection';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { useProductGrouping } from '../hooks/useProductGrouping';
import { rollerBlinds } from '../data/rollerblinds';
import { Product } from '../types/product';
import rollerHero1 from '../img/hero-images/roller1.webp';

// Static page data
const PAGE_DATA = {
 breadcrumbs: [
 { label: 'Home', path: '/' },
 { label: 'Products', path: '/products' },
 { label: 'Roller Blinds', path: '/products/roller-blinds' },
 ],
 content: {
 pageTitle:"Smart Roller Blinds",
 pageDescription:"Discover our collection of premium smart roller blinds designed for modern homes. Control your blinds with voice, app, or the smart hub."
 },
 structuredData: {
 name:"Smart Roller Blinds",
 image: ["https://smartblinds-croatia.com/images/roller-blinds-main.jpg"],
 description:"Premium smart roller blinds designed for modern homes. Control with voice, app, or smart hub.",
 brand: { name:"Smartblinds Croatia"},
 offers: { price: 89.99, priceCurrency:"EUR", availability:"https://schema.org/InStock", url:"https://smartblinds-croatia.com/products/roller-blinds"}
 }
};

// Custom hook for page logic
const useRollerBlindsPage = () => {
 const [filteredProducts, setFilteredProducts] = useState<Product[]>(rollerBlinds);
 const { isLoaded } = usePageAnimations();
 const groupedProducts = useProductGrouping(filteredProducts);

 useEffect(() => setFilteredProducts(rollerBlinds), []);

 const scrollToProducts = (e: React.MouseEvent) => {
 e.preventDefault();
 document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
 };

 return { filteredProducts, setFilteredProducts, isLoaded, groupedProducts, scrollToProducts };
};

/**
 * Roller Blinds Page - Displays the roller blinds product collection with carousel hero and filtering capabilities
 */
const RollerBlindsPage = () => {
 const { filteredProducts, setFilteredProducts, isLoaded, groupedProducts, scrollToProducts } = useRollerBlindsPage();

 return (
 <>
 <CroatianSEO
 title="Pametne Zavjese | Smartblinds Hrvatska"
 description="Discover our collection of premium smart roller blinds designed for modern homes. Control your blinds with voice, app, or the smart hub. Free shipping on all orders."
 keywords="smart roller blinds, automated blinds, window automation, smart home, motorized blinds"
 pageType="category"
 ogType="product"
 ogImage={rollerHero1}
 productData={{
 name:"Smart Roller Blinds",
 price:"89.99",
 currency:"EUR",
 availability:"InStock",
 condition:"NewCondition",
 brand:"Smartblinds Croatia",
 category:"Smart Blinds"
 }}
 />
 
 <div className="pt-24 pb-32 bg-white">
 {/* Hero Section with Carousel */}
 <RollerBlindsHeroSection 
 isLoaded={isLoaded}
 onScrollToProducts={scrollToProducts}
 />
 
 <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
 {/* Page Header */}
 <ProductPageHeader
 title={PAGE_DATA.content.pageTitle}
 description={PAGE_DATA.content.pageDescription}
 breadcrumbItems={PAGE_DATA.breadcrumbs}
 isLoaded={isLoaded}
 structuredData={PAGE_DATA.structuredData}
 />
 
 {/* Products Grid */}
 <ProductGridSection
 categoryId="roller"
 allProducts={rollerBlinds}
 filteredProducts={filteredProducts}
 groupedProducts={groupedProducts}
 isLoaded={isLoaded}
 onFilteredProductsChange={setFilteredProducts}
 />
 </div>
 </div>
 </>
 );
};

export default RollerBlindsPage;