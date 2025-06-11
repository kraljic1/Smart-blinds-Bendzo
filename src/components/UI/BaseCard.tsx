import React from 'react';
import { BaseCardProps } from '../types/product';

const BaseCard: React.FC<BaseCardProps> = ({ 
 children, 
 className = '',
 onClick 
}) => {
 return (
 <div 
 onClick={onClick}
 className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}
 >
 {children}
 </div>
 );
};

export default BaseCard;