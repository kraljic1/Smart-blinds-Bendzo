import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO/SEO';
import { supabase, OrderData as SupabaseOrderData } from '../utils/supabaseClient';
import AdminHeader from '../components/Admin/AdminHeader';
import OrderSearch from '../components/Admin/OrderSearch';
import OrderTable from '../components/Admin/OrderTable';
import OrderEmptyState from '../components/Admin/OrderEmptyState';
import OrderLoadingState from '../components/Admin/OrderLoadingState';
import OrderErrorState from '../components/Admin/OrderErrorState';

// Interface for API response order format
interface ApiOrderResponse {
  id: number;
  order_id?: string;
  orderId?: string;
  customer_name?: string;
  customerName?: string;
  customer_email?: string;
  email?: string;
  customer_phone?: string;
  phone?: string;
  billing_address?: string;
  billingAddress?: string;
  shipping_address?: string;
  shippingAddress?: string;
  notes?: string;
  total_amount?: number;
  totalAmount?: number;
  tax_amount?: number;
  taxAmount?: number;
  shipping_cost?: number;
  shippingCost?: number;
  discount_amount?: number;
  discountAmount?: number;
  discount_code?: string;
  discountCode?: string;
  payment_method?: string;
  paymentMethod?: string;
  payment_status?: string;
  paymentStatus?: string;
  shipping_method?: string;
  shippingMethod?: string;
  tracking_number?: string;
  trackingNumber?: string;
  status: string;
  needs_r1_invoice?: boolean;
  needsR1Invoice?: boolean;
  company_name?: string;
  companyName?: string;
  company_oib?: string;
  companyOib?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

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
      
      // Try to use the Netlify function first
      try {
        const response = await fetch('/.netlify/functions/get-orders');
        
        if (response.ok) {
          const result = await response.json();
          
          if (result.success) {
            // Transform the API response to match the expected format
            const transformedOrders = result.orders.map((order: ApiOrderResponse) => ({
              id: order.id,
              order_id: order.order_id || order.orderId,
              customer_name: order.customer_name || order.customerName,
              customer_email: order.customer_email || order.email,
              customer_phone: order.customer_phone || order.phone,
              billing_address: order.billing_address || order.billingAddress,
              shipping_address: order.shipping_address || order.shippingAddress,
              notes: order.notes,
              total_amount: order.total_amount || order.totalAmount,
              tax_amount: order.tax_amount || order.taxAmount,
              shipping_cost: order.shipping_cost || order.shippingCost,
              discount_amount: order.discount_amount || order.discountAmount,
              discount_code: order.discount_code || order.discountCode,
              payment_method: order.payment_method || order.paymentMethod,
              payment_status: order.payment_status || order.paymentStatus,
              shipping_method: order.shipping_method || order.shippingMethod,
              tracking_number: order.tracking_number || order.trackingNumber,
              status: order.status,
              needs_r1_invoice: order.needs_r1_invoice || order.needsR1Invoice,
              company_name: order.company_name || order.companyName,
              company_oib: order.company_oib || order.companyOib,
              created_at: order.created_at || order.createdAt,
              updated_at: order.updated_at || order.updatedAt
            }));
            
            setOrders(transformedOrders);
            return; // Success, exit early
          }
        }
      } catch (netlifyError) {
        console.warn('Netlify function not available, falling back to direct Supabase:', netlifyError);
      }
      
      // Fallback to direct Supabase client if Netlify function fails
      console.log('Using direct Supabase client as fallback');
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
    
    return <OrderTable orders={filteredOrders} onOrderDeleted={fetchOrders} />;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO 
        title="Administracija Narudžbi | Smartblinds Croatia"
        description="Administratorska stranica za upravljanje narudžbama"
      />
      
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
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