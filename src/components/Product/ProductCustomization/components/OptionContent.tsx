import React from 'react';
import { formatOptionValue } from '../../../../utils/formattingUtils';

interface OptionContentProps {
 optionId: string;
 value: {
 id: string;
 name: string;
 price?: number;
 };
 isTextOnly: boolean;
}

const OptionContent: React.FC<OptionContentProps> = ({
 optionId,
 value,
 isTextOnly
}) => {
 // For color options, don't show any text content
 if (optionId === 'color') {
 return null;
 }

 return (
 <div className={`option-content ${isTextOnly ? 'text-only-content' : ''}`}>
 <span className="option-name">{formatOptionValue(value.name)}</span>
 {value.price !== undefined && value.price > 0 && (
 <span className="option-price">+€{value.price.toFixed(2)}</span>
 )}
 {value.price !== undefined && value.price === 0 && (
 <span className="option-price">€{value.price.toFixed(2)}</span>
 )}
 </div>
 );
};

export default OptionContent; 