import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { rollerBlinds } from '../data/productData';

const RollerBlindsPage = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Roller Blinds', path: '/products/roller-blinds' },
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">Smart Roller Blinds</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rollerBlinds.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onConfigure={() => window.location.href = `/products/configure/${product.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RollerBlindsPage;