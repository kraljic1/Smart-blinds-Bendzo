import { Info } from 'lucide-react';
import { OptionGroupProps } from '../types/customizationTypes';
import { OptionItem } from './OptionItem';

export function OptionGroup({ 
  option, 
  selectedOptions, 
  onOptionChange, 
  activeInfoId, 
  onToggleInfo 
}: OptionGroupProps) {
  const getSelectionClasses = () => {
    const baseClasses = ['option-selections'];
    
    if (option.id === 'color') baseClasses.push('color-grid');
    if (option.textOnly) baseClasses.push('text-only-grid');
    
    return baseClasses.join(' ');
  };

  return (
    <div className="option-group">
      <div className="option-header">
        <h3 className="option-title">{option.name}</h3>
        {option.info && (
          <button className="info-button" onClick={() => onToggleInfo(option.id)}>
            <Info size={16} />
          </button>
        )}
      </div>
      
      {activeInfoId === option.id && option.info && (
        <div className="info-message">
          {option.info}
        </div>
      )}
      
      <div className={getSelectionClasses()}>
        {option.options.map((value) => (
          <OptionItem
            key={value.id}
            option={option}
            value={value}
            isSelected={selectedOptions[option.id] === value.id}
            onSelect={() => onOptionChange(option.id, value.id)}
          />
        ))}
      </div>
    </div>
  );
} 