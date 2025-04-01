export interface Category {
  id: string;
  name: string;
  path: string;
  description: string;
}

export const categories: Category[] = [
  { 
    id: 'all', 
    name: 'All Products',
    path: '/products',
    description: 'Explore our complete range of smart window solutions'
  },
  { 
    id: 'roller', 
    name: 'Roller Blinds',
    path: '/products/roller-blinds',
    description: 'Classic smart blinds with smooth operation'
  },
  { 
    id: 'daynight', 
    name: 'Day & Night Blinds',
    path: '/products/day-night-blinds',
    description: 'Perfect balance of light and privacy'
  },
  { 
    id: 'honeycomb', 
    name: 'Honeycomb Blinds',
    path: '/products/honeycomb-blinds',
    description: 'Energy-efficient cellular shades'
  },
  { 
    id: 'tracks', 
    name: 'Curtain Tracks',
    path: '/products/curtain-tracks',
    description: 'Smart motorized curtain systems'
  },
  { 
    id: 'accessories', 
    name: 'Accessories',
    path: '/products/accessories',
    description: 'Remote controls, hubs, and more'
  }
]; 