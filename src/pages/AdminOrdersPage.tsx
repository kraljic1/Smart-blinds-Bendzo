import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { OrderData as SupabaseOrderData } from '../utils/supabaseClient';
import AdminHeader from '../components/Admin/AdminHeader';
import OrderSearch from '../components/Admin/OrderSearch';
import OrderTable from '../components/Admin/OrderTable';
import OrderEmptyState from '../components/Admin/OrderEmptyState';
import OrderLoadingState from '../components/Admin/OrderLoadingState';
import OrderErrorState from '../components/Admin/OrderErrorState';

// Administratorska stranica za pregled svih narudžbi
const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<SupabaseOrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setOrders(data || []);
    } catch (err) {
      console.error('Greška pri dohvaćanju narudžbi:', err);
      setError('Greška pri učitavanju narudžbi. Molimo pokušajte ponovno kasnije.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
    
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchOrders();
  };

  const handleClearFilter = () => {
    setSearchTerm('');
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  // Filtriranje narudžbi na temelju pojma za pretraživanje
  const filteredOrders = orders.filter(order => 
    order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Renderiranje sadržaja tablice ovisno o stanju učitavanja
  const renderTableContent = () => {
    if (isLoading) {
      return <OrderLoadingState />;
    }
    
    if (error) {
      return <OrderErrorState errorMessage={error} />;
    }
    
    if (filteredOrders.length === 0) {
      return <OrderEmptyState searchTerm={searchTerm} onClearFilter={handleClearFilter} />;
    }
    
    return <OrderTable orders={filteredOrders} />;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO 
        title="Administracija Narudžbi | Smartblinds Croatia"
        description="Administratorska stranica za upravljanje narudžbama"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <AdminHeader 
          title="Upravljanje Narudžbama"
          description="Upravljajte i pratite narudžbe kupaca"
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
        
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <OrderSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            totalOrders={orders.length}
            filteredOrdersCount={filteredOrders.length}
          />
          
          {renderTableContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage; 