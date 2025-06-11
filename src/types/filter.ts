export interface FilterOption {
 id: string;
 label: string;
 value: string;
}

export interface FilterGroup {
 id: string;
 title: string;
 options: FilterOption[];
 filterCategory?: string; // Optional property to specify which category this filter belongs to
}

export interface ProductFilters {
 colors: string[];
 fabricTypes: string[];
 collections: string[];
 operations: string[];
}

export interface FilterState {
 filters: ProductFilters;
 setFilter: (groupId: keyof ProductFilters, value: string, checked: boolean) => void;
 resetFilters: () => void;
 applyFilters: (products: Product[]) => Product[];
}

// Import this after defining the interfaces to avoid circular dependencies
import { Product } from './product'; 