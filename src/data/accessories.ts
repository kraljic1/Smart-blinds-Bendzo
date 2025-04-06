import { Product } from '../types/product';

// Import images for Matter Bridge
import matterBridge0 from '../img/accessories/motion bridge cm-55/0.webp';
import matterBridge1 from '../img/accessories/motion bridge cm-55/1.webp';
import matterBridge2 from '../img/accessories/motion bridge cm-55/2.webp';
import matterBridge3 from '../img/accessories/motion bridge cm-55/3.webp';

// Import images for Remote 5 Channel
import remote5channel0 from '../img/accessories/remote 5-channel/0.webp';

// Import images for Remote 15 Channel
import remote15channel0 from '../img/accessories/remote 15-channel/0.webp';

// Import images for WiFi Bridge
import wifiBridge0 from '../img/accessories/wifi bridge cm-20/0.webp';

// Import images for Smart Plug
import smartPlug0 from '../img/accessories/smart plug /0.webp';
import smartPlug1 from '../img/accessories/smart plug /1.webp';
import smartPlug2 from '../img/accessories/smart plug /2.webp';

// Import images for USB Cable
import usbCable0 from '../img/accessories/usb-c cable/0.webp';
import usbCable1 from '../img/accessories/usb-c cable/1.webp';

export interface AccessoryProduct extends Product {
  features: string[];
  colors: number;
  colorHex: string;
  fabricColor: string;
  images: string[];
}

export const accessories: AccessoryProduct[] = [
  {
    id: "matter-bridge-cm55",
    name: "MOTIONBLINDS MATTER BRIDGE CM-55",
    price: 159.99,
    originalPrice: 189.99,
    image: matterBridge0,
    features: ["Matter"],
    colors: 1,
    colorHex: "#333333",
    fabricColor: "#333333",
    images: [
      matterBridge0,
      matterBridge1,
      matterBridge2,
      matterBridge3
    ]
  },
  {
    id: "remote-5-channel",
    name: "MOTIONBLINDS 5-CHANNEL REMOTE CONTROL",
    price: 59.99,
    originalPrice: 79.99,
    image: remote5channel0,
    features: ["5 Channels"],
    colors: 2,
    colorHex: "#FFFFFF",
    fabricColor: "#FFFFFF",
    images: [
      remote5channel0
    ]
  },
  {
    id: "remote-15-channel",
    name: "MOTIONBLINDS 15-CHANNEL REMOTE",
    price: 79.99,
    originalPrice: 99.99,
    image: remote15channel0,
    features: ["15 Channels"],
    colors: 2,
    colorHex: "#000000",
    fabricColor: "#000000",
    images: [
      remote15channel0
    ]
  },
  {
    id: "wifi-bridge-cm20",
    name: "MOTIONBLINDS WI-FI BRIDGE CM-20",
    price: 129.99,
    originalPrice: 149.99,
    image: wifiBridge0,
    features: ["Wi-Fi"],
    colors: 1,
    colorHex: "#222222",
    fabricColor: "#222222",
    images: [
      wifiBridge0
    ]
  },
  {
    id: "eve-smart-plug",
    name: "EVE ENERGY – SMART PLUG & RANGE EXTENDER",
    price: 49.99,
    originalPrice: 59.99,
    image: smartPlug0,
    features: ["Matter"],
    colors: 1,
    colorHex: "#FFFFFF",
    fabricColor: "#FFFFFF",
    images: [
      smartPlug0,
      smartPlug1,
      smartPlug2
    ]
  },
  {
    id: "usb-c-cable",
    name: "SMARTBLINDS USB-C CHARGING CABLE",
    price: 14.99,
    originalPrice: 19.99,
    image: usbCable0,
    features: ["Charging"],
    colors: 1,
    colorHex: "#000000",
    fabricColor: "#000000",
    images: [
      usbCable0,
      usbCable1
    ]
  }
]; 