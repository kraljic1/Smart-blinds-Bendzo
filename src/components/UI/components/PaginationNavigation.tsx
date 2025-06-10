import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationNavigation: React.FC<PaginationNavigationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <>
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Prethodna</span>
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      
      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Sljedeća</span>
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
};

export default PaginationNavigation; 