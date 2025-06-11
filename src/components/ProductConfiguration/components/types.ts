import { Product } from '../../../types/product';
import { CustomizationOption } from '../../Product/ProductCustomization/types';

export interface FormState {
 width: number | '';
 height: number | '';
 isCalculated: boolean;
 additionalCosts: { name: string; price: number }[];
 handleWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 handleHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 handleWidthBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
 handleHeightBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
 handleCalculatePrice: () => void;
}

export interface BaseFormProps {
 product: Product;
 isAccessoryProduct: boolean;
 customizationOptions: CustomizationOption[];
 selectedOptions: Record<string, string>;
 onOptionChange: (optionId: string, valueId: string) => void;
 formState: FormState;
 handleCheckoutWithDetails: (quantity: number, calculatedPrice: number) => void;
 isVisible: boolean;
 animationFinished: boolean;
} 