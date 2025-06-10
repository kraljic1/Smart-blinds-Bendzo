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
      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
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
          ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-200'
          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
      }`}
    >
      {page}
    </button>
  );
};

export default PaginationButton; 