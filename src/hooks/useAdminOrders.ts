import { useState, useEffect } from 'react';
import { 
  getOrdersOptimized, 
  getOrderCountOptimized, 
  searchOrdersOptimized,
  refreshOrderSummary,
  checkQueryPerformance,
  OptimizedOrderSummary 
} from '../utils/optimizedOrderService';

const ITEMS_PER_PAGE = 10;

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<OptimizedOrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [performanceStats, setPerformanceStats] = useState<{ avg_time_ms: number }[]>([]);
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

  return {
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
  };
}; 