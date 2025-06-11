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
 <p className="text-sm text-gray-500 mt-2">
 Napomena: U postavkama ispisa isključite"Zaglavlja i podnožja"za čišći račun
 </p>
 </div>
 );
};

export default PrintButton; 