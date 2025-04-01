import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/product';
import ProductConfiguration from '../components/ProductConfiguration';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const productsPerLoad = 6;

  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { 
      id: 'all', 
      name: 'All Products',
      path: '/products',
      icon: <ChevronRight className="w-6 h-6" />,
      description: 'Explore our complete range of smart window solutions'
    },
    { 
      id: 'roller', 
      name: 'Roller Blinds',
      path: '/products/roller-blinds',
      icon: <ChevronRight className="w-6 h-6" />,
      description: 'Classic smart blinds with smooth operation'
    },
    { 
      id: 'daynight', 
      name: 'Day & Night Blinds',
      path: '/products/day-night-blinds',
      icon: <ChevronRight className="w-6 h-6" />,
      description: 'Perfect balance of light and privacy'
    },
    { 
      id: 'honeycomb', 
      name: 'Honeycomb Blinds',
      path: '/products/honeycomb-blinds',
      icon: <ChevronRight className="w-6 h-6" />,
      description: 'Energy-efficient cellular shades'
    },
    { 
      id: 'tracks', 
      name: 'Curtain Tracks',
      path: '/products/curtain-tracks',
      icon: <ChevronRight className="w-6 h-6" />,
      description: 'Smart motorized curtain systems'
    },
    { 
      id: 'accessories', 
      name: 'Accessories',
      path: '/products/accessories',
      icon: <ChevronRight className="w-6 h-6" />,
      description: 'Remote controls, hubs, and more'
    }
  ];

  const allProducts: Product[] = [
    // Roller Blinds
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
      id: "essential-off-white",
      name: "Essential Off-White",
      price: 239.57,
      originalPrice: 266.18,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 5,
      fabricColor: "#FAF9F6"
    },
    // Day & Night Blinds
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
    // Honeycomb Blinds
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
    // Curtain Tracks
    {
      id: "electric-curtain-track",
      name: "Electric Curtain Track",
      price: 355.88,
      originalPrice: 395.40,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Motorized"],
      colors: 1,
      fabricColor: "#FFFFFF"
    },
    {
      id: "premium-track-system",
      name: "Premium Track System",
      price: 399.99,
      originalPrice: 449.99,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Motorized"],
      colors: 2,
      fabricColor: "#C0C0C0"
    },
    // Accessories
    {
      id: "wifi-bridge",
      name: "Motionblinds Wi-Fi Bridge",
      price: 157.00,
      originalPrice: 174.99,
      image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Wi-Fi"],
      colors: 1,
      fabricColor: "#000000"
    },
    {
      id: "5-channel-remote",
      name: "5-Channel Remote Control",
      price: 33.95,
      originalPrice: 39.95,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Remote"],
      colors: 1,
      fabricColor: "#000000"
    },
    {
      id: "15-channel-remote",
      name: "15-Channel Remote",
      price: 53.95,
      originalPrice: 59.95,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Remote"],
      colors: 1,
      fabricColor: "#000000"
    },
    {
      id: "smart-hub",
      name: "Smart Hub Controller",
      price: 129.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Smart"],
      colors: 1,
      fabricColor: "#000000"
    },
    {
      id: "usb-c-cable",
      name: "USB-C Charging Cable",
      price: 14.99,
      originalPrice: 19.99,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Charging"],
      colors: 1,
      fabricColor: "#FFFFFF"
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleCategoryClick = (category: typeof categories[0]) => {
    navigate(category.path);
  };

  const handleRequestSample = (product: Product) => {
    console.log('Requesting sample for:', product.name);
  };

  const handleLoadMore = () => {
    setVisibleProducts(prev => Math.min(prev + productsPerLoad, allProducts.length));
  };

  return (
    <div className="pt-24 pb-32">
      {/* Hero Section */}
      <div className="relative h-[50vh] mb-24">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Smart blinds showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Smart Solutions for Modern Living
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover our range of innovative smart blinds and accessories designed to transform your home
            </p>
            <Link
              to="/how-it-works"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-gray-900 transition"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`
                p-6 rounded-xl text-left transition-all
                ${isActive(category.path)
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  : 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }
                shadow-sm hover:shadow-md
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
                <span className={`
                  mt-1 transform transition-transform
                  ${isActive(category.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500'
                  }
                `}>
                  {category.icon}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* All Products Section */}
        {location.pathname === '/products' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {allProducts.slice(0, visibleProducts).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onConfigure={setSelectedProduct}
                  onRequestSample={handleRequestSample}
                />
              ))}
            </div>
            {visibleProducts < allProducts.length && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductConfiguration 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;