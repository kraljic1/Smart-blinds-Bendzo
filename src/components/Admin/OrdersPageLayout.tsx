import React from 'react';
import SEO from '../SEO/SEO';
import AdminHeader from './AdminHeader';
import OrderSearch from './OrderSearch';
import OrdersMainContent from './OrdersMainContent';
import { SupabaseOrderData } from '../../utils/orderTypes';

interface OrdersPageLayoutProps {
 orders: SupabaseOrderData[];
 isLoading: boolean;
 error: string | null;
 isRefreshing: boolean;
 searchTerm: string;
 filteredOrders: SupabaseOrderData[];
 paginatedOrders: SupabaseOrderData[];
 currentPage: number;
 totalPages: number;
 itemsPerPage: number;
 onRefresh: () => void;
 onSearchTermChange: (term: string) => void;
 onClearFilter: () => void;
 onOrderDeleted: () => void;
 onPageChange: (page: number) => void;
}

/**
 * Layout component for the admin orders page
 * Handles the overall page structure and component composition
 */
const OrdersPageLayout: React.FC<OrdersPageLayoutProps> = ({
 orders,
 isLoading,
 error,
 isRefreshing,
 searchTerm,
 filteredOrders,
 paginatedOrders,
 currentPage,
 totalPages,
 itemsPerPage,
 onRefresh,
 onSearchTermChange,
 onClearFilter,
 onOrderDeleted,
 onPageChange
}) => {
 return (
 <div className="min-h-screen bg-gray-50 ">
 <SEO 
 title="Administracija Narudžbi | Smartblinds Croatia"
 description="Administratorska stranica za upravljanje narudžbama"
 />
 
 <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
 <AdminHeader 
 title="Upravljanje Narudžbama"
 description="Upravljajte i pratite narudžbe kupaca"
 isRefreshing={isRefreshing}
 onRefresh={onRefresh}
 />
 
 <div className="bg-white shadow overflow-hidden sm:rounded-lg">
 <OrderSearch 
 searchTerm={searchTerm}
 setSearchTerm={onSearchTermChange}
 totalOrders={orders.length}
 filteredOrdersCount={filteredOrders.length}
 currentPage={currentPage}
 itemsPerPage={itemsPerPage}
 />
 
 <OrdersMainContent
 isLoading={isLoading}
 error={error}
 paginatedOrders={paginatedOrders}
 filteredOrdersLength={filteredOrders.length}
 searchTerm={searchTerm}
 currentPage={currentPage}
 totalPages={totalPages}
 itemsPerPage={itemsPerPage}
 onOrderDeleted={onOrderDeleted}
 onClearFilter={onClearFilter}
 onPageChange={onPageChange}
 />
 </div>
 </div>
 </div>
 );
};

export default OrdersPageLayout; 