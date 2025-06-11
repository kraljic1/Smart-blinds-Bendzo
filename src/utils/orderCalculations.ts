import { OrderItemDisplay } from '../types/adminOrder';

/**
 * Calculate the subtotal for order items
 */
export const calculateOrderSubtotal = (items: OrderItemDisplay[]): number => {
 return items.reduce((acc, item) => {
 const price = item.price ? Number(item.price) : 0;
 return acc + (price * item.quantity);
 }, 0);
}; 