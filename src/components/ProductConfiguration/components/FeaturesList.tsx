import React from 'react';

interface FeaturesListProps {
  features: string[];
  isVisible: boolean;
  animationFinished: boolean;
}

const FeaturesList: React.FC<FeaturesListProps> = ({
  features,
  isVisible,
  animationFinished
}) => {
  const getAnimationClasses = () => {
    const baseClasses = isVisible ? 'reveal-staggered' : 'opacity-0';
    const visibilityClass = animationFinished ? 'visible' : '';
    return `${baseClasses} ${visibilityClass}`;
  };

  const getAnimationDelay = (index: number) => {
    return `${550 + (index * 25)}ms`;
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Product Features
      </h3>
      <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
        {features.map((feature, index) => (
                     <li 
             key={`feature-${index}`}
             className={getAnimationClasses()}
             style={{ animationDelay: getAnimationDelay(index) }}
           >
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesList; 