import React from 'react';
import { X } from 'lucide-react';

interface InfoPanelHeaderProps {
  onClose: () => void;
}

const InfoPanelHeader: React.FC<InfoPanelHeaderProps> = ({ onClose }) => {
  return (
    <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">OUR MOTORS</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};