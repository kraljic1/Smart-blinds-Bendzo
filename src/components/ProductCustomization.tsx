import '../styles/ProductCustomization.css';
import { useInfoToggle } from './ProductCustomization/hooks/useInfoToggle';
import { CustomizationHeader } from './ProductCustomization/components/CustomizationHeader';
import { OptionGroup } from './ProductCustomization/components/OptionGroup';
import { 
 ProductCustomizationProps, 
 CustomizationOption 
} from './ProductCustomization/types/customizationTypes';

const ProductCustomization = ({
 options,
 selectedOptions,
 onOptionChange,
}: ProductCustomizationProps) => {
 const { activeInfoId, toggleInfo } = useInfoToggle();

 return (
 <div className="product-customization">
 <CustomizationHeader />
 
 {options.map((option) => (
 <OptionGroup
 key={option.id}
 option={option}
 selectedOptions={selectedOptions}
 onOptionChange={onOptionChange}
 activeInfoId={activeInfoId}
 onToggleInfo={toggleInfo}
 />
 ))}
 </div>
 );
};

export default ProductCustomization;
export type { CustomizationOption }; 