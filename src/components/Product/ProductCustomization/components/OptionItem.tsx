import React from 'react';
import OptionImage from './OptionImage';
import OptionContent from './OptionContent';
import OptionCheckmark from './OptionCheckmark';

interface OptionValue {
  id: string;
  name: string;
  image?: string;
  color?: string;
  price?: number;
}

interface OptionItemProps {
  optionId: string;
  value: OptionValue;
  isSelected: boolean;
  isTextOnly: boolean;
  onSelect: () => void;
  colorSwatchRef?: (el: HTMLDivElement | null) => void;
}

const OptionItem: React.FC<OptionItemProps> = ({
  optionId,
  value,
  isSelected,
  isTextOnly,
  onSelect,
  colorSwatchRef
}) => {
  const getItemClasses = (): string => {
    const classes = ['option-item'];
    
    if (isSelected) classes.push('selected');
    if (value.color) classes.push('color-option');
    if (isTextOnly) classes.push('text-only-option');
    if (optionId === 'color' && value.image) classes.push('fabric-option');
    
    return classes.join(' ');
  };

  return (
    <div
      className={getItemClasses()}
      onClick={onSelect}
    >
      <OptionImage
        optionId={optionId}
        value={value}
        isTextOnly={isTextOnly}
        colorSwatchRef={colorSwatchRef}
      />
      
      <OptionContent
        optionId={optionId}
        value={value}
        isTextOnly={isTextOnly}
      />
      
      <OptionCheckmark isSelected={isSelected} />
    </div>
  );
};

export default OptionItem; 