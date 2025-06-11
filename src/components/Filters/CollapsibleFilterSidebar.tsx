import { useState, useEffect } from 'react';
import { ProductFilterSidebar } from './index';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Product } from '../../types/product';


interface CollapsibleFilterSidebarProps {
 categoryId: string;
 products: Product[];
 onFilteredProductsChange: (filteredProducts: Product[]) => void;
 className?: string;
}

const CollapsibleFilterSidebar: React.FC<CollapsibleFilterSidebarProps> = ({
 categoryId,
 products,
 onFilteredProductsChange,
 className = ''
}) => {
 const [isOpen, setIsOpen] = useState(false);
 const [isMobile, setIsMobile] = useState(false);

 // Check if we're on mobile on mount and when window resizes
 useEffect(() => {
 const checkIfMobile = () => {
 setIsMobile(window.innerWidth < 1024);
 };
 
 // Initial check
 checkIfMobile();
 
 // Add resize listener
 window.addEventListener('resize', checkIfMobile, { passive: true });
 
 // Cleanup
 return () => window.removeEventListener('resize', checkIfMobile);
 }, []);

 const toggleFilters = () => {
 setIsOpen(!isOpen);
 };

 return (
 <div className={`collapsible-filter-sidebar ${className}`}>
 <button 
 className="filter-toggle-button"
 onClick={toggleFilters}
 aria-expanded={isOpen}
 aria-controls="filter-content"
 >
 <Filter size={18} className="filter-icon"/>
 <span>Filters</span>
 {isOpen ? (
 <ChevronUp size={18} className="chevron-icon"/>
 ) : (
 <ChevronDown size={18} className="chevron-icon"/>
 )}
 </button>
 
 <div 
 id="filter-content"
 className={`filter-content ${isOpen || !isMobile ? 'open' : 'closed'}`}
 >
 <ProductFilterSidebar
 categoryId={categoryId}
 products={products}
 onFilteredProductsChange={onFilteredProductsChange}
 />
 </div>
 </div>
 );
};

export default CollapsibleFilterSidebar; 