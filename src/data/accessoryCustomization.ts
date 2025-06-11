import { CustomizationOption } from '../types/customization';

// Customization options for all accessory products
export const getAccessoryCustomizationOptions = (productId: string): CustomizationOption[] => {
 switch (productId) {
 case 'matter-bridge-cm55':
 return [
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
 id: 'warranty',
 name: 'Extended Warranty',
 options: [
 { id: 'standard', name: 'Standard (1 Year)', price: 0 },
 { id: 'extended', name: 'Extended (2 Years)', price: 14.99 }
 ]
 }
 ];

 case 'wifi-bridge-cm20':
 return [
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
 id: 'warranty',
 name: 'Extended Warranty',
 options: [
 { id: 'standard', name: 'Standard (1 Year)', price: 0 },
 { id: 'extended', name: 'Extended (2 Years)', price: 9.99 }
 ]
 }
 ];

 default:
 return [];
 }
}; 