import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types/product';
import AccessoryConfiguration from '../components/AccessoryConfiguration';

const AccessoriesPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const breadcrumbItems = [
    { label: 'Our Products', path: '/products' },
    { label: 'Accessories', path: '/products/accessories' }
  ];

  const products: Product[] = [
    {
      id: "wifi-bridge",
      name: "Motionblinds Wi-Fi Bridge for Smartblinds CM-20",
      price: 157.00,
      originalPrice: 174.99,
      image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Wi-Fi"],
      colors: 1,
      fabricColor: "#000000",
      description: "Connect your smart blinds to your home network"
    },
    {
      id: "5-channel-remote",
      name: "Motionblinds 5-Channel Remote Control",
      price: 33.95,
      originalPrice: 39.95,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Remote"],
      colors: 1,
      fabricColor: "#000000",
      description: "Control up to 5 blinds or groups"
    },
    {
      id: "15-channel-remote",
      name: "Motionblinds 15-Channel Remote",
      price: 53.95,
      originalPrice: 59.95,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Remote"],
      colors: 1,
      fabricColor: "#000000",
      description: "Control up to 15 blinds or groups"
    },
    {
      id: "smart-plug",
      name: "Eve Energy – Smart Plug & Range Extender",
      price: 39.95,
      originalPrice: 44.95,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Smart"],
      colors: 1,
      fabricColor: "#FFFFFF",
      description: "Smart plug with power monitoring"
    },
    {
      id: "usb-c-cable",
      name: "Smartblinds USB-C Charging Cable",
      price: 14.99,
      originalPrice: 19.99,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Charging"],
      colors: 1,
      fabricColor: "#FFFFFF",
      description: "USB-C charging cable for smart blinds"
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Accessories</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-16">
          Enhance your smart blinds experience with our range of accessories, from remote controls to connectivity solutions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onConfigure={setSelectedProduct}
              configureButtonText="Add to Cart"
            />
          ))}
        </div>

        {selectedProduct && (
          <AccessoryConfiguration 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AccessoriesPage;