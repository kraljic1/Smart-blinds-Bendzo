import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CroatianSEO from '../components/SEO/CroatianSEO';
import { useBasketContext } from '../hooks/useBasketContext';
import { useOrderContext } from '../context/useOrderContext';
import {
 OrderSuccessHeader,
 PrintButton,
 InvoiceHeader,
 OrderDetailsSection,
 StoredOrderDetailsSection,
 NextSteps,
 ActionButtons,
 ContactInfo
} from '../components/Order';
import '../styles/print.css';

const ThankYouPage: React.FC = () => {
 const { clearBasket } = useBasketContext();
 const { lastOrder, lastOrderDetails } = useOrderContext();
 const navigate = useNavigate();
 
 useEffect(() => {
 // Clear the basket when this page is reached
 clearBasket();
 
 // Scroll to top
 window.scrollTo(0, 0);
 }, [clearBasket]);

 useEffect(() => {
 // If there's no order info, redirect to home
 if (!lastOrder) {
 const timer = setTimeout(() => {
 navigate('/');
 }, 100);
 
 return () => clearTimeout(timer);
 }
 }, [lastOrder, navigate]);

 // If no order is found, show simple message (should redirect)
 if (!lastOrder) {
 return null;
 }

 const handlePrint = () => {
 window.print();
 };

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
 <CroatianSEO
 title="Hvala vam na narudžbi | Smartblinds Croatia"
 description="Vaša narudžba je uspješno poslana."
 keywords="hvala, narudžba, smartblinds"
 pageType="info"
 noindex={true}
 />
 
 <div className="max-w-4xl mx-auto">
 <OrderSuccessHeader />
 
 <PrintButton onClick={handlePrint} />

 {/* Order Receipt */}
 <div className="print-invoice bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
 <InvoiceHeader 
 orderId={lastOrder.orderId || ''} 
 orderDetails={null} 
 />

 {/* Use stored order details if available, otherwise fetch from database */}
 {lastOrderDetails ? (
 <StoredOrderDetailsSection orderDetails={lastOrderDetails} />
 ) : (
 <OrderDetailsSection orderId={lastOrder.orderId || ''} />
 )}
 </div>

 <NextSteps />
 
 <ActionButtons onPrint={handlePrint} />

 <ContactInfo />
 </div>
 </div>
 );
};

export default ThankYouPage; 