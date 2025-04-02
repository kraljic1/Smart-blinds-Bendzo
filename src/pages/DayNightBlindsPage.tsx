import React from 'react';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types/product';

const DayNightBlindsPage = () => {
  const breadcrumbItems = [
    { label: 'Our Products', path: '/products' },
    { label: 'Zebra Blinds', path: '/products/zebra-blinds' }
  ];

  const products: Product[] = [
    {
      id: "dual-shade-black",
      name: "Dual Shade Black",
      price: 289.99,
      originalPrice: 319.99,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 4,
      fabricColor: "#111111"
    },
    {
      id: "dual-shade-white",
      name: "Dual Shade White",
      price: 289.99,
      originalPrice: 319.99,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 4,
      fabricColor: "#FFFFFF"
    },
    {
      id: "dual-shade-grey",
      name: "Dual Shade Grey",
      price: 289.99,
      originalPrice: 319.99,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 4,
      fabricColor: "#808080"
    },
    {
      id: "dual-shade-beige",
      name: "Dual Shade Beige",
      price: 289.99,
      originalPrice: 319.99,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 4,
      fabricColor: "#F5F5DC"
    }
  ];

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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayNightBlindsPage;