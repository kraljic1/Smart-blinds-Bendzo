import React from 'react';
import { OptionGroup } from './ProductCustomization/components';
import { useColorSwatches, useInfoToggle } from './ProductCustomization/hooks';
import { CustomizationOption } from './ProductCustomization/types';
import '../../styles/ProductOptions.css';

interface ProductCustomizationProps {
 options: CustomizationOption[];
 selectedOptions: Record<string, string>;
 onOptionChange: (optionId: string, valueId: string) => void;
 width?: number;
 height?: number;
}

const ProductCustomization: React.FC<ProductCustomizationProps> = ({
 options,
 selectedOptions,
 onOptionChange,
}) => {
 const colorSwatchRefs = useColorSwatches(options);
 const { activeInfoId, toggleInfo } = useInfoToggle();

 return (
 <div className="product-customization">
 <h2 className="customization-title">Advanced Customization</h2>
 <p className="customization-description">
 Customize your product with these additional options
 </p>
 
 {options.map((option) => (
 <OptionGroup
 key={option.id}
 option={option}
 selectedValue={selectedOptions[option.id]}
 activeInfoId={activeInfoId}
 onOptionChange={onOptionChange}
 onToggleInfo={toggleInfo}
 colorSwatchRefs={colorSwatchRefs}
 />
 ))}
 </div>
 );
};

export default ProductCustomization;
export type { CustomizationOption }; 