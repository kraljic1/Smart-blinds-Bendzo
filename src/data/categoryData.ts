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
    id: 'zebra', 
    name: 'Zebra Blinds',
    path: '/products/zebra-blinds',
    description: 'Perfect balance of light and privacy'
  },
  { 
    id: 'curtain', 
    name: 'Curtain Blinds',
    path: '/products/curtain-blinds',
    description: 'Elegant curtain solutions for your windows'
  },
  { 
    id: 'accessories', 
    name: 'Accessories',
    path: '/products/accessories',
    description: 'Smart home accessories for your blinds'
  }
]; 