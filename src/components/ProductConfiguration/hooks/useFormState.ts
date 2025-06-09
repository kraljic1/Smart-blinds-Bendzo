/**
 * Custom hook for managing product customization form state and logic
 */

import { useState, useEffect, useCallback } from 'react';
import { validateDimensionInput, validateDimension, validateDimensions } from '../../../utils/dimensionValidation';
import { CustomizationOption } from '../../Product/ProductCustomization';
import { AdditionalCost } from '../types';

interface UseFormStateProps {
  isAccessoryProduct: boolean;
  customizationOptions: CustomizationOption[];
  selectedOptions: Record<string, string>;
}

export const useFormState = ({
  isAccessoryProduct,
  customizationOptions,
  selectedOptions
}: UseFormStateProps) => {
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [isCalculated, setIsCalculated] = useState(isAccessoryProduct);
  const [additionalCosts, setAdditionalCosts] = useState<AdditionalCost[]>([]);

  // Calculate additional costs based on selected options
  const updateAdditionalCosts = useCallback(() => {
    if (isCalculated && Object.keys(selectedOptions).length > 0) {
      const costs: AdditionalCost[] = [];
      
      customizationOptions.forEach(option => {
        const selectedOptionId = selectedOptions[option.id];
        if (selectedOptionId) {
          const selectedValue = option.options.find((o) => o.id === selectedOptionId);
          if (selectedValue && selectedValue.price && selectedValue.price > 0) {
            costs.push({
              name: `${option.name}: ${selectedValue.name}`,
              price: selectedValue.price
            });
          }
        }
      });
      
      setAdditionalCosts(costs);
    }
  }, [selectedOptions, isCalculated, customizationOptions]);

  // Update additional costs when dependencies change
  useEffect(() => {
    updateAdditionalCosts();
  }, [updateAdditionalCosts]);

  // Debug logging for state changes
  useEffect(() => {
    console.log('ProductCustomizationForm state:', { width, height, isCalculated, additionalCosts });
  }, [width, height, isCalculated, additionalCosts]);

  // Input change handlers
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = validateDimensionInput(e.target.value);
    setWidth(validatedValue);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = validateDimensionInput(e.target.value);
    setHeight(validatedValue);
  };

  // Input blur handlers - apply constraints when user finishes typing
  const handleWidthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const constrainedValue = validateDimension(e.target.value);
    setWidth(constrainedValue);
  };

  const handleHeightBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const constrainedValue = validateDimension(e.target.value);
    setHeight(constrainedValue);
  };

  // Calculate price with validation
  const handleCalculatePrice = () => {
    console.log('handleCalculatePrice called with:', { width, height });
    const validation = validateDimensions(width, height);
    if (validation.isValid) {
      console.log('Dimensions validated successfully, setting isCalculated to true');
      setIsCalculated(true);
    } else {
      console.log('Dimension validation failed:', validation.errorMessage);
      alert(validation.errorMessage);
    }
  };

  return {
    width,
    height,
    isCalculated,
    additionalCosts,
    handleWidthChange,
    handleHeightChange,
    handleWidthBlur,
    handleHeightBlur,
    handleCalculatePrice
  };
}; 