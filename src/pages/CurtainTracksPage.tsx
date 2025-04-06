import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { Product } from '../types/product';

const CurtainTracksPage = () => {
  const breadcrumbItems = [
    { label: 'Our Products', path: '/products' },
    { label: 'Curtain Tracks', path: '/products/curtain-blinds' }
  ];

  const products: Product[] = [
    {
      id: "glider-track",
      name: "Electric curtain tracks",
      price: 349.99,
      originalPrice: 389.99,
      image: "/src/img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/curtain_track.webp",
      images: [
        "/src/img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/curtain_track.webp",
        "/src/img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/medium_web-sb_gordijnrails_detailshot.webp",
        "/src/img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/gordijnrail_kleuren.webp",
        "/src/img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/gordijnrail_render.webp",
        "/src/img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/smartblinds_elektrische_gordijnrail_afmetingen.webp",
        "/src/img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/smartblinds_elektrische_gordijnrail_afmetingen_2.webp"
      ],
      features: ["Light filtering"],
      colors: 2,
      fabricColor: "#888888"
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">Smart Curtain Tracks</h1>

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

export default CurtainTracksPage;