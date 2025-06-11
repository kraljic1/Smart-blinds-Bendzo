import React from 'react';

interface MobilePaginationProps {
 currentPage: number;
 totalPages: number;
 onPageChange: (page: number) => void;
}

const MobilePagination: React.FC<MobilePaginationProps> = ({
 currentPage,
 totalPages,
 onPageChange
}) => {
 return (
 <div className="flex-1 flex justify-between sm:hidden">
 <button
 onClick={() => onPageChange(currentPage - 1)}
 disabled={currentPage === 1}
 className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 Prethodna
 </button>
 <button
 onClick={() => onPageChange(currentPage + 1)}
 disabled={currentPage === totalPages}
 className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 Sljedeća
 </button>
 </div>
 );
};

export default MobilePagination; 