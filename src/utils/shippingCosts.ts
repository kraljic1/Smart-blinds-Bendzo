/**
 * Shipping cost calculation utilities
 */

export interface ShippingMethod {
  id: string;
  name: string;
  cost: number;
  description?: string;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard delivery',
    cost: 0,
    description: 'Standardna dostava'
  },
  {
    id: 'express',
    name: 'Express delivery',
    cost: 10,
    description: 'Brza dostava (+€10)'
  },
  {
    id: 'same-day',
    name: 'Same day delivery',
    cost: 20,
    description: 'Dostava isti dan (+€20)'
  }
];

/**
 * Mapping of display names to shipping method IDs
 * Centralized to avoid duplication and ensure consistency
 */
const SHIPPING_METHOD_NAME_MAP: Record<string, string> = {
  'Standard delivery': 'standard',
  'Standardna dostava': 'standard',
  'Express delivery': 'express',
  'Brza dostava (+€10)': 'express',
  'Same day delivery': 'same-day',
  'Dostava isti dan (+€20)': 'same-day'
};

/**
 * Helper function to find shipping method by display name or ID
 * @param shippingMethod - The selected shipping method (display name or ID)
 * @returns The shipping method object or null if not found
 */
const findShippingMethod = (shippingMethod: string): ShippingMethod | null => {
  const methodId = SHIPPING_METHOD_NAME_MAP[shippingMethod] || shippingMethod || 'standard';
  return SHIPPING_METHODS.find(m => m.id === methodId) || null;
};

/**
 * Get shipping cost based on delivery method
 * @param shippingMethod - The selected shipping method
 * @returns The shipping cost in euros
 */
export const getShippingCost = (shippingMethod: string): number => {
  const method = findShippingMethod(shippingMethod);
  return method ? method.cost : 0;
};

/**
 * Get shipping method details
 * @param shippingMethod - The selected shipping method
 * @returns The shipping method object or null if not found
 */
export const getShippingMethodDetails = (shippingMethod: string): ShippingMethod | null => {
  return findShippingMethod(shippingMethod);
}; 