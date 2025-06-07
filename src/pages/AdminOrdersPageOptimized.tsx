import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO/SEO';
import AdminHeader from '../components/Admin/AdminHeader';
import OrderSearch from '../components/Admin/OrderSearch';
import OrderEmptyState from '../components/Admin/OrderEmptyState';
import OrderLoadingState from '../components/Admin/OrderLoadingState';
import OrderErrorState from '../components/Admin/OrderErrorState';
import Pagination from '../components/UI/Pagination';

import { 
  getOrdersOptimized, 
  getOrderCountOptimized, 
  searchOrdersOptimized,
  refreshOrderSummary,
  checkQueryPerformance,
  OptimizedOrderSummary 
} from '../utils/optimizedOrderService';

// Optimized Admin Orders Page with improved performance
const AdminOrdersPageOptimized: React.FC = () => {
  const [orders, setOrders] = useState<OptimizedOrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [performanceStats, setPerformanceStats] = useState<{ avg_time_ms: number }[]>([]);
  
  // Pagination configuration
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  
  const fetchOrders = async (page: number = 1, search: string = '') => {
    try {
      setIsLoading(true);
      setError(null);
      
      const offset = (page - 1) * ITEMS_PER_PAGE;
      
      let ordersData: OptimizedOrderSummary[];
      let count: number;
      
      if (search.trim()) {
        // Use optimized search function
        ordersData = await searchOrdersOptimized(search.trim(), ITEMS_PER_PAGE, offset);
        // For search, we'll estimate count based on results
        count = ordersData.length === ITEMS_PER_PAGE ? (page * ITEMS_PER_PAGE) + 1 : (page - 1) * ITEMS_PER_PAGE + ordersData.length;
      } else {
        // Use optimized orders function
        [ordersData, count] = await Promise.all([
          getOrdersOptimized(ITEMS_PER_PAGE, offset),
          getOrderCountOptimized()
        ]);
      }
      
      setOrders(ordersData);
      setTotalCount(count);
      
      // Check performance after loading
      try {
        const perfStats = await checkQueryPerformance();
        setPerformanceStats(perfStats);
      } catch (perfError) {
        console.warn('Could not fetch performance stats:', perfError);
      }
      
    } catch (err) {
      console.error('Greška pri dohvaćanju narudžbi:', err);
      setError('Greška pri učitavanju narudžbi. Molimo pokušajte ponovno kasnije.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
    
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refresh the materialized view first
      await refreshOrderSummary();
      // Then fetch orders
      await fetchOrders(currentPage, searchTerm);
    } catch (error) {
      console.error('Error refreshing orders:', error);
      setError('Greška pri osvježavanju podataka.');
      setIsRefreshing(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    fetchOrders(1, term);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setCurrentPage(1);
    fetchOrders(1, '');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchOrders(page, searchTerm);
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Performance indicator component
  const PerformanceIndicator: React.FC = () => {
    if (performanceStats.length === 0) return null;
    
    const latestStat = performanceStats[0];
    const isGoodPerformance = latestStat?.avg_time_ms < 100;
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isGoodPerformance 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      }`}>
        <span className="mr-1">⚡</span>
        {latestStat?.avg_time_ms?.toFixed(0)}ms
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO 
        title="Admin - Narudžbe | Smartblinds Croatia"
        description="Administratorska stranica za upravljanje narudžbama"
        noIndex={true}
      />
      
      <AdminHeader 
        title="Narudžbe (Optimizirano)"
        subtitle={`${totalCount} ukupno narudžbi`}
        actionButton={
          <div className="flex items-center gap-3">
            <PerformanceIndicator />
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRefreshing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Osvježavanje...
                </>
              ) : (
                <>
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Osvježi
                </>
              )}
            </button>
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
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        ID Narudžbe
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Datum
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Kupac
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Stavke
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Iznos
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Akcije
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {orders.map((order) => (
                      <tr key={order.order_id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {order.order_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(order.created_at).toLocaleDateString('hr-HR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {order.customer_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {order.customer_email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {order.item_count} stavki ({order.total_quantity} kom)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                          €{order.total_amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : order.status === 'processing'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {order.status === 'completed' ? 'Završeno' :
                             order.status === 'processing' ? 'U obradi' :
                             order.status === 'cancelled' ? 'Otkazano' :
                             order.status === 'received' ? 'Primljeno' : order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <div className="flex items-center justify-center space-x-2">
                            <a
                              href={`/admin/orders/${order.order_id}`}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              Prikaži
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

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