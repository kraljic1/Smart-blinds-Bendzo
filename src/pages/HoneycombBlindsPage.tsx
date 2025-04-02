import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types/product';

const HoneycombBlindsPage = () => {
  const breadcrumbItems = [
    { label: 'Our Products', path: '/products' },
    { label: 'Honeycomb Blinds', path: '/products/honeycomb-blinds' }
  ];

  const products: Product[] = [
    {
      id: "energy-save-white",
      name: "Energy Save White",
      price: 249.99,
      originalPrice: 279.99,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 3,
      fabricColor: "#FFFFFF"
    },
    {
      id: "duette-blackout",
      name: "Duette Blackout",
      price: 269.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Blackout"],
      colors: 4,
      fabricColor: "#000000"
    },
    {
      id: "energy-save-beige",
      name: "Energy Save Beige",
      price: 249.99,
      originalPrice: 279.99,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 3,
      fabricColor: "#F5F5DC"
    },
    {
      id: "duette-cream",
      name: "Duette Cream",
      price: 259.99,
      originalPrice: 289.99,
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      features: ["Light filtering"],
      colors: 4,
      fabricColor: "#FFFDD0"
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoneycombBlindsPage;