import { Product } from '../../types/product';
import { CustomizationOption } from '../../components/Product/ProductCustomization';
import CroatianSEO from '../../components/SEO/CroatianSEO';
import ProductConfigurationWrapper from '../../components/ProductConfiguration/ProductConfigurationWrapper';
import ProductLoader from '../../components/ProductConfiguration/ProductLoader';

interface ProductConfigurationPageLayoutProps {
  product: Product | null;
  isLoading: boolean;
  isAccessoryProduct: boolean;
  customizationOptions: CustomizationOption[];
  allImages: Record<string, string[]>;
  onGoBack: () => void;
  onCheckout: (quantity: number, options: Record<string, string | number | boolean>, calculatedPrice: number) => void;
  onProductChange: (product: Product) => void;
}

const ProductConfigurationPageLayout: React.FC<ProductConfigurationPageLayoutProps> = ({
  product,
  isLoading,
  isAccessoryProduct,
  customizationOptions,
  allImages,
  onGoBack,
  onCheckout,
  onProductChange
}) => {
  return (
    <div className="pt-20 pb-24 sm:pt-24 sm:pb-32">
      {product && (
        <CroatianSEO
          title={`${product.name} - Configure Your Smart Blind | Smartblinds Croatia`}
          description={`Customize and order your ${product.name}. Choose colors, dimensions, and features. Free shipping on all orders.`}
          ogImage={product.image}
          pageType="product"
          keywords={`smart blinds, ${product.name.toLowerCase()}, window automation, smart home`}
          productData={{
            name: product.name,
            price: product.price.toString(),
            currency: "EUR",
            availability: "InStock",
            condition: "NewCondition",
            brand: "Smartblinds Croatia",
            category: "Smart Blinds"
          }}
        />
      )}
      
      <ProductLoader
        isLoading={isLoading}
        hasError={!product}
        onGoBack={onGoBack}
      >
        {product && (
          <ProductConfigurationWrapper
            product={product}
            isAccessoryProduct={isAccessoryProduct}
            customizationOptions={customizationOptions}
            allImages={allImages}
            onGoBack={onGoBack}
            onCheckout={onCheckout}
            onProductChange={onProductChange}
          />
        )}
      </ProductLoader>
    </div>
  );
};

export default ProductConfigurationPageLayout; 