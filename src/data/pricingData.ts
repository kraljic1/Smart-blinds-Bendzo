export interface PricingData {
 baseRate: number;
 minimumCharge: number;
 additionalOptions: {
 id: string;
 name: string;
 price: number;
 description?: string;
 category?: string;
 }[];
}

export interface ProductPricing {
 [productId: string]: PricingData;
}

/**
 * Sample pricing data for different product types
 * baseRate: Price per square meter
 * minimumCharge: Minimum price regardless of size
 */
const pricingData: ProductPricing = {
 // Roller Blinds pricing
 'roller-blinds': {
 baseRate: 45.0,
 minimumCharge: 75.0,
 additionalOptions: [
 {
 id: 'motorized',
 name: 'Motorized Control',
 price: 89.0,
 description: 'Remote-controlled motor for effortless operation',
 category: 'functionality'
 },
 {
 id: 'smart-control',
 name: 'Smart Home Integration',
 price: 55.0,
 description: 'Connect to your smart home system for voice control',
 category: 'functionality'
 },
 {
 id: 'blackout',
 name: 'Blackout Fabric',
 price: 22.0,
 description: 'Complete light blocking for better sleep',
 category: 'material'
 },
 {
 id: 'uv-protection',
 name: 'UV Protection Coating',
 price: 18.0,
 description: 'Additional UV protection for furniture and flooring',
 category: 'material'
 }
 ]
 },
 
 // Zebra Blinds pricing
 'zebra-blinds': {
 baseRate: 55.0,
 minimumCharge: 90.0,
 additionalOptions: [
 {
 id: 'motorized',
 name: 'Motorized Control',
 price: 99.0,
 category: 'functionality'
 },
 {
 id: 'smart-control',
 name: 'Smart Home Integration',
 price: 60.0,
 category: 'functionality'
 },
 {
 id: 'premium-fabric',
 name: 'Premium Fabric',
 price: 25.0,
 category: 'material'
 },
 {
 id: 'decorative-valance',
 name: 'Decorative Valance',
 price: 30.0,
 category: 'design'
 }
 ]
 },
 
 // Curtain Tracks pricing
 'curtain-tracks': {
 baseRate: 35.0,
 minimumCharge: 60.0,
 additionalOptions: [
 {
 id: 'curved-track',
 name: 'Curved Track',
 price: 45.0,
 category: 'design'
 },
 {
 id: 'motorized',
 name: 'Motorized Control',
 price: 120.0,
 category: 'functionality'
 },
 {
 id: 'corded-system',
 name: 'Corded System',
 price: 30.0,
 category: 'functionality'
 },
 {
 id: 'heavy-duty',
 name: 'Heavy-Duty Track',
 price: 40.0,
 description: 'Reinforced track for heavier curtains',
 category: 'material'
 }
 ]
 }
};

export default pricingData; 