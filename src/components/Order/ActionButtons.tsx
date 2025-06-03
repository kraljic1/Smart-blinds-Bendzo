import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface ActionButtonsProps {
  onPrint: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onPrint }) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 print-hide">
      <button 
        onClick={onPrint}
        className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
      >
        <FileText className="w-5 h-5 mr-2" />
        Ispiši račun
      </button>
      
      <Link 
        to="/"
        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        Povratak na početnu
      </Link>
      
      <Link 
        to="/products"
        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
      >
        Nastavi kupovinu
      </Link>
    </div>
  );
};

export default ActionButtons; 