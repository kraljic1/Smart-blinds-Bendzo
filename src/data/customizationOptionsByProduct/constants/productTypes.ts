// Product type constants for customization options
export const ACCESSORY_PRODUCT_IDS = [
 'matter-bridge-cm55',
 'remote-5-channel',
 'remote-15-channel',
 'wifi-bridge-cm20',
 'eve-smart-plug',
 'usb-c-cable'
] as const;

export const SPECIAL_PRODUCT_IDS = {
 CURTAIN_TRACK: 'glider-track'
} as const;

export const PRODUCT_COLLECTIONS = {
 CURTAIN: 'curtain'
} as const;

export type AccessoryProductId = typeof ACCESSORY_PRODUCT_IDS[number];
export type SpecialProductId = typeof SPECIAL_PRODUCT_IDS[keyof typeof SPECIAL_PRODUCT_IDS]; 