import React from 'react';
import { ExtendedOrderData } from './types';

interface InvoiceHeaderProps {
 orderId: string;
 orderDetails: ExtendedOrderData | null;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ orderId, orderDetails }) => {
 const formatDate = (dateString: string) => {
 try {
 return new Date(dateString).toLocaleDateString('hr-HR');
 } catch {
 return new Date().toLocaleDateString('hr-HR');
 }
 };

 const formatTime = (dateString: string) => {
 try {
 return new Date(dateString).toLocaleTimeString('hr-HR');
 } catch {
 return new Date().toLocaleTimeString('hr-HR');
 }
 };

 return (
 <div className="bg-blue-600 text-white p-6">
 <div className="flex justify-between items-start">
 <div>
 <h2 className="text-2xl font-bold mb-2">Smartblinds Croatia</h2>
 <div className="text-blue-100 space-y-1">
 <p>Code and Sail d.o.o.</p>
 <p>Mihovila Radića 3, 51511 Malinska</p>
 <p>OIB: 12345678901</p>
 <p>Email: info@smartblinds.hr | Tel: +385 98 986 1054</p>
 </div>
 </div>
 <div className="text-right">
 <h3 className="text-xl font-semibold mb-2">RAČUN</h3>
 <div className="text-blue-100 space-y-1">
 <p><strong>Broj:</strong> {orderId}</p>
 {orderDetails && (
 <>
 <p><strong>Datum:</strong> {formatDate(orderDetails.createdAt)}</p>
 <p><strong>Vrijeme:</strong> {formatTime(orderDetails.createdAt)}</p>
 </>
 )}
 </div>
 </div>
 </div>
 </div>
 );
};

export default InvoiceHeader; 