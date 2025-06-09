/**
 * ProductConfiguration components - Main export file
 * Re-exports all ProductConfiguration-related components
 */

// Main component
export { default as ProductCustomizationForm } from './ProductCustomizationForm';

// Sub-components
export { default as FormHeader } from './FormHeader';
export { default as DimensionInputs } from './DimensionInputs';
export { default as CalculatePriceButton } from './CalculatePriceButton';

// Custom hooks
export { useFormState } from './hooks/useFormState';

// Types
export type {
  ProductCustomizationFormProps,
  AdditionalCost
} from './types'; 