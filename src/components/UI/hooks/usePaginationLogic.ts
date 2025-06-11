import { useMemo } from 'react';

interface UsePaginationLogicProps {
 currentPage: number;
 totalPages: number;
 itemsPerPage: number;
 totalItems: number;
}

export const usePaginationLogic = ({
 currentPage,
 totalPages,
 itemsPerPage,
 totalItems
}: UsePaginationLogicProps) => {
 
 // Calculate the range of items being displayed
 const itemRange = useMemo(() => {
 const startItem = (currentPage - 1) * itemsPerPage + 1;
 const endItem = Math.min(currentPage * itemsPerPage, totalItems);
 return { startItem, endItem };
 }, [currentPage, itemsPerPage, totalItems]);

 // Generate page numbers to display
 const pageNumbers = useMemo(() => {
 const pages: (number | string)[] = [];
 const maxVisiblePages = 5;
 
 if (totalPages <= maxVisiblePages) {
 // Show all pages if total pages is small
 for (let i = 1; i <= totalPages; i++) {
 pages.push(i);
 }
 } else {
 // Show first page
 pages.push(1);
 
 if (currentPage > 3) {
 pages.push('...');
 }
 
 // Show pages around current page
 const start = Math.max(2, currentPage - 1);
 const end = Math.min(totalPages - 1, currentPage + 1);
 
 for (let i = start; i <= end; i++) {
 pages.push(i);
 }
 
 if (currentPage < totalPages - 2) {
 pages.push('...');
 }
 
 // Show last page
 if (totalPages > 1) {
 pages.push(totalPages);
 }
 }
 
 return pages;
 }, [currentPage, totalPages]);

 return {
 ...itemRange,
 pageNumbers
 };
}; 