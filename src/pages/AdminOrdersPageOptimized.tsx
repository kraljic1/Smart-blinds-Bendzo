import React from 'react';
import CroatianSEO from '../components/SEO/CroatianSEO';
import AdminHeader from '../components/Admin/AdminHeader';
import OrderSearch from '../components/Admin/OrderSearch';
import OrderEmptyState from '../components/Admin/OrderEmptyState';
import OrderLoadingState from '../components/Admin/OrderLoadingState';
import OrderErrorState from '../components/Admin/OrderErrorState';
import PerformanceIndicator from '../components/Admin/PerformanceIndicator';
import RefreshButton from '../components/Admin/RefreshButton';
import OrdersTable from '../components/Admin/OrdersTable';
import Pagination from '../components/UI/Pagination';
import { useAdminOrders } from '../hooks/useAdminOrders';

// Optimized Admin Orders Page with improved performance
const AdminOrdersPageOptimized: React.FC = () => {
 const {
 orders,
 isLoading,
 error,
 searchTerm,
 isRefreshing,
 totalCount,
 performanceStats,
 currentPage,
 totalPages,
 fetchOrders,
 handleRefresh,
 handleSearch,
 handleClearFilter,
 handlePageChange
 } = useAdminOrders();

 return (
 <div className="min-h-screen bg-gray-50 ">
 <CroatianSEO
 title="Admin Orders | Smartblinds"
 description="Manage customer orders"
 keywords="admin, orders, smartblinds"
 pageType="info"
 noindex={true}
 />
 
 <AdminHeader 
 title="Narudžbe (Optimizirano)"
 subtitle={`${totalCount} ukupno narudžbi`}
 actionButton={
 <div className="flex items-center gap-3">
 <PerformanceIndicator performanceStats={performanceStats} />
 <RefreshButton isRefreshing={isRefreshing} onRefresh={handleRefresh} />
 </div>
 }
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="mb-6">
 <OrderSearch 
 searchTerm={searchTerm}
 onSearch={handleSearch}
 onClear={handleClearFilter}
 placeholder="Pretraži po ID narudžbe, imenu, emailu ili statusu..."
 />
 </div>

 {error && <OrderErrorState message={error} onRetry={() => fetchOrders(currentPage, searchTerm)} />}
 
 {isLoading && <OrderLoadingState />}
 
 {!isLoading && !error && orders.length === 0 && (
 <OrderEmptyState 
 hasSearchTerm={!!searchTerm}
 onClearSearch={handleClearFilter}
 />
 )}
 
 {!isLoading && !error && orders.length > 0 && (
 <>
 <OrdersTable orders={orders} />

 {totalPages > 1 && (
 <div className="mt-6">
 <Pagination
 currentPage={currentPage}
 totalPages={totalPages}
 onPageChange={handlePageChange}
 />
 </div>
 )}
 </>
 )}
 </div>
 </div>
 );
};

export default AdminOrdersPageOptimized; 