import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { useLikedContext } from './useLikedContext';

interface UseProductCardProps {
  product: Product;
  onConfigure?: (product: Product) => void;
  onRequestSample?: (product: Product) => void;
  delay?: number;
}

export const useProductCard = ({
  product,
  onConfigure,
  onRequestSample,
  delay = 0
}: UseProductCardProps) => {
  const navigate = useNavigate();
  const { isLiked, addLikedItem, removeLikedItem } = useLikedContext();
  const productIsLiked = isLiked(product.id);
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const handleConfigure = () => {
    if (onConfigure) {
      onConfigure(product);
    } else {
      navigate(`/products/configure/${product.id}`);
    }
  };

  const handleRequestSample = () => {
    if (onRequestSample) {
      onRequestSample(product);
    }
  };

  const handleCardClick = () => {
    handleConfigure();
  };

  const handleConfigureClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleConfigure();
  };

  const handleRequestSampleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleRequestSample();
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productIsLiked) {
      removeLikedItem(product.id);
    } else {
      addLikedItem(product);
    }
  };

  // Check if product has a fabric detail image
  const hasFabricImage = useMemo((): boolean => {
    return !!(product.images && product.images.length > 0);
  }, [product.images]);

  // Get the fabric image
  const getFabricImage = (): string | null => {
    if (!product.images || product.images.length === 0) return null;
    
    // Special case for glider-track: use the third image (index 2) which shows colors
    if (product.id === 'glider-track' && product.images.length > 2) {
      return product.images[2];
    }
    
    // For all other products: return the last image (typically the fabric detail image)
    return product.images[product.images.length - 1];
  };

  // Set background color for products without fabric image
  const colorSwatchStyle = !hasFabricImage && product.fabricColor ? {
    backgroundColor: product.fabricColor
  } : {};

  // Get delay class based on delay prop
  const getDelayClass = () => {
    if (delay <= 100) return 'delayShort';
    if (delay <= 200) return 'delayMedium';
    return 'delayLong';
  };

  return {
    isVisible,
    productIsLiked,
    hasFabricImage,
    getFabricImage,
    colorSwatchStyle,
    getDelayClass,
    handleCardClick,
    handleConfigureClick,
    handleRequestSampleClick,
    handleToggleLike
  };
}; 