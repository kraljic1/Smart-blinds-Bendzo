import { useState, useEffect, useCallback } from 'react';
import { ExtendedOrderData, OrderItemDisplay } from '../types/adminOrder';
import { getOrderByIdFallback } from '../utils/orderService';

interface UseOrderDetailsReturn {
 order: ExtendedOrderData | null;
 items: OrderItemDisplay[];
 isLoading: boolean;
 error: string | null;
 refreshOrder: () => Promise<void>;
}

export const useOrderDetails = (orderId: string | undefined): UseOrderDetailsReturn => {
 const [order, setOrder] = useState<ExtendedOrderData | null>(null);
 const [items, setItems] = useState<OrderItemDisplay[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const fetchOrderDetails = useCallback(async () => {
 if (!orderId) {
 setError('ID narudžbe nedostaje');
 setIsLoading(false);
 return;
 }

 try {
 setIsLoading(true);
 const data = await getOrderByIdFallback(orderId);

 if (!data) {
 setError('Narudžba nije pronađena');
 } else {
 setOrder(data);

 // Process items from the API response
 if (data.items && Array.isArray(data.items)) {
 const formattedItems = data.items.map((item: ExtendedOrderData['items'][0]) => ({
 productId: item.productId,
 productName: item.productName,
 quantity: item.quantity,
 price: item.unitPrice || 0,
 options: item.options || {},
 width: item.width,
 height: item.height
 }));
 setItems(formattedItems);
 } else {
 setItems([]);
 }
 }
 } catch (err) {
 console.error('Error fetching order details:', err);
 setError('Neuspješno učitavanje detalja narudžbe');
 } finally {
 setIsLoading(false);
 }
 }, [orderId]);

 const refreshOrder = async () => {
 if (orderId) {
 const data = await getOrderByIdFallback(orderId);
 if (data) setOrder(data);
 }
 };

 useEffect(() => {
 fetchOrderDetails();
 }, [fetchOrderDetails]);

 return {
 order,
 items,
 isLoading,
 error,
 refreshOrder
 };
}; 