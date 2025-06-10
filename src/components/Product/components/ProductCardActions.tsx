import React from 'react';
import { Product } from '../../../types/product';
import { CardActions } from '../../Card';

interface ProductCardActionsProps {
  product: Product;
  onConfigure: () => void;
  onRequestSample?: () => void;
  configureButtonText: string;
}

const ProductCardActions: React.FC<ProductCardActionsProps> = ({
  onConfigure,
  onRequestSample,
  configureButtonText
}) => {
  // Handle button clicks with event propagation prevention
  const handleConfigureClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConfigure();
  };

  const handleRequestSampleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRequestSample) {
      onRequestSample();
    }
  };

  return (
    <CardActions>
      <button
        onClick={handleConfigureClick}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition uppercase dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {configureButtonText}
      </button>
      
      {onRequestSample && (
        <button
          onClick={handleRequestSampleClick}
          className="w-full mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition uppercase dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Request Sample
        </button>
      )}
    </CardActions>
  );
};

export default ProductCardActions; 