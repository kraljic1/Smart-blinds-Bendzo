import React from 'react';

interface OrderErrorStateProps {
 orderId: string;
 fetchError: string | null;
 onRetry: () => void;
}

const OrderErrorState: React.FC<OrderErrorStateProps> = ({
 orderId,
 fetchError,
 onRetry
}) => {
 return (
 <div className="p-6 text-center">
 <div className="mb-4">
 <p className="text-gray-500 mb-2">
 {fetchError || 'Nema dostupnih detalja narudžbe'}
 </p>
 <p className="text-sm text-gray-400">
 ID narudžbe: {orderId}
 </p>
 </div>
 
 {fetchError && (
 <div className="space-y-4">
 <button
 onClick={onRetry}
 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
 >
 Pokušaj ponovno
 </button>
 
 <div className="text-sm text-gray-500">
 <p>Ako se problem nastavi, molimo kontaktirajte nas:</p>
 <p className="mt-1">
 <a href="mailto:info@smartblinds.hr"className="text-blue-600 hover:underline">
 info@smartblinds.hr
 </a>
 {' '}ili{' '}
 <a href="tel:+385989861054"className="text-blue-600 hover:underline">
 +385 98 986 1054
 </a>
 </p>
 </div>
 </div>
 )}
 </div>
 );
};

export default OrderErrorState; 