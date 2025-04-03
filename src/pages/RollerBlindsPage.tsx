import React from 'react';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types/product';
import essentialOffWhiteMain from '../img/rollerblinds/ESSENTIAL - OFF-WHITE/Essential - off white.webp';

const RollerBlindsPage = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Roller Blinds', path: '/products/roller-blinds' },
  ];

  const products: Product[] = [
    {
      id: "essential-anthracite",
      name: "Essential Anthracite",
      price: 239.57,
      originalPrice: 266.19,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 5,
      fabricColor: "#2C3539"
    },
    {
      id: "solar-black",
      name: "Solar Black",
      price: 239.34,
      originalPrice: 265.93,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Blackout"],
      colors: 2,
      fabricColor: "#000000"
    },
    {
      id: "comfort-white",
      name: "Comfort White",
      price: 243.84,
      originalPrice: 270.93,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 1,
      fabricColor: "#FFFFFF"
    },
    {
      id: "comfort-sand-brown",
      name: "Comfort Sand Brown",
      price: 243.84,
      originalPrice: 270.93,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 1,
      fabricColor: "#9F8170"
    },
    {
      id: "comfort-grey",
      name: "Comfort Grey",
      price: 243.84,
      originalPrice: 270.93,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 1,
      fabricColor: "#808080"
    },
    {
      id: "comfort-brown-grey",
      name: "Comfort Brown Grey",
      price: 243.84,
      originalPrice: 270.93,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 1,
      fabricColor: "#4A4A4A"
    },
    {
      id: "comfort-anthracite",
      name: "Comfort Anthracite",
      price: 243.84,
      originalPrice: 270.93,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 1,
      fabricColor: "#2C3539"
    },
    {
      id: "essential-off-white",
      name: "Essential Off-White",
      price: 239.57,
      originalPrice: 266.18,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 5,
      fabricColor: "#FAF9F6"
    },
    {
      id: "essential-white",
      name: "Essential White",
      price: 239.57,
      originalPrice: 266.18,
      image: essentialOffWhiteMain,
      features: ["Light filtering"],
      colors: 5,
      fabricColor: "#FFFFFF"
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">Smart Roller Blinds</h1>

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

export default RollerBlindsPage;