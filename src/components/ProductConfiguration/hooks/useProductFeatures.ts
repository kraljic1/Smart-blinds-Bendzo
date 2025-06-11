import { Product } from '../../../types/product';

interface UseProductFeaturesProps {
 product?: Product;
}

export const useProductFeatures = ({ product }: UseProductFeaturesProps) => {
 // Default features if no product is provided
 const defaultFeatures = [
 'Smart home integration',
 'Remote control operation',
 'Silent motor technology',
 'Energy efficient design',
 'UV protection fabric'
 ];

 // Use product features if available, otherwise use defaults
 const features = product?.features && product.features.length > 0 
 ? product.features 
 : defaultFeatures;

 const collection = product?.collection;

 return {
 features,
 collection
 };
}; 