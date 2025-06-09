import React from 'react';
import SpecificationItem from './SpecificationItem';

interface SpecificationsSectionProps {
  collection?: string;
  isVisible: boolean;
  animationFinished: boolean;
}

const SpecificationsSection: React.FC<SpecificationsSectionProps> = ({
  collection,
  isVisible,
  animationFinished
}) => {
  const specifications = [
    { label: 'Material', value: 'Premium Polyester', delay: '675ms' },
    { label: 'Control', value: 'App / Remote / Voice', delay: '700ms' },
    { label: 'Power Source', value: 'Electric (AC)', delay: '725ms' },
    { label: 'Collection', value: collection || 'Standard', delay: '750ms' }
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Specifications
      </h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {specifications.map((spec, index) => (
          <SpecificationItem
            key={`spec-${index}`}
            label={spec.label}
            value={spec.value}
            isVisible={isVisible}
            animationFinished={animationFinished}
            animationDelay={spec.delay}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecificationsSection; 