/**
 * Form header component displaying product title and pricing information
 */

import { Product } from '../../types/product';

interface FormHeaderProps {
 product: Product;
 isAccessoryProduct: boolean;
}

const FormHeader = ({ 
 product, 
 isAccessoryProduct
}: FormHeaderProps) => {
 const getPriceText = () => {
 console.log('ProductConfigurationForm Debug:', { 
 productId: product.id, 
 productName: product.name,
 isAccessoryProduct,
 priceText: isAccessoryProduct ? 'From Price' : 'From Price per m²'
 });
 return isAccessoryProduct ? 'From Price' : 'From Price per m²';
 };

 return (
 <div className="flex justify-between items-center mb-4">
 <h3 className="text-lg sm:text-xl font-bold text-gray-900">
 CUSTOMIZE AND ORDER
 </h3>
 <div className="text-right">
 <div className="text-xs sm:text-sm text-gray-600">
 {getPriceText()}
 </div>
 <div className="text-lg sm:text-xl font-bold text-blue-600">
 ${product.price}
 </div>
 <div className="text-xs sm:text-sm text-gray-500 line-through">
 ${product.originalPrice}
 </div>
 </div>
 </div>
 );
};

export default FormHeader; 