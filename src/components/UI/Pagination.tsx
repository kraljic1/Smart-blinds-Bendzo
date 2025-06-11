import React from 'react';
import { MobilePagination, DesktopPagination } from './components';
import { usePaginationLogic } from './hooks';
import '../../styles/Pagination.css';

interface PaginationProps {
 currentPage: number;
 totalPages: number;
 onPageChange: (page: number) => void;
 itemsPerPage: number;
 totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
 currentPage,
 totalPages,
 onPageChange,
 itemsPerPage,
 totalItems
}) => {
 // Use custom hook for pagination logic
 const { startItem, endItem, pageNumbers } = usePaginationLogic({
 currentPage,
 totalPages,
 itemsPerPage,
 totalItems
 });

 if (totalPages <= 1) {
 return null;
 }

 return (
 <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
 <div className="flex items-center justify-between">
 <MobilePagination
 currentPage={currentPage}
 totalPages={totalPages}
 onPageChange={onPageChange}
 />
 
 <DesktopPagination
 currentPage={currentPage}
 totalPages={totalPages}
 onPageChange={onPageChange}
 startItem={startItem}
 endItem={endItem}
 totalItems={totalItems}
 pageNumbers={pageNumbers}
 />
 </div>
 </div>
 );
};

export default Pagination; 