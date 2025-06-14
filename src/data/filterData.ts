import { FilterGroup } from '../types/filter';

// Common filter groups
const commonFilterGroups: FilterGroup[] = [
 {
 id: 'colors',
 title: 'COLOR GROUP',
 options: [
 { id: 'white', label: 'White', value: 'White' },
 { id: 'grey', label: 'Grey', value: 'Grey' },
 { id: 'sand', label: 'Sand', value: 'Sand' },
 { id: 'brown', label: 'Brown', value: 'Brown' },
 { id: 'black', label: 'Black', value: 'Black' }
 ]
 },
 {
 id: 'operations',
 title: 'OPERATION',
 options: [
 { id: 'motor', label: 'Motor', value: 'Motor' },
 { id: 'chain', label: 'Chain', value: 'Chain' }
 ]
 }
];

// Roller blinds specific filter groups
const rollerBlindFilterGroups: FilterGroup[] = [
 {
 id: 'fabricTypes',
 title: 'TYPE OF FABRIC',
 options: [
 { id: 'blackout', label: 'Blackout', value: 'Blackout' },
 { id: 'light-filtering', label: 'Light filtering', value: 'Light filtering' },
 { id: 'transparent', label: 'Transparent', value: 'Transparent' },
 { id: 'screen', label: 'Screen', value: 'Screen' }
 ]
 },
 {
 id: 'collections',
 title: 'COLLECTION',
 filterCategory: 'roller',
 options: [
 { id: 'essential', label: 'Essential', value: 'Essential' },
 { id: 'comfort', label: 'Comfort', value: 'Comfort' },
 { id: 'classic', label: 'Classic', value: 'Classic' },
 { id: 'solar', label: 'Solar', value: 'Solar' },
 { id: 'screen', label: 'Screen', value: 'Screen' },
 { id: 'texture', label: 'Texture', value: 'Texture' }
 ]
 }
];

// Zebra blinds specific filter groups
const zebraBlindFilterGroups: FilterGroup[] = [
 {
 id: 'collections',
 title: 'COLLECTION',
 filterCategory: 'zebra',
 options: [
 { id: 'balance', label: 'Balance', value: 'Balance' },
 { id: 'pure', label: 'Pure', value: 'Pure' },
 { id: 'accent', label: 'Accent', value: 'Accent' }
 ]
 }
];

// Main export - combine all filter groups
export const filterGroups: FilterGroup[] = [
 ...commonFilterGroups,
 ...rollerBlindFilterGroups,
 ...zebraBlindFilterGroups
]; 