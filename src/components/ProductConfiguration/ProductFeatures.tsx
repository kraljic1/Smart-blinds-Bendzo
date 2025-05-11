import { Product } from '../../types/product';

interface ProductFeaturesProps {
  product?: Product;
  isVisible?: boolean;
  animationFinished?: boolean;
}

const ProductFeatures = ({
  isVisible = true,
  animationFinished = true
}: ProductFeaturesProps) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden modern-card ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '500ms' }}>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Product Features</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '550ms' }}>Smart home integration</li>
            <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '575ms' }}>Remote control operation</li>
            <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '600ms' }}>Silent motor technology</li>
            <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '625ms' }}>Energy efficient design</li>
            <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '650ms' }}>UV protection fabric</li>
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
            
            <div className="text-gray-500 dark:text-gray-400">Warranty</div>
            <div className={`text-gray-900 dark:text-white ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '750ms' }}>5 Years</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures; 