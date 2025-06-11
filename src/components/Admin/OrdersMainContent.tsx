import React from 'react';
import { SupabaseOrderData } from '../../utils/orderTypes';
import OrderTable from './OrderTable';
import OrderEmptyState from './OrderEmptyState';
import OrderLoadingState from './OrderLoadingState';
import OrderErrorState from './OrderErrorState';
import Pagination from '../UI/Pagination';

interface OrdersMainContentProps {
 isLoading: boolean;
 error: string | null;
 paginatedOrders: SupabaseOrderData[];
 filteredOrdersLength: number;
 searchTerm: string;
 currentPage: number;
 totalPages: number;
 itemsPerPage: number;
 onOrderDeleted: () => void;
 onClearFilter: () => void;
 onPageChange: (page: number) => void;
}

/**
 * Main content component for orders page
 * Handles rendering of different states (loading, error, empty, data)
 */
const OrdersMainContent: React.FC<OrdersMainContentProps> = ({
 isLoading,
 error,
 paginatedOrders,
 filteredOrdersLength,
 searchTerm,
 currentPage,
 totalPages,
 itemsPerPage,
 onOrderDeleted,
 onClearFilter,
 onPageChange
}) => {
 // Render loading state
 if (isLoading) {
 return <OrderLoadingState />;
 }
 
 // Render error state
 if (error) {
 return <OrderErrorState errorMessage={error} />;
 }
 
 // Render empty state
 if (filteredOrdersLength === 0) {
 return <OrderEmptyState searchTerm={searchTerm} onClearFilter={onClearFilter} />;
 }
 
 // Render orders table with pagination
 return (
 <>
 <OrderTable orders={paginatedOrders} onOrderDeleted={onOrderDeleted} />
 <Pagination
 currentPage={currentPage}
 totalPages={totalPages}
 onPageChange={onPageChange}
 itemsPerPage={itemsPerPage}
 totalItems={filteredOrdersLength}
 />
 </>
 );
};

export default OrdersMainContent; 