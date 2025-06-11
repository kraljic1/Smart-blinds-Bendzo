import React from 'react';
import { PaymentSuccessProps } from './PaymentSuccessTypes';
import InvoiceHeader from './InvoiceHeader';
import CustomerSection from './CustomerSection';
import ItemsTable from './ItemsTable';
import TotalsSection from './TotalsSection';
import PaymentSuccessMessage from './PaymentSuccessMessage';

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ 
 orderDetails, 
 onContinueShopping 
}) => {
 return (
 <div className="payment-success-overlay">
 <div className="payment-success-container">
 <div className="payment-success-content">
 <InvoiceHeader
 orderNumber={orderDetails.orderNumber}
 date={orderDetails.date}
 time={orderDetails.time}
 paymentIntentId={orderDetails.paymentIntentId}
 />

 <CustomerSection
 customer={orderDetails.customer}
 company={orderDetails.company}
 shipping={orderDetails.shipping}
 />

 <ItemsTable
 items={orderDetails.items}
 currency={orderDetails.currency}
 />

 <TotalsSection
 subtotal={orderDetails.subtotal}
 shippingCost={orderDetails.shippingCost}
 tax={orderDetails.tax}
 total={orderDetails.total}
 currency={orderDetails.currency}
 />

 {/* Notes */}
 {orderDetails.notes && (
 <div className="notes-section">
 <h3>Napomene:</h3>
 <p>{orderDetails.notes}</p>
 </div>
 )}

 <PaymentSuccessMessage onContinueShopping={onContinueShopping} />
 </div>
 </div>
 </div>
 );
}; 