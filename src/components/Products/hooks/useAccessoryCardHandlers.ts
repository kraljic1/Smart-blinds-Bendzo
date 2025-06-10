import { useNavigate } from 'react-router-dom';
import { AccessoryProduct } from '../../../data/accessories';
import { useLikedContext } from '../../../hooks/useLikedContext';

interface UseAccessoryCardHandlersProps {
  product: AccessoryProduct;
}

export const useAccessoryCardHandlers = ({ product }: UseAccessoryCardHandlersProps) => {
  const navigate = useNavigate();
  const { isLiked, addLikedItem, removeLikedItem } = useLikedContext();
  const productIsLiked = isLiked(product.id);

  const handleConfigure = () => {
    navigate(`/products/configure/${product.id}`);
  };

  // Handle card click - same as configure action
  const handleCardClick = () => {
    handleConfigure();
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productIsLiked) {
      removeLikedItem(product.id);
    } else {
      addLikedItem(product);
    }
  };

  return {
    productIsLiked,
    handleConfigure,
    handleCardClick,
    handleToggleLike
  };
}; 