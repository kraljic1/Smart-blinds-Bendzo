import React from 'react';
import PaginationInfo from './PaginationInfo';
import PaginationButton from './PaginationButton';
import PaginationNavigation from './PaginationNavigation';

interface DesktopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startItem: number;
  endItem: number;
  totalItems: number;
  pageNumbers: (number | string)[];
}

const DesktopPagination: React.FC<DesktopPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  startItem,
  endItem,
  totalItems,
  pageNumbers
}) => {
  return (
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <PaginationInfo 
        startItem={startItem}
        endItem={endItem}
        totalItems={totalItems}
      />
      
      <div>
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <PaginationNavigation 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          >
            {pageNumbers.map((page, index) => (
              <PaginationButton
                key={index}
                page={page}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            ))}
          </PaginationNavigation>
        </nav>
      </div>
    </div>
  );
};

export default DesktopPagination; 