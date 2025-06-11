import React from 'react';

interface PaginationButtonProps {
 page: number | string;
 currentPage: number;
 onPageChange: (page: number) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
 page,
 currentPage,
 onPageChange
}) => {
 if (page === '...') {
 return (
 <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
 ...
 </span>
 );
 }

 const pageNumber = page as number;
 const isActive = currentPage === pageNumber;

 return (
 <button
 onClick={() => onPageChange(pageNumber)}
 className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
 isActive
 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 '
 : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 :bg-gray-600'
 }`}
 >
 {page}
 </button>
 );
};

export default PaginationButton; 