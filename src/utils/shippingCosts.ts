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
 * Get shipping cost based on delivery method
 * @param shippingMethod - The selected shipping method
 * @returns The shipping cost in euros
 */
export const getShippingCost = (shippingMethod: string): number => {
  // Map display names to shipping method IDs
  const methodMap: Record<string, string> = {
    'Standard delivery': 'standard',
    'Standardna dostava': 'standard',
    'Express delivery': 'express',
    'Brza dostava (+€10)': 'express',
    'Same day delivery': 'same-day',
    'Dostava isti dan (+€20)': 'same-day'
  };

  const methodId = methodMap[shippingMethod] || 'standard';
  const method = SHIPPING_METHODS.find(m => m.id === methodId);
  
  return method ? method.cost : 0;
};

/**
 * Get shipping method details
 * @param shippingMethod - The selected shipping method
 * @returns The shipping method object or null if not found
 */
export const getShippingMethodDetails = (shippingMethod: string): ShippingMethod | null => {
  const methodMap: Record<string, string> = {
    'Standard delivery': 'standard',
    'Standardna dostava': 'standard',
    'Express delivery': 'express',
    'Brza dostava (+€10)': 'express',
    'Same day delivery': 'same-day',
    'Dostava isti dan (+€20)': 'same-day'
  };

  const methodId = methodMap[shippingMethod] || 'standard';
  return SHIPPING_METHODS.find(m => m.id === methodId) || null;
}; 