import { BasketItem, OrderItem } from './orderTypes';

/**
 * Convert basket items to order items format
 */
export const basketItemsToOrderItems = (items: BasketItem[]): OrderItem[] => {
  return items.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    productImage: item.product.image,
    quantity: item.quantity,
    price: item.product.price,
    width: item.options?.width as number | undefined,
    height: item.options?.height as number | undefined,
    options: item.options
  }));
}; 