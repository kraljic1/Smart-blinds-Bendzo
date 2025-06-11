import { Info } from 'lucide-react';
import { Product } from '../../types/product';
import styles from './ProductConfiguration.module.css';

interface ProductInfoProps {
 product: Product;
 onInfoClick: (e: React.MouseEvent) => void;
 isVisible?: boolean;
 animationFinished?: boolean;
}

const ProductInfo = ({
 product,
 onInfoClick,
 isVisible = true,
 animationFinished = true
}: ProductInfoProps) => {
 return (
 <div className={`space-y-4 sm:space-y-6 ${isVisible ? 'slide-in-up' : 'opacity-0'} ${styles.animDelay125}`}>
 <div>
 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase">{product.name}</h1>
 <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2">
 <span className="text-gray-600">{product.features && product.features.length > 0 ? product.features[0] : ''}</span>
 <span className="text-gray-600 hidden sm:inline">-</span>
 <span className="text-gray-600">With smart engine</span>
 <button 
 className="text-gray-400 hover:text-gray-600"
 onClick={onInfoClick}
 >
 <Info size={16} />
 </button>
 </div>
 </div>

 <p className={`text-gray-600 text-sm sm:text-base ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''} ${styles.animDelay250}`}>
 {product.description || 
 `Create a pleasant atmosphere in your home with our electric Essential roller blinds! Both the
 light filtering and blackout Essential collection consist of sturdy roller blind fabrics with a
 textile look and feel and are available in 9 different colours, making the Essential collection
 suitable for any interior.`}
 </p>
 </div>
 );
};

export default ProductInfo; 