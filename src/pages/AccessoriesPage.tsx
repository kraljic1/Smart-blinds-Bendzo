import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types/product';

const AccessoriesPage = () => {
  const breadcrumbItems = [
    { label: 'Our Products', path: '/products' },
    { label: 'Accessories', path: '/products/accessories' }
  ];

  const products: Product[] = [
    {
      id: "remote-control-alexa",
      name: "Remote Control with Alexa",
      price: 49.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Smart control"],
      colors: 1,
      fabricColor: "#FFFFFF"
    },
    {
      id: "smart-hub-pro",
      name: "Smart Hub Pro",
      price: 99.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Smart control"],
      colors: 1,
      fabricColor: "#FFFFFF"
    },
    {
      id: "usb-power-adapter",
      name: "USB Power Adapter",
      price: 19.99,
      originalPrice: 24.99,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Power"],
      colors: 1,
      fabricColor: "#FFFFFF"
    },
    {
      id: "solar-charging-panel",
      name: "Solar Charging Panel",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Eco-friendly"],
      colors: 1,
      fabricColor: "#FFFFFF"
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">Smart Accessories</h1>

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

export default AccessoriesPage;