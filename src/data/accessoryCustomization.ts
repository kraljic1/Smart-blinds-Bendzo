import { CustomizationOption } from '../types/customization';

// Customization options for all accessory products
export const getAccessoryCustomizationOptions = (productId: string): CustomizationOption[] => {
  switch (productId) {
    case 'matter-bridge-cm55':
      return [
        {
          id: 'color',
          name: 'Color',
          options: [
            { id: 'black', name: 'Black', price: 0 },
            { id: 'white', name: 'White', price: 0 }
          ]
        },
        {
          id: 'installation',
          name: 'Installation Service',
          options: [
            { id: 'self', name: 'Self-installation', price: 0 },
            { id: 'professional', name: 'Professional Installation', price: 49.99 }
          ]
        },
        {
          id: 'warranty',
          name: 'Extended Warranty',
          options: [
            { id: 'standard', name: 'Standard (1 Year)', price: 0 },
            { id: 'extended', name: 'Extended (3 Years)', price: 29.99 }
          ]
        }
      ];

    case 'remote-5-channel':
      return [
        {
          id: 'color',
          name: 'Color',
          options: [
            { id: 'white', name: 'White', price: 0 },
            { id: 'black', name: 'Black', price: 0 }
          ]
        },
        {
          id: 'programming',
          name: 'Pre-programming',
          options: [
            { id: 'none', name: 'No Programming', price: 0 },
            { id: 'basic', name: 'Basic Programming', price: 19.99 },
            { id: 'advanced', name: 'Advanced Programming', price: 39.99 }
          ]
        },
        {
          id: 'warranty',
          name: 'Extended Warranty',
          options: [
            { id: 'standard', name: 'Standard (1 Year)', price: 0 },
            { id: 'extended', name: 'Extended (2 Years)', price: 14.99 }
          ]
        }
      ];

    case 'remote-15-channel':
      return [
        {
          id: 'color',
          name: 'Color',
          options: [
            { id: 'black', name: 'Black', price: 0 },
            { id: 'white', name: 'White', price: 0 }
          ]
        },
        {
          id: 'programming',
          name: 'Pre-programming',
          options: [
            { id: 'none', name: 'No Programming', price: 0 },
            { id: 'basic', name: 'Basic Programming', price: 24.99 },
            { id: 'advanced', name: 'Advanced Programming', price: 49.99 }
          ]
        },
        {
          id: 'holder',
          name: 'Wall Holder',
          options: [
            { id: 'none', name: 'No Wall Holder', price: 0 },
            { id: 'standard', name: 'Standard Wall Holder', price: 9.99 },
            { id: 'premium', name: 'Premium Magnetic Holder', price: 19.99 }
          ]
        }
      ];

    case 'wifi-bridge-cm20':
      return [
        {
          id: 'installation',
          name: 'Installation Service',
          options: [
            { id: 'self', name: 'Self-installation', price: 0 },
            { id: 'professional', name: 'Professional Installation', price: 49.99 }
          ]
        },
        {
          id: 'connectivity',
          name: 'Connectivity Package',
          options: [
            { id: 'standard', name: 'Standard', price: 0 },
            { id: 'premium', name: 'Premium (With Extended Range)', price: 19.99 }
          ]
        },
        {
          id: 'warranty',
          name: 'Extended Warranty',
          options: [
            { id: 'standard', name: 'Standard (1 Year)', price: 0 },
            { id: 'extended', name: 'Extended (3 Years)', price: 29.99 }
          ]
        }
      ];

    case 'eve-smart-plug':
      return [
        {
          id: 'quantity',
          name: 'Quantity',
          options: [
            { id: 'single', name: 'Single Plug', price: 0 },
            { id: 'pair', name: 'Pair (2 Plugs)', price: 39.99 },
            { id: 'trio', name: 'Trio (3 Plugs)', price: 74.99 }
          ]
        },
        {
          id: 'power-monitoring',
          name: 'Power Monitoring',
          options: [
            { id: 'standard', name: 'Standard', price: 0 },
            { id: 'advanced', name: 'Advanced Energy Monitoring', price: 14.99 }
          ]
        },
        {
          id: 'warranty',
          name: 'Extended Warranty',
          options: [
            { id: 'standard', name: 'Standard (1 Year)', price: 0 },
            { id: 'extended', name: 'Extended (2 Years)', price: 9.99 }
          ]
        }
      ];

    case 'usb-c-cable':
      return [
        {
          id: 'length',
          name: 'Cable Length',
          options: [
            { id: 'standard', name: 'Standard (1m)', price: 0 },
            { id: 'medium', name: 'Medium (2m)', price: 4.99 },
            { id: 'long', name: 'Long (3m)', price: 9.99 }
          ]
        },
        {
          id: 'type',
          name: 'Cable Type',
          options: [
            { id: 'standard', name: 'Standard', price: 0 },
            { id: 'braided', name: 'Braided (More Durable)', price: 7.99 }
          ]
        },
        {
          id: 'quantity',
          name: 'Quantity',
          options: [
            { id: 'single', name: 'Single Cable', price: 0 },
            { id: 'double', name: 'Pack of 2', price: 12.99 },
            { id: 'triple', name: 'Pack of 3', price: 19.99 }
          ]
        }
      ];

    default:
      return [];
  }
}; 