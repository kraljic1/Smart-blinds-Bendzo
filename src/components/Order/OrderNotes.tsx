import React from 'react';
import { FileText } from 'lucide-react';

interface OrderNotesProps {
  notes: string;
}

const OrderNotes: React.FC<OrderNotesProps> = ({ notes }) => {
  return (
    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-3">
        <FileText className="w-5 h-5 mr-2" />
        Napomene
      </h3>
      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{notes}</p>
    </div>
  );
};

export default OrderNotes; 