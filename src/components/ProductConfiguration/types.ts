/**
 * TypeScript interfaces and types for Product Configuration components
 */

import { Product } from '../../types/product';
import { CustomizationOption } from '../Product/ProductCustomization';

export interface ProductCustomizationFormProps {
 product: Product;
 isAccessoryProduct: boolean;
 customizationOptions: CustomizationOption[];
 selectedOptions: Record<string, string>;
 onOptionChange: (optionId: string, valueId: string) => void;
 onCheckout: (
 quantity: number, 
 width: number | '', 
 height: number | '', 
 additionalCosts: { name: string; price: number }[], 
 calculatedPrice: number
 ) => void;
 isVisible?: boolean;
 animationFinished?: boolean;
}

export interface AdditionalCost {
 name: string;
 price: number;
}

export interface DimensionInputProps {
 width: number | '';
 height: number | '';
 onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onWidthBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
 onHeightBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
 isVisible: boolean;
 animationFinished: boolean;
}

export interface FormHeaderProps {
 product: Product;
 isAccessoryProduct: boolean;
 isVisible: boolean;
 animationFinished: boolean;
}

export interface CalculatePriceButtonProps {
 onCalculatePrice: () => void;
 isVisible: boolean;
 animationFinished: boolean;
} 