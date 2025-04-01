import React, { useState } from 'react';
import ProductConfiguration from '../components/ProductConfiguration';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types/product';

const CurtainTracksPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const breadcrumbItems = [
    { label: 'Our Products', path: '/products' },
    { label: 'Curtain Tracks', path: '/products/curtain-tracks' }
  ];

  const product: Product = {
    id: "electric-curtain-track",
    name: "Electric Curtain Track",
    price: 355.88,
    originalPrice: 395.40,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Motorized"],
    colors: 1,
    fabricColor: "#FFFFFF",
    description: "Transform your existing or new curtains into smart curtains with our cordless electric curtain tracks."
  };

  const handleRequestSample = (product: Product) => {
    console.log('Requesting sample for:', product.name);
  };

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">ELECTRIC CURTAIN TRACKS</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-16">
          Transform your existing or new curtains into smart curtains with our cordless electric curtain tracks. Put together your made-to-measure electric curtain rail right away and experience the benefits!
        </p>

        <div className="max-w-sm">
          <ProductCard
            product={product}
            onConfigure={setSelectedProduct}
            onRequestSample={handleRequestSample}
          />
        </div>

        {selectedProduct && (
          <ProductConfiguration 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CurtainTracksPage;