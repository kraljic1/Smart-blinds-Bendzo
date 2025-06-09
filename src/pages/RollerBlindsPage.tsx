import { useState, useEffect } from 'react';
import React from 'react';
import ProductPageLayout from '../components/Product/ProductPageLayout';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { useProductGrouping } from '../hooks/useProductGrouping';
// Import roller blinds data directly
import { rollerBlinds } from '../data/rollerblinds';
import { Product } from '../types/product';

// Import roller blinds image for hero section
import rollerBlindsHero from '../img/rollerblinds/CLASSIC/CLASSIC - BLACK/0.webp';

/**
 * Roller Blinds Page - Refactored with reusable components and hooks
 * Displays the roller blinds product collection with filtering capabilities
 */
const RollerBlindsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(rollerBlinds);
  
  // Custom hooks for animations and product grouping
  const { isLoaded } = usePageAnimations();
  const groupedProducts = useProductGrouping(filteredProducts);
  
  // Reset filters when component mounts
  useEffect(() => {
    setFilteredProducts(rollerBlinds);
  }, []);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Roller Blinds', path: '/products/roller-blinds' },
  ];

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const productsElement = document.getElementById('products');
    if (productsElement) {
      productsElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const structuredData = {
    name: "Smart Roller Blinds",
    image: ["https://smartblinds-croatia.com/images/roller-blinds-main.jpg"],
    description: "Premium smart roller blinds designed for modern homes. Control with voice, app, or smart hub.",
    brand: {
      name: "Smartblinds Croatia"
    },
    offers: {
      price: 89.99,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: "https://smartblinds-croatia.com/products/roller-blinds"
    }
  };

  return (
    <ProductPageLayout
      heroTitle="Smart Roller Blinds"
      heroDescription="Enhance your windows with our premium smart roller blinds collection. Elegant, functional, and designed to fit seamlessly into your home."
      heroImage={rollerBlindsHero}
      heroImageAlt="Smart roller blinds showcase"
      pageTitle="Smart Roller Blinds"
      pageDescription="Discover our collection of premium smart roller blinds designed for modern homes. Control your blinds with voice, app, or the smart hub."
      breadcrumbItems={breadcrumbItems}
      categoryId="roller"
      allProducts={rollerBlinds}
      filteredProducts={filteredProducts}
      groupedProducts={groupedProducts}
      isLoaded={isLoaded}
      onFilteredProductsChange={setFilteredProducts}
      onExploreClick={scrollToProducts}
      structuredData={structuredData}
    />
  );
};

export default RollerBlindsPage;