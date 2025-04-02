import { CustomizationOption } from '../components/ProductCustomization';

// Using placeholder images from public sources
const installationInsideImg = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=200&q=80&fit=crop&auto=format';
const installationOutsideImg = 'https://images.unsplash.com/photo-1630119852161-1b46ac627e8d?w=300&h=200&q=80&fit=crop&auto=format';
const bracketImg = 'https://images.unsplash.com/photo-1603803721487-57b3f92ee656?w=300&h=200&q=80&fit=crop&auto=format';
const cassetteImg = 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=300&h=200&q=80&fit=crop&auto=format';

export const defaultCustomizationOptions: CustomizationOption[] = [
  {
    id: 'installation',
    name: 'Installation',
    options: [
      {
        id: 'inside',
        name: 'Inside the recess',
        image: installationInsideImg,
        price: 0,
      },
      {
        id: 'outside',
        name: 'Outside the recess',
        image: installationOutsideImg,
        price: 0,
      },
    ],
  },
  {
    id: 'transparency',
    name: 'Transparency',
    textOnly: true,
    options: [
      {
        id: 'light',
        name: 'Light filtering',
        price: 0,
      },
      {
        id: 'blackout',
        name: 'Blackout',
        price: 15.00,
      },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      {
        id: 'off-white',
        name: 'Off-White',
        color: '#e9e9e7',
        price: 0,
      },
      {
        id: 'white',
        name: 'White',
        color: '#f9f9f7',
        price: 0,
      },
      {
        id: 'light-gray',
        name: 'Light Gray',
        color: '#d4d4d4',
        price: 0,
      },
      {
        id: 'blue-gray',
        name: 'Blue Gray',
        color: '#d1d5df',
        price: 0,
      },
      {
        id: 'gray',
        name: 'Gray',
        color: '#b8b8b8',
        price: 0,
      },
      {
        id: 'navy',
        name: 'Navy',
        color: '#404659',
        price: 0,
      },
      {
        id: 'mid-gray',
        name: 'Mid Gray',
        color: '#8f8f8f',
        price: 0,
      },
      {
        id: 'charcoal',
        name: 'Charcoal',
        color: '#373e4d',
        price: 0,
      },
      {
        id: 'beige',
        name: 'Beige',
        color: '#d9cfc1',
        price: 0,
      },
    ],
  },
  {
    id: 'system',
    name: 'System Type',
    options: [
      {
        id: 'brackets',
        name: 'Brackets',
        image: bracketImg,
        price: 0,
      },
      {
        id: 'cassette',
        name: 'Cassette',
        image: cassetteImg,
        price: 25.00,
      },
    ],
  },
  {
    id: 'size',
    name: 'System Size',
    options: [
      {
        id: 'small',
        name: 'Small',
        image: 'https://images.unsplash.com/photo-1588854337116-d1e008a28b7c?w=300&h=200&q=80&fit=crop&auto=format',
        price: 0,
      },
      {
        id: 'large',
        name: 'Large',
        image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa2314f4?w=300&h=200&q=80&fit=crop&auto=format',
        price: 35.00,
      },
    ],
  },
  {
    id: 'motor_type',
    name: 'Motor Type',
    options: [
      {
        id: 'bluetooth',
        name: 'Motionblinds Bluetooth motor',
        image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=300&h=200&q=80&fit=crop&auto=format',
        price: 0,
      },
      {
        id: 'matter',
        name: 'Eve Motionblinds Matter motor',
        image: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=300&h=200&q=80&fit=crop&auto=format',
        price: 50.00,
      },
    ],
  },
  {
    id: 'motor_side',
    name: 'Motor Side',
    textOnly: true,
    options: [
      {
        id: 'links',
        name: 'Left',
        price: 0,
      },
      {
        id: 'rechts',
        name: 'Rechts',
        price: 0,
      },
    ],
  },
  {
    id: 'bottom_bar',
    name: 'Bottom Bar',
    options: [
      {
        id: 'metal',
        name: 'Metal',
        image: 'https://images.unsplash.com/photo-1535161666835-5b3000fa5e56?w=300&h=200&q=80&fit=crop&auto=format',
        price: 0,
      },
      {
        id: 'straight_covered',
        name: 'Straight Covered',
        image: 'https://images.unsplash.com/photo-1580894894513-533b8d993488?w=300&h=200&q=80&fit=crop&auto=format',
        price: 10.00,
      },
      {
        id: 'straight_sewn',
        name: 'Straight Sewn',
        image: 'https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?w=300&h=200&q=80&fit=crop&auto=format',
        price: 15.00,
      },
    ],
  },
  {
    id: 'remote',
    name: 'Would you like to add a remote control to your Smartblinds?',
    textOnly: true,
    options: [
      {
        id: 'none',
        name: 'No',
        price: 0,
      },
      {
        id: '5channel',
        name: '5-channel',
        price: 45.00,
      },
      {
        id: '15channel',
        name: '15-channel',
        price: 65.00,
      },
    ],
  },
]; 