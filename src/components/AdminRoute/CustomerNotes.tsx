import React from 'react';
import { FileEdit, Settings } from 'lucide-react';

interface CustomerNotesProps {
  notes: string;
}

interface SystemNotesProps {
  notes: string;
}

const CustomerNotes: React.FC<CustomerNotesProps> = ({ notes }) => {
  if (!notes) return null;
  
  // Filter out system messages and keep only customer notes
  const customerNotes = notes
    .split('\n')
    .filter(line => !line.trim().startsWith('[System]'))
    .join('\n')
    .trim();
  
  // If no customer notes remain after filtering, don't render the component
  if (!customerNotes) return null;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center">
          <FileEdit className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Customer Notes</h2>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{customerNotes}</p>
      </div>
    </div>
  );
};

const SystemNotes: React.FC<SystemNotesProps> = ({ notes }) => {
  if (!notes) return null;
  
  // Extract only system messages
  const systemNotes = notes
    .split('\n')
    .filter(line => line.trim().startsWith('[System]'))
    .map(line => line.replace(/^\[System\]\s*/, '')) // Remove [System] prefix
    .join('\n')
    .trim();
  
  // If no system notes, don't render
  if (!systemNotes) return null;
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg overflow-hidden border border-blue-200 dark:border-blue-700">
      <div className="px-4 py-5 sm:px-6 border-b border-blue-200 dark:border-blue-700 bg-blue-100 dark:bg-blue-800/30">
        <div className="flex items-center">
          <Settings className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
          <h2 className="text-lg font-medium text-blue-900 dark:text-blue-100">System Information</h2>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p className="text-blue-700 dark:text-blue-300 whitespace-pre-line text-sm font-mono">{systemNotes}</p>
      </div>
    </div>
  );
};

export default CustomerNotes;
export { SystemNotes }; 