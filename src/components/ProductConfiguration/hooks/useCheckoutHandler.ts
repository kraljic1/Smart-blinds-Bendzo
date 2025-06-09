import { useCallback } from 'react';

interface UseCheckoutHandlerProps {
  width: number | '';
  height: number | '';
  additionalCosts: { name: string; price: number }[];
  onCheckout: (
    quantity: number, 
    width: number | '', 
    height: number | '', 
    additionalCosts: { name: string; price: number }[], 
    calculatedPrice: number
  ) => void;
}

export function useCheckoutHandler({
  width,
  height,
  additionalCosts,
  onCheckout
}: UseCheckoutHandlerProps) {
  const handleCheckoutWithDetails = useCallback(
    (quantity: number, calculatedPrice: number) => {
      console.log('handleCheckoutWithDetails called with:', { 
        quantity, 
        calculatedPrice, 
        width, 
        height, 
        additionalCosts 
      });
      onCheckout(quantity, width, height, additionalCosts, calculatedPrice);
    },
    [width, height, additionalCosts, onCheckout]
  );

  return { handleCheckoutWithDetails };
} 