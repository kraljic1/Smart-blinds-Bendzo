import { ApiOrderItem, SupabaseOrderItem } from '../../../types/adminOrder';

/**
 * Transforms order items from different data sources
 */
export class OrderItemTransformer {
  /**
   * Transforms order items from API format
   * @param items Array of order items from API
   * @returns Transformed order items
   */
  static transformApiItems(items: ApiOrderItem[]) {
    return items.map((item: ApiOrderItem) => ({
      productId: item.product_id || item.productId || 'unknown',
      productName: item.product_name || item.productName || 'Proizvod bez naziva',
      quantity: item.quantity,
      unitPrice: item.unit_price || item.unitPrice || 0,
      subtotal: item.subtotal,
      width: item.width,
      height: item.height,
      options: item.options || {}
    }));
  }

  /**
   * Transforms order items from Supabase format
   * @param items Array of order items from Supabase
   * @returns Transformed order items
   */
  static transformSupabaseItems(items: SupabaseOrderItem[]) {
    return items.map((item: SupabaseOrderItem) => ({
      productId: `product-${item.id}`,
      productName: item.product_name || 'Proizvod bez naziva',
      quantity: item.quantity,
      unitPrice: item.unit_price,
      subtotal: item.subtotal,
      width: item.width,
      height: item.height,
      options: item.options || {}
    }));
  }
} 