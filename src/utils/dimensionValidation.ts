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
 * Validates a dimension value for real-time input without auto-correction
 * Allows free typing and only returns empty string for invalid input
 * @param value - The input value to validate
 * @returns The numeric value or empty string if input was empty/invalid
 */
export const validateDimensionInput = (
 value: string | number
): number | '' => {
 if (value === '' || value === null || value === undefined) {
 return '';
 }

 const numValue = typeof value === 'string' ? Number(value) : value;

 if (isNaN(numValue)) {
 return '';
 }

 return numValue;
};

/**
 * Validates and constrains a dimension value within specified limits
 * This should be used for final validation (on blur, submit, etc.)
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
 * Checks if a dimension value is within valid range without modifying it
 * @param value - The value to check
 * @param constraints - The min/max constraints to check against
 * @returns Object with validation status and suggested value if out of range
 */
export const checkDimensionRange = (
 value: number | '',
 constraints: DimensionConstraints = DEFAULT_DIMENSION_CONSTRAINTS
): { isValid: boolean; suggestedValue?: number; message?: string } => {
 if (value === '' || typeof value !== 'number') {
 return { isValid: false, message: 'Please enter a valid number' };
 }

 if (value < constraints.min) {
 return { 
 isValid: false, 
 suggestedValue: constraints.min,
 message: `Minimum value is ${constraints.min} cm`
 };
 }

 if (value > constraints.max) {
 return { 
 isValid: false, 
 suggestedValue: constraints.max,
 message: `Maximum value is ${constraints.max} cm`
 };
 }

 return { isValid: true };
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
 * @returns Formatted string like"30 - 350 cm"
 */
export const formatDimensionRange = (constraints: DimensionConstraints): string => {
 return `${constraints.min} - ${constraints.max} cm`;
}; 