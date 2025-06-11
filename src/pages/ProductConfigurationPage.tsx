import { useParams } from 'react-router-dom';
import { Product } from '../types/product';
import { useProductConfigurationData, useProductConfigurationLogic } from './hooks';
import { ProductConfigurationPageLayout } from './components';

const ProductConfigurationPage = () => {
 const { productId } = useParams<{ productId: string }>();
 
 const {
 product,
 isLoading,
 customizationOptions,
 allImages,
 updateProductImages
 } = useProductConfigurationData({ productId });

 const {
 handleGoBack,
 handleCheckout,
 isAccessoryProduct
 } = useProductConfigurationLogic({ productId, product });

 const handleProductChange = (newProduct: Product) => {
 updateProductImages(newProduct);
 };

 return (
 <ProductConfigurationPageLayout
 product={product}
 isLoading={isLoading}
 isAccessoryProduct={isAccessoryProduct}
 customizationOptions={customizationOptions}
 allImages={allImages}
 onGoBack={handleGoBack}
 onCheckout={handleCheckout}
 onProductChange={handleProductChange}
 />
 );
};

export default ProductConfigurationPage; 