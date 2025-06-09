import React from 'react';

interface SpecificationItemProps {
  label: string;
  value: string;
  isVisible: boolean;
  animationFinished: boolean;
  animationDelay: string;
}

const SpecificationItem: React.FC<SpecificationItemProps> = ({
  label,
  value,
  isVisible,
  animationFinished,
  animationDelay
}) => {
  const getAnimationClasses = () => {
    const baseClasses = isVisible ? 'reveal-staggered' : 'opacity-0';
    const visibilityClass = animationFinished ? 'visible' : '';
    return `text-gray-900 dark:text-white ${baseClasses} ${visibilityClass}`;
  };

  return (
    <>
      <div className="text-gray-500 dark:text-gray-400">{label}</div>
      <div 
        className={getAnimationClasses()}
        style={{ animationDelay }}
      >
        {value}
      </div>
    </>
  );
};

export default SpecificationItem; 