import { FilterGroup } from '../types/filter';

export const filterGroups: FilterGroup[] = [
  {
    id: 'colors',
    title: 'COLOR GROUP',
    options: [
      { id: 'white', label: 'White', value: 'White' },
      { id: 'grey', label: 'Grey', value: 'Grey' },
      { id: 'sand', label: 'Sand', value: 'Sand' },
      { id: 'beige', label: 'Beige', value: 'Beige' },
      { id: 'brown', label: 'Brown', value: 'Brown' },
      { id: 'blue', label: 'Blue', value: 'Blue' },
      { id: 'black', label: 'Black', value: 'Black' }
    ]
  },
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
    options: [
      { id: 'essential', label: 'Essential', value: 'Essential' },
      { id: 'comfort', label: 'Comfort', value: 'Comfort' },
      { id: 'classic', label: 'Classic', value: 'Classic' },
      { id: 'solar', label: 'Solar', value: 'Solar' },
      { id: 'screen', label: 'Screen', value: 'Screen' },
      { id: 'texture', label: 'Texture', value: 'Texture' },
      { id: 'balance', label: 'Balance', value: 'Balance' },
      { id: 'pure', label: 'Pure', value: 'Pure' },
      { id: 'accent', label: 'Accent', value: 'Accent' }
    ]
  },
  {
    id: 'backingColors',
    title: 'BACKING COLOR',
    options: [
      { id: 'white-backing', label: 'White backing', value: 'White backing' },
      { id: 'colored-backing', label: 'Colored backing', value: 'Colored backing' },
      { id: 'thermal-backing', label: 'Thermal backing', value: 'Thermal backing' }
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