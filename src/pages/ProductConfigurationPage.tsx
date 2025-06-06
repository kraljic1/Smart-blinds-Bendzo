import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import SEO from '../components/SEO/SEO';
import { getProductsByCategory } from '../hooks/useProductFilter';
import { CustomizationOption } from '../components/Product/ProductCustomization';
import { getCustomizationOptions } from '../data/customizationOptionsByProduct';
import { useBasketContext } from '../hooks/useBasketContext';
import { useToast } from '../hooks/useToast';
import ProductConfigurationWrapper from '../components/ProductConfiguration/ProductConfigurationWrapper';
import ProductLoader from '../components/ProductConfiguration/ProductLoader';
import { useProductImages } from '../hooks/useProductImages';
import { registerProductDebugTools } from '../utils/productDebugUtils';

const ProductConfigurationPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useBasketContext();
  const { showToast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { allImages, updateProductImages } = useProductImages();
  const [customizationOptions, setCustomizationOptions] = useState<CustomizationOption[]>([]);

  // Helper for browser console - logs products with fewer than 5 images
  useEffect(() => {
    const cleanup = registerProductDebugTools();
    return cleanup;
  }, []);

  

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Fetch product data based on productId
  useEffect(() => {
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
      updateProductImages(foundProduct);
    }
    
    setIsLoading(false);
  }, [productId, updateProductImages]);

  // Set default customization options
  useEffect(() => {
    if (product) {
      const productOptions = getCustomizationOptions(product.id);
      setCustomizationOptions(productOptions);
    }
  }, [product]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCheckout = (quantity: number = 1, options: Record<string, string | number | boolean> = {}, calculatedPrice: number) => {
    if (product) {
      // Add item to basket with selected options and calculated price
      addItem(product, quantity, options, calculatedPrice);
      
      // Show a success toast notification
      const message = `${quantity} ${product.name}${quantity > 1 ? 's' : ''} ${quantity > 1 ? 'have' : 'has'} been added to your basket!`;
      showToast(message, 'success', 'Added to Basket');
    }
  };

  // Handle product change from color selection
  const handleProductChange = (newProduct: Product) => {
    setProduct(newProduct);
    updateProductImages(newProduct);
  };

  const isAccessoryProduct = 
    productId === 'matter-bridge-cm55' ||
    productId === 'remote-5-channel' ||
    productId === 'remote-15-channel' ||
    productId === 'wifi-bridge-cm20' ||
    productId === 'eve-smart-plug' ||
    productId === 'usb-c-cable';

  return (
    <div className="pt-20 pb-24 sm:pt-24 sm:pb-32">
      {product && (
        <SEO
          title={`${product.name} - Configure Your Smart Blind | Smartblinds Croatia`}
          description={`Customize and order your ${product.name}. Choose colors, dimensions, and features. Free shipping on all orders.`}
          ogImage={product.image}
          ogType="product"
          keywords={`smart blinds, ${product.name.toLowerCase()}, window automation, smart home`}
        />
      )}
      
      <ProductLoader
        isLoading={isLoading}
        hasError={!product}
        onGoBack={handleGoBack}
      >
        {product && (
          <ProductConfigurationWrapper
            product={product}
            isAccessoryProduct={isAccessoryProduct}
            customizationOptions={customizationOptions}
            allImages={allImages}
            onGoBack={handleGoBack}
            onCheckout={handleCheckout}
            onProductChange={handleProductChange}
          />
        )}
      </ProductLoader>
    </div>
  );
};

export default ProductConfigurationPage;