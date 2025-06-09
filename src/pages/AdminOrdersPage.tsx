import React from 'react';
import { usePagination } from '../hooks/usePagination';
import { useOrderData } from '../hooks/useOrderData';
import { useOrderFilter } from '../hooks/useOrderFilter';
import OrdersPageLayout from '../components/Admin/OrdersPageLayout';

/**
 * Admin Orders Page - Refactored with custom hooks and components
 * Handles order management for administrators
 */
const AdminOrdersPage: React.FC = () => {
  // Pagination configuration
  const ITEMS_PER_PAGE = 10;
  
  // Custom hooks for data management
  const { orders, isLoading, error, isRefreshing, fetchOrders, handleRefresh } = useOrderData();
  const { searchTerm, setSearchTerm, filteredOrders, handleClearFilter } = useOrderFilter(orders);
  
  // Pagination hook
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedOrders,
    goToPage
  } = usePagination({
    data: filteredOrders,
    itemsPerPage: ITEMS_PER_PAGE
  });
  
  return (
    <OrdersPageLayout
      orders={orders}
      isLoading={isLoading}
      error={error}
      isRefreshing={isRefreshing}
      searchTerm={searchTerm}
      filteredOrders={filteredOrders}
      paginatedOrders={paginatedOrders}
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={ITEMS_PER_PAGE}
      onRefresh={handleRefresh}
      onSearchTermChange={setSearchTerm}
      onClearFilter={handleClearFilter}
      onOrderDeleted={fetchOrders}
      onPageChange={goToPage}
    />
  );
};

export default AdminOrdersPage; 