import { Product } from '../../types/product';

interface ProductFeaturesProps {
  product?: Product;
  isVisible?: boolean;
  animationFinished?: boolean;
}

const ProductFeatures = ({
  product,
  isVisible = true,
  animationFinished = true
}: ProductFeaturesProps) => {
  // Default features if no product is provided
  const defaultFeatures = [
    'Smart home integration',
    'Remote control operation',
    'Silent motor technology',
    'Energy efficient design',
    'UV protection fabric'
  ];

  // Use product features if available, otherwise use defaults
  const featuresToDisplay = product?.features && product.features.length > 0 
    ? product.features 
    : defaultFeatures;

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden modern-card ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '500ms' }}>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Product Features</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {featuresToDisplay.map((feature, index) => (
              <li 
                key={`feature-${index}`}
                className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} 
                style={{ animationDelay: `${550 + (index * 25)}ms` }}
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Specifications</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500 dark:text-gray-400">Material</div>
            <div className={`text-gray-900 dark:text-white ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '675ms' }}>Premium Polyester</div>
            
            <div className="text-gray-500 dark:text-gray-400">Control</div>
            <div className={`text-gray-900 dark:text-white ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '700ms' }}>App / Remote / Voice</div>
            
            <div className="text-gray-500 dark:text-gray-400">Power Source</div>
            <div className={`text-gray-900 dark:text-white ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '725ms' }}>Electric (AC)</div>
            
            <div className="text-gray-500 dark:text-gray-400">Collection</div>
            <div className={`text-gray-900 dark:text-white ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '750ms' }}>{product?.collection || 'Standard'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures; 