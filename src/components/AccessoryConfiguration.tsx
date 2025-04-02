import React, { useRef, useEffect, useState } from 'react';
import { Info, X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';
import InfoPanel from './InfoPanel';

interface AccessoryConfigurationProps {
  product: Product;
  onClose: () => void;
}

const AccessoryConfiguration: React.FC<AccessoryConfigurationProps> = ({ product, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    // Calculate the total price based on quantity
    setTotalPrice(parseFloat((product.price * quantity).toFixed(2)));
  }, [quantity, product.price]);

  const handleInfoButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from reaching the modal
    setIsInfoPanelOpen(true);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Here you would add the product to the cart
    console.log(`Adding ${quantity} ${product.name}(s) to cart, total: $${totalPrice}`);
    // You could add a toast notification here
    onClose();
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
                <span className="text-gray-600 dark:text-gray-300">{product.description}</span>
                <button 
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  onClick={handleInfoButtonClick}
                >
                  <Info size={16} />
                </button>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">ADD TO CART</h3>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">${product.price}</div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ${product.originalPrice}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-l-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <input 
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button 
                    onClick={increaseQuantity}
                    className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-200">Price per item:</span>
                  <span className="text-gray-700 dark:text-gray-200">${product.price}</span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-xl text-blue-600 dark:text-blue-400">${totalPrice}</span>
                </div>
              </div>

              <button 
                className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2" size={20} />
                ADD TO CART
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

export default AccessoryConfiguration; 