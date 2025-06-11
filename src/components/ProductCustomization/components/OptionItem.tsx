import { Check } from 'lucide-react';
import { OptionItemProps } from '../types/customizationTypes';
import { useColorSwatches } from '../hooks/useColorSwatches';

export function OptionItem({ option, value, isSelected, onSelect }: OptionItemProps) {
 const { setSwatchRef } = useColorSwatches([option]);

 const getItemClasses = () => {
 const baseClasses = ['option-item'];
 
 if (isSelected) baseClasses.push('selected');
 if (value.color) baseClasses.push('color-option');
 if (option.textOnly) baseClasses.push('text-only-option');
 if (option.id === 'color' && value.image) baseClasses.push('fabric-option');
 
 return baseClasses.join(' ');
 };

 const renderOptionImage = () => {
 // Only show this for non-color options with images
 if (value.image && !value.color && !option.textOnly && option.id !== 'color') {
 return (
 <div className="option-image-container">
 <img src={value.image} alt={value.name} className="option-image"/>
 </div>
 );
 }
 return null;
 };

 const renderFabricSwatch = () => {
 // For color options with images (fabric swatches)
 if (option.id === 'color' && value.image) {
 return (
 <div className="fabric-swatch-container">
 <img src={value.image} alt={value.name} className="fabric-swatch"/>
 </div>
 );
 }
 return null;
 };

 const renderColorSwatch = () => {
 // For color swatches
 if (value.color && !value.image) {
 return (
 <div 
 ref={setSwatchRef(option.id, value.id)}
 className="color-swatch"
 data-color={value.color}
 aria-label={value.name}
 />
 );
 }
 return null;
 };

 const renderOptionContent = () => {
 // For color options, don't show any text content
 if (option.id === 'color') {
 return null;
 }

 return (
 <>
 <span className="option-name">{value.name}</span>
 {value.price !== undefined && value.price > 0 && (
 <span className="option-price">+€{value.price.toFixed(2)}</span>
 )}
 {value.price !== undefined && value.price === 0 && (
 <span className="option-price">€{value.price.toFixed(2)}</span>
 )}
 </>
 );
 };

 return (
 <div className={getItemClasses()} onClick={onSelect}>
 {renderOptionImage()}
 {renderFabricSwatch()}
 {renderColorSwatch()}
 
 <div className={`option-content ${option.textOnly ? 'text-only-content' : ''}`}>
 {renderOptionContent()}
 </div>
 
 {isSelected && (
 <div className="option-checkmark">
 <Check size={12} color="white"/>
 </div>
 )}
 </div>
 );
} 