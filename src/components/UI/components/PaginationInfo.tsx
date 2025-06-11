import React from 'react';

interface PaginationInfoProps {
 startItem: number;
 endItem: number;
 totalItems: number;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
 startItem,
 endItem,
 totalItems
}) => {
 return (
 <div>
 <p className="text-sm text-gray-700">
 Prikazano <span className="font-medium">{startItem}</span> do{' '}
 <span className="font-medium">{endItem}</span> od{' '}
 <span className="font-medium">{totalItems}</span> rezultata
 </p>
 </div>
 );
};

export default PaginationInfo; 