import React from 'react';

interface CardRootProps {
 children: React.ReactNode;
 className?: string;
 onClick?: () => void;
}

interface CardImageProps {
 src: string;
 alt: string;
 className?: string;
}

interface CardContentProps {
 children: React.ReactNode;
 className?: string;
}

interface CardTitleProps {
 children: React.ReactNode;
 className?: string;
}

interface CardPriceProps {
 price: number;
 originalPrice?: number;
 className?: string;
}

interface CardActionsProps {
 children: React.ReactNode;
 className?: string;
}

export const CardRoot: React.FC<CardRootProps> = ({ 
 children, 
 className = '', 
 onClick 
}) => {
 return (
 <div 
 onClick={onClick}
 className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${className}`}
 >
 {children}
 </div>
 );
};

export const CardImage: React.FC<CardImageProps> = ({ 
 src, 
 alt, 
 className = '' 
}) => {
 return (
 <div className={`aspect-[4/3] overflow-hidden ${className}`}>
 <img 
 src={src} 
 alt={alt}
 className="w-full h-full object-cover"
 />
 </div>
 );
};

export const CardContent: React.FC<CardContentProps> = ({ 
 children, 
 className = '' 
}) => {
 return (
 <div className={`p-4 ${className}`}>
 {children}
 </div>
 );
};

export const CardTitle: React.FC<CardTitleProps> = ({ 
 children, 
 className = '' 
}) => {
 return (
 <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
 {children}
 </h3>
 );
};

export const CardPrice: React.FC<CardPriceProps> = ({ 
 price, 
 originalPrice, 
 className = '' 
}) => {
 return (
 <div className={`flex items-end space-x-2 ${className}`}>
 <span className="text-2xl font-bold text-blue-600">
 ${price.toLocaleString()}
 </span>
 {originalPrice && (
 <span className="text-sm text-gray-500 line-through mb-1">
 ${originalPrice.toLocaleString()}
 </span>
 )}
 </div>
 );
};

export const CardActions: React.FC<CardActionsProps> = ({ 
 children, 
 className = '' 
}) => {
 return (
 <div className={`space-y-2 ${className}`}>
 {children}
 </div>
 );
}; 