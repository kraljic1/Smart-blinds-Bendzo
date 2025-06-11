import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { useBasketContext } from '../../hooks/useBasketContext';
import { useToast } from '../../hooks/useToast';
import { registerProductDebugTools } from '../../utils/productDebugUtils';

interface UseProductConfigurationLogicProps {
 productId: string | undefined;
 product: Product | null;
}

interface UseProductConfigurationLogicReturn {
 handleGoBack: () => void;
 handleCheckout: (quantity: number, options: Record<string, string | number | boolean>, calculatedPrice: number) => void;
 isAccessoryProduct: boolean;
}

export const useProductConfigurationLogic = ({ 
 productId,
 product
}: UseProductConfigurationLogicProps): UseProductConfigurationLogicReturn => {
 const navigate = useNavigate();
 const { addItem } = useBasketContext();
 const { showToast } = useToast();

 // Helper for browser console - logs products with fewer than 5 images
 useEffect(() => {
 const cleanup = registerProductDebugTools();
 return cleanup;
 }, []);

 // Scroll to top when page loads
 useEffect(() => {
 window.scrollTo(0, 0);
 }, [productId]);

 const handleGoBack = () => {
 navigate(-1);
 };

 const handleCheckout = (
 quantity: number = 1, 
 options: Record<string, string | number | boolean> = {}, 
 calculatedPrice: number
 ) => {
 if (product) {
 // Add item to basket with selected options and calculated price
 addItem(product, quantity, options, calculatedPrice);
 
 // Show a success toast notification
 const message = `${quantity} ${product.name}${quantity > 1 ? 's' : ''} ${quantity > 1 ? 'have' : 'has'} been added to your basket!`;
 showToast(message, 'success', 'Added to Basket');
 }
 };

 const isAccessoryProduct = 
 productId === 'matter-bridge-cm55' ||
 productId === 'remote-5-channel' ||
 productId === 'remote-15-channel' ||
 productId === 'wifi-bridge-cm20' ||
 productId === 'eve-smart-plug' ||
 productId === 'usb-c-cable';

 return {
 handleGoBack,
 handleCheckout,
 isAccessoryProduct
 };
}; 