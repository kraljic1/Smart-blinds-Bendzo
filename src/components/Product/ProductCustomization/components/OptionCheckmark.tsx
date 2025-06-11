import React from 'react';
import { Check } from 'lucide-react';

interface OptionCheckmarkProps {
 isSelected: boolean;
}

const OptionCheckmark: React.FC<OptionCheckmarkProps> = ({ isSelected }) => {
 if (!isSelected) return null;

 return (
 <div className="option-checkmark">
 <Check size={12} color="white"/>
 </div>
 );
};

export default OptionCheckmark; 