import React from 'react';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  onClick: () => void;
}

const PrintButton: React.FC<PrintButtonProps> = ({ onClick }) => {
  return (
    <div className="text-center mb-6 print-hide">
      <button 
        onClick={onClick}
        className="print-button"
      >
        <Printer />
        Ispiši račun
      </button>
    </div>
  );
};

export default PrintButton; 