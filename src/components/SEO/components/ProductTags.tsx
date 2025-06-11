// React import not needed with new JSX transform
import { ProductData } from '../types/seoTypes';

interface ProductTagsProps {
 product?: ProductData;
}

/**
 * Component for rendering product-specific Open Graph meta tags
 */
export const ProductTags: React.FC<ProductTagsProps> = ({ product }) => {
 if (!product) return null;

 return (
 <>
 {product.price && <meta property="product:price:amount"content={product.price} />}
 {product.currency && <meta property="product:price:currency"content={product.currency} />}
 {product.availability && <meta property="product:availability"content={product.availability} />}
 {product.condition && <meta property="product:condition"content={product.condition} />}
 {product.brand && <meta property="product:brand"content={product.brand} />}
 {product.category && <meta property="product:category"content={product.category} />}
 </>
 );
}; 