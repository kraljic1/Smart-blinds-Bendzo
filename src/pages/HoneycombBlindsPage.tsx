import React, { useState } from 'react';
import ProductConfiguration from '../components/ProductConfiguration';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types/product';

const HoneycombBlindsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const breadcrumbItems = [
    { label: 'Our Products', path: '/products' },
    { label: 'Honeycomb Blinds', path: '/products/honeycomb-blinds' }
  ];

  const products: Product[] = [
    {
      id: "eco-white",
      name: "Eco White",
      price: 299.99,
      originalPrice: 329.99,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 4,
      fabricColor: "#FFFFFF"
    },
    {
      id: "thermal-grey",
      name: "Thermal Grey",
      price: 319.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Blackout"],
      colors: 3,
      fabricColor: "#808080"
    },
    {
      id: "premium-cream",
      name: "Premium Cream",
      price: 339.99,
      originalPrice: 369.99,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 2,
      fabricColor: "#FFFDD0"
    },
    {
      id: "deluxe-blackout",
      name: "Deluxe Blackout",
      price: 359.99,
      originalPrice: 389.99,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Blackout"],
      colors: 5,
      fabricColor: "#36454F"
    },
    {
      id: "eco-beige",
      name: "Eco Beige",
      price: 299.99,
      originalPrice: 329.99,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 3,
      fabricColor: "#F5F5DC"
    },
    {
      id: "premium-silver",
      name: "Premium Silver",
      price: 339.99,
      originalPrice: 369.99,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 2,
      fabricColor: "#C0C0C0"
    },
    {
      id: "thermal-navy",
      name: "Thermal Navy",
      price: 319.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Blackout"],
      colors: 1,
      fabricColor: "#000080"
    },
    {
      id: "deluxe-sand",
      name: "Deluxe Sand",
      price: 359.99,
      originalPrice: 389.99,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 4,
      fabricColor: "#C2B280"
    },
    {
      id: "premium-stone",
      name: "Premium Stone",
      price: 339.99,
      originalPrice: 369.99,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 2,
      fabricColor: "#928E85"
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">Honeycomb Blinds</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onConfigure={setSelectedProduct}
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

export default HoneycombBlindsPage;