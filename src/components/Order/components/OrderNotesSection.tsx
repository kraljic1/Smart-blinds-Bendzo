import React from 'react';

interface OrderNotesSectionProps {
  notes?: string;
}

const OrderNotesSection: React.FC<OrderNotesSectionProps> = ({ notes }) => {
  if (!notes) {
    return null;
  }

  return (
    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Napomene
      </h3>
      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
        {notes}
      </p>
    </div>
  );
};

export default OrderNotesSection; 