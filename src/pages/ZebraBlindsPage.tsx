import { useRef } from 'react';
import { ZebraHeroSection, ZebraPageHeader, ZebraProductsGrid } from './components';
import { useZebraPageAnimations, useZebraProducts } from './hooks';
import React from 'react';

const ZebraBlindsPage = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Custom hooks for state management
  const { filteredProducts, groupedProducts, setFilteredProducts } = useZebraProducts();
  const { isLoaded } = useZebraPageAnimations(filteredProducts);

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

  return (
    <div className="pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <ZebraHeroSection 
        isLoaded={isLoaded}
        onScrollToProducts={scrollToProducts}
      />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header with Breadcrumb and Title */}
        <ZebraPageHeader 
          isLoaded={isLoaded}
          headingRef={headingRef}
        />

        {/* Products Grid with Filters */}
        <ZebraProductsGrid
          filteredProducts={filteredProducts}
          groupedProducts={groupedProducts}
          isLoaded={isLoaded}
          onFilteredProductsChange={setFilteredProducts}
        />
      </div>
    </div>
  );
};

export default ZebraBlindsPage;