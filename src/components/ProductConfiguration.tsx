import React, { useRef, useEffect, useState } from 'react';
import { Info, X } from 'lucide-react';
import { Product } from '../types/product';
import InfoPanel from './InfoPanel';

interface ProductConfigurationProps {
  product: Product;
  onClose: () => void;
}

const ProductConfiguration: React.FC<ProductConfigurationProps> = ({ product, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleInfoButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from reaching the modal
    setIsInfoPanelOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>

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
                {product.images.map((image, i) => (
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h2>
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
              Create a pleasant atmosphere in your home with our electric Essential roller blinds! Both the
              light filtering and blackout Essential collection consist of sturdy roller blind fabrics with a
              textile look and feel and are available in 9 different colours, making the Essential collection
              suitable for any interior.
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

      <InfoPanel 
        isOpen={isInfoPanelOpen} 
        onClose={() => setIsInfoPanelOpen(false)} 
      />
    </div>
  );
};

export default ProductConfiguration;