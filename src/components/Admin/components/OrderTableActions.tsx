import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

interface OrderTableActionsProps {
  orderId: string;
  customerName: string;
  onDeleteClick: (orderId: string, customerName: string) => void;
}

/**
 * Action buttons component for order table rows
 * Handles view details and delete actions
 */
const OrderTableActions: React.FC<OrderTableActionsProps> = ({ 
  orderId, 
  customerName, 
  onDeleteClick 
}) => {
  return (
    <div className="action-buttons flex items-center justify-center space-x-3">
      <Link 
        to={`/admin/orders/${orderId}`}
        className="action-button view text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
      >
        Pregledaj Detalje
      </Link>
      <button
        onClick={() => onDeleteClick(orderId, customerName)}
        className="action-button delete text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium inline-flex items-center"
        title="Obriši narudžbu"
      >
        <Trash2 className="w-4 h-4 mr-1" />
        Obriši
      </button>
    </div>
  );
};

export default OrderTableActions; 