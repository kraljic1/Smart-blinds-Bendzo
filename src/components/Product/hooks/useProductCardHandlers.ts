import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types/product';

interface UseProductCardHandlersProps {
 product: Product;
 onConfigure?: (product: Product) => void;
 onRequestSample?: (product: Product) => void;
}

export const useProductCardHandlers = ({
 product,
 onConfigure,
 onRequestSample
}: UseProductCardHandlersProps) => {
 const navigate = useNavigate();

 const handleConfigure = () => {
 if (onConfigure) {
 onConfigure(product);
 } else {
 navigate(`/products/configure/${product.id}`);
 }
 };

 const handleRequestSample = () => {
 if (onRequestSample) {
 onRequestSample(product);
 }
 };

 // Handle card click - same as configure action
 const handleCardClick = () => {
 handleConfigure();
 };

 return {
 handleConfigure,
 handleRequestSample,
 handleCardClick
 };
}; 