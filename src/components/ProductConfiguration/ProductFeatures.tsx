import React from 'react';
import { Product } from '../../types/product';
import { FeaturesList, SpecificationsSection } from './components';
import { useProductFeatures } from './hooks';
import { getContainerAnimationClasses, getContainerAnimationStyle } from './utils/animationUtils';

interface ProductFeaturesProps {
 product?: Product;
 isVisible?: boolean;
 animationFinished?: boolean;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({
 product,
 isVisible = true,
 animationFinished = true
}) => {
 const { features, collection } = useProductFeatures({ product });
 
 const containerClasses = getContainerAnimationClasses({ isVisible, animationFinished });
 const containerStyle = getContainerAnimationStyle();

 return (
 <div className={containerClasses} style={containerStyle}>
 <div className="divide-y divide-gray-200 dark:divide-gray-700">
 <FeaturesList
 features={features}
 isVisible={isVisible}
 animationFinished={animationFinished}
 />
 
 <SpecificationsSection
 collection={collection}
 isVisible={isVisible}
 animationFinished={animationFinished}
 />
 </div>
 </div>
 );
};

export default ProductFeatures; 