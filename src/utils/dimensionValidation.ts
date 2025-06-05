/**
 * Dimension validation utilities for product configuration
 */

export interface DimensionConstraints {
  min: number;
  max: number;
}

export const DEFAULT_DIMENSION_CONSTRAINTS: DimensionConstraints = {
  min: 30,
  max: 350
};

export const DEMO_DIMENSION_CONSTRAINTS: DimensionConstraints = {
  min: 20,
  max: 300
};

/**
 * Validates and constrains a dimension value within specified limits
 * @param value - The input value to validate
 * @param constraints - The min/max constraints to apply
 * @returns The constrained value or empty string if input was empty
 */
export const validateDimension = (
  value: string | number,
  constraints: DimensionConstraints = DEFAULT_DIMENSION_CONSTRAINTS
): number | '' => {
  if (value === '' || value === null || value === undefined) {
    return '';
  }

  const numValue = typeof value === 'string' ? Number(value) : value;

  if (isNaN(numValue)) {
    return '';
  }

  // Enforce min/max constraints
  if (numValue < constraints.min) {
    return constraints.min;
  } else if (numValue > constraints.max) {
    return constraints.max;
  }

  return numValue;
};

/**
 * Validates that both width and height are within valid ranges
 * @param width - Width value to validate
 * @param height - Height value to validate
 * @param constraints - The min/max constraints to apply
 * @returns Object with validation result and error message if any
 */
export const validateDimensions = (
  width: number | '',
  height: number | '',
  constraints: DimensionConstraints = DEFAULT_DIMENSION_CONSTRAINTS
): { isValid: boolean; errorMessage?: string } => {
  if (typeof width !== 'number' || typeof height !== 'number') {
    return {
      isValid: false,
      errorMessage: 'Please enter valid width and height values'
    };
  }

  if (width < constraints.min || width > constraints.max || 
      height < constraints.min || height > constraints.max) {
    return {
      isValid: false,
      errorMessage: `Please enter valid width and height values between ${constraints.min}-${constraints.max} cm`
    };
  }

  return { isValid: true };
};

/**
 * Formats dimension constraints for display
 * @param constraints - The constraints to format
 * @returns Formatted string like "30 - 350 cm"
 */
export const formatDimensionRange = (constraints: DimensionConstraints): string => {
  return `${constraints.min} - ${constraints.max} cm`;
}; 