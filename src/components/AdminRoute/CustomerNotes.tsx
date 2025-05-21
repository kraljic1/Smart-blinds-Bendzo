import React from 'react';
import { FileEdit } from 'lucide-react';

interface CustomerNotesProps {
  notes: string;
}

const CustomerNotes: React.FC<CustomerNotesProps> = ({ notes }) => {
  if (!notes) return null;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center">
          <FileEdit className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Customer Notes</h2>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{notes}</p>
      </div>
    </div>
  );
};

export default CustomerNotes; 