import React from 'react';
import OptionHeader from './OptionHeader';
import InfoMessage from './InfoMessage';
import OptionItem from './OptionItem';
import { CustomizationOption } from '../types';

interface OptionGroupProps {
 option: CustomizationOption;
 selectedValue: string | undefined;
 activeInfoId: string | null;
 onOptionChange: (optionId: string, valueId: string) => void;
 onToggleInfo: (optionId: string) => void;
 colorSwatchRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
}

const OptionGroup: React.FC<OptionGroupProps> = ({
 option,
 selectedValue,
 activeInfoId,
 onOptionChange,
 onToggleInfo,
 colorSwatchRefs
}) => {
 const getSelectionClasses = (): string => {
 const classes = ['option-selections'];
 
 if (option.id === 'color') classes.push('color-grid');
 if (option.textOnly) classes.push('text-only-grid');
 
 return classes.join(' ');
 };

 const getColorSwatchRef = (valueId: string) => (el: HTMLDivElement | null) => {
 if (el) {
 colorSwatchRefs.current.set(`${option.id}-${valueId}`, el);
 }
 };

 return (
 <div className="option-group">
 <OptionHeader
 optionId={option.id}
 optionName={option.name}
 hasInfo={!!option.info}
 onToggleInfo={onToggleInfo}
 />
 
 <InfoMessage
 isVisible={activeInfoId === option.id}
 message={option.info || ''}
 />
 
 <div className={getSelectionClasses()}>
 {option.options.map((value) => (
 <OptionItem
 key={value.id}
 optionId={option.id}
 value={value}
 isSelected={selectedValue === value.id}
 isTextOnly={!!option.textOnly}
 onSelect={() => onOptionChange(option.id, value.id)}
 colorSwatchRef={value.color && !value.image ? getColorSwatchRef(value.id) : undefined}
 />
 ))}
 </div>
 </div>
 );
};

export default OptionGroup; 