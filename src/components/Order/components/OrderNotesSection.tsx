import React from 'react';

interface OrderNotesSectionProps {
 notes?: string;
}

const OrderNotesSection: React.FC<OrderNotesSectionProps> = ({ notes }) => {
 if (!notes) {
 return null;
 }

 return (
 <div className="p-6 border-t border-gray-200">
 <h3 className="text-lg font-semibold text-gray-900 mb-3">
 Napomene
 </h3>
 <p className="text-gray-600 whitespace-pre-wrap">
 {notes}
 </p>
 </div>
 );
};

export default OrderNotesSection; 