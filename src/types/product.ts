export interface Product {
 id: string;
 name: string;
 price: number;
 originalPrice: number;
 image: string;
 images?: string[];
 features: string[];
 colors: number;
 fabricColor: string;
 description?: string;
 collection?: string;
 discount?: number;
}

export interface BaseCardProps {
 className?: string;
 children: React.ReactNode;
 onClick?: () => void;
}