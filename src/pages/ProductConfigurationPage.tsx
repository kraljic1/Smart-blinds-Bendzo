import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Info, ArrowLeft } from 'lucide-react';
import { Product } from '../types/product';
import InfoPanel from '../components/InfoPanel';
import { getProductsByCategory } from '../hooks/useProductFilter';

const ProductConfigurationPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  // Fetch product data based on productId
  useEffect(() => {
    // In a real app, you would fetch from an API
    // For now, we'll simulate by searching through all products
    setIsLoading(true);
    
    // Get all products from all categories
    const allProducts = [
      ...getProductsByCategory('roller'),
      ...getProductsByCategory('zebra'),
      ...getProductsByCategory('curtain'),
      ...getProductsByCategory('accessories')
    ];
    
    const foundProduct = allProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
    }
    
    setIsLoading(false);
  }, [productId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInfoButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInfoPanelOpen(true);
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-32 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-32 flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={handleGoBack}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          <ArrowLeft className="mr-2" size={16} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-8"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Products
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg">
                <img 
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {product.images && (
                <div className="grid grid-cols-4 gap-2">
                  {[product.image, ...(product.images || [])].map((image, i) => (
                    <button 
                      key={i} 
                      className={`aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 ${
                        selectedImage === image ? 'border-blue-600 dark:border-blue-400' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img 
                        src={image}
                        alt={`${product.name} view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-gray-600 dark:text-gray-300">Light filtering</span>
                  <span className="text-gray-600 dark:text-gray-300">-</span>
                  <span className="text-gray-600 dark:text-gray-300">With smart engine</span>
                  <button 
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={handleInfoButtonClick}
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300">
                {product.description || 
                  `Create a pleasant atmosphere in your home with our electric Essential roller blinds! Both the
                  light filtering and blackout Essential collection consist of sturdy roller blind fabrics with a
                  textile look and feel and are available in 9 different colours, making the Essential collection
                  suitable for any interior.`}
              </p>

              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">CUSTOMIZE AND ORDER</h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-300">From Price</div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">${product.price}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Width (in cm)
                      <Info size={16} className="ml-1 text-gray-400 dark:text-gray-500" />
                    </label>
                    <input
                      type="text"
                      placeholder="66 - 250 cm"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Height (in cm)
                      <Info size={16} className="ml-1 text-gray-400 dark:text-gray-500" />
                    </label>
                    <input
                      type="text"
                      placeholder="30 - 350 cm"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
                  CALCULATE PRICE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfoPanel 
        isOpen={isInfoPanelOpen} 
        onClose={() => setIsInfoPanelOpen(false)} 
      />
    </div>
  );
};

export default ProductConfigurationPage; 