import React, { useState } from 'react';
import ProductConfiguration from '../components/ProductConfiguration';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types/product';

const DayNightBlindsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const breadcrumbItems = [
    { label: 'Our Products', path: '/products' },
    { label: 'Zebra Blinds', path: '/products/zebra-blinds' }
  ];

  const products: Product[] = [
    {
      id: "luxe-white",
      name: "Luxe White",
      price: 289.99,
      originalPrice: 319.99,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Day & Night"],
      colors: 3,
      fabricColor: "#FFFFFF"
    },
    {
      id: "premium-silver",
      name: "Premium Silver",
      price: 299.99,
      originalPrice: 329.99,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Day & Night"],
      colors: 2,
      fabricColor: "#C0C0C0"
    },
    {
      id: "deluxe-graphite",
      name: "Deluxe Graphite",
      price: 319.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Day & Night"],
      colors: 1,
      fabricColor: "#383838"
    },
    {
      id: "premium-beige",
      name: "Premium Beige",
      price: 299.99,
      originalPrice: 329.99,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Day & Night"],
      colors: 2,
      fabricColor: "#F5F5DC"
    },
    {
      id: "luxe-champagne",
      name: "Luxe Champagne",
      price: 309.99,
      originalPrice: 339.99,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Day & Night"],
      colors: 1,
      fabricColor: "#F7E7CE"
    },
    {
      id: "premium-stone",
      name: "Premium Stone",
      price: 299.99,
      originalPrice: 329.99,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Day & Night"],
      colors: 2,
      fabricColor: "#928E85"
    },
    {
      id: "deluxe-platinum",
      name: "Deluxe Platinum",
      price: 319.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Day & Night"],
      colors: 1,
      fabricColor: "#E5E4E2"
    },
    {
      id: "premium-taupe",
      name: "Premium Taupe",
      price: 299.99,
      originalPrice: 329.99,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Day & Night"],
      colors: 2,
      fabricColor: "#483C32"
    },
    {
      id: "luxe-pearl",
      name: "Luxe Pearl",
      price: 309.99,
      originalPrice: 339.99,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Day & Night"],
      colors: 1,
      fabricColor: "#F0EAD6"
    }
  ];

  const handleRequestSample = (product: Product) => {
    console.log('Requesting sample for:', product.name);
  };

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">Zebra Blinds</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onConfigure={setSelectedProduct}
              onRequestSample={handleRequestSample}
            />
          ))}
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

export default DayNightBlindsPage;