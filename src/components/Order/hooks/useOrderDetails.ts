import { useState, useEffect, useCallback } from 'react';
import { getOrderById } from '../../../utils/orderUtils';
import { ExtendedOrderData } from '../types';

interface UseOrderDetailsReturn {
 orderDetails: ExtendedOrderData | null;
 isLoading: boolean;
 fetchError: string | null;
 refetchOrder: () => void;
}

export const useOrderDetails = (orderId: string): UseOrderDetailsReturn => {
 const [orderDetails, setOrderDetails] = useState<ExtendedOrderData | null>(null);
 const [isLoading, setIsLoading] = useState(false);
 const [fetchError, setFetchError] = useState<string | null>(null);

 const fetchOrderDetails = useCallback(async () => {
 if (!orderId) return;
 
 setIsLoading(true);
 setFetchError(null);
 
 console.log('[ORDER-DETAILS] Fetching order details for:', orderId);
 
 try {
 const data = await getOrderById(orderId);
 console.log('[ORDER-DETAILS] Order details received:', data);
 console.log('[ORDER-DETAILS] Order items:', data?.items);
 
 if (data) {
 setOrderDetails(data as unknown as ExtendedOrderData);
 } else {
 setFetchError('Narudžba nije pronađena u bazi podataka');
 }
 } catch (error) {
 console.error('[ORDER-DETAILS] Error fetching order details:', error);
 setFetchError('Greška pri dohvaćanju detalja narudžbe');
 } finally {
 setIsLoading(false);
 }
 }, [orderId]);

 useEffect(() => {
 fetchOrderDetails();
 }, [fetchOrderDetails]);

 return {
 orderDetails,
 isLoading,
 fetchError,
 refetchOrder: fetchOrderDetails
 };
}; 