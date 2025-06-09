import { useState, useEffect } from 'react';
import React from 'react';
import ProductPageLayout from '../components/Product/ProductPageLayout';
import SEO from '../components/SEO/SEO';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { useProductGrouping } from '../hooks/useProductGrouping';
import { rollerBlinds } from '../data/rollerblinds';
import { Product } from '../types/product';
import rollerBlindsHero from '../img/rollerblinds/CLASSIC/CLASSIC - BLACK/0.webp';

// Static page data
const PAGE_DATA = {
  breadcrumbs: [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Roller Blinds', path: '/products/roller-blinds' },
  ],
  seo: {
    title: "Smart Roller Blinds - Premium Window Automation | Smartblinds Croatia",
    description: "Discover our collection of premium smart roller blinds designed for modern homes. Control your blinds with voice, app, or the smart hub. Free shipping on all orders.",
    keywords: "smart roller blinds, automated blinds, window automation, smart home, motorized blinds",
    product: { price: "89.99", currency: "EUR", availability: "instock" as const, condition: "new" as const, brand: "Smartblinds Croatia", category: "Smart Blinds" }
  },
  content: {
    heroTitle: "Smart Roller Blinds",
    heroDescription: "Enhance your windows with our premium smart roller blinds collection. Elegant, functional, and designed to fit seamlessly into your home.",
    pageTitle: "Smart Roller Blinds",
    pageDescription: "Discover our collection of premium smart roller blinds designed for modern homes. Control your blinds with voice, app, or the smart hub."
  },
  structuredData: {
    name: "Smart Roller Blinds",
    image: ["https://smartblinds-croatia.com/images/roller-blinds-main.jpg"],
    description: "Premium smart roller blinds designed for modern homes. Control with voice, app, or smart hub.",
    brand: { name: "Smartblinds Croatia" },
    offers: { price: 89.99, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: "https://smartblinds-croatia.com/products/roller-blinds" }
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
 * Roller Blinds Page - Displays the roller blinds product collection with filtering capabilities
 */
const RollerBlindsPage = () => {
  const { filteredProducts, setFilteredProducts, isLoaded, groupedProducts, scrollToProducts } = useRollerBlindsPage();

  return (
    <>
      <SEO {...PAGE_DATA.seo} ogType="product" ogImage={rollerBlindsHero} />
      <ProductPageLayout
        {...PAGE_DATA.content}
        heroImage={rollerBlindsHero}
        heroImageAlt="Smart roller blinds showcase"
        breadcrumbItems={PAGE_DATA.breadcrumbs}
        categoryId="roller"
        allProducts={rollerBlinds}
        filteredProducts={filteredProducts}
        groupedProducts={groupedProducts}
        isLoaded={isLoaded}
        onFilteredProductsChange={setFilteredProducts}
        onExploreClick={scrollToProducts}
        structuredData={PAGE_DATA.structuredData}
      />
    </>
  );
};

export default RollerBlindsPage;