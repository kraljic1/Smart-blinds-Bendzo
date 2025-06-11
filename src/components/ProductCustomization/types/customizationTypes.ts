import { Product } from '../../../types/product';

export interface CustomizationOption {
 id: string;
 name: string;
 textOnly?: boolean;
 info?: string;
 options: {
 id: string;
 name: string;
 image?: string;
 color?: string;
 price?: number;
 }[];
}

export interface ProductCustomizationProps {
 product: Product;
 options: CustomizationOption[];
 selectedOptions: Record<string, string>;
 onOptionChange: (optionId: string, valueId: string) => void;
 width?: number;
 height?: number;
}

export interface OptionGroupProps {
 option: CustomizationOption;
 selectedOptions: Record<string, string>;
 onOptionChange: (optionId: string, valueId: string) => void;
 activeInfoId: string | null;
 onToggleInfo: (optionId: string) => void;
}

export interface OptionItemProps {
 option: CustomizationOption;
 value: CustomizationOption['options'][0];
 isSelected: boolean;
 onSelect: () => void;
} 