/**
 * Validation hooks and utilities index
 * Provides clean exports for all validation-related functionality
 */

// Main hook
export { useSecureValidation } from '../useSecureValidation';

// Individual hooks
export { useValidationState } from '../useValidationState';
export { useFormSubmission } from '../useFormSubmission';

// Utilities
export { 
 validateFormField, 
 getRequiredFields, 
 getAllValidationFields 
} from '../../utils/fieldValidators';

// Types
export type {
 FormValidationState,
 UseSecureValidationOptions,
 FormData,
 SubmitCheckResult,
 ValidationCheckResult,
 FieldValidationResult
} from '../../types/validation';

export { useDebouncedValidation } from './useDebouncedValidation';
export { useFieldValidation } from './useFieldValidation';
export { useValidationGetters } from './useValidationGetters';
export { useFormValidation } from './useFormValidation';
export { useValidationStateManager } from './useValidationStateManager';
export { useFieldEventHandlers } from './useFieldEventHandlers';
export { useFieldStateGetters } from './useFieldStateGetters';
export type { FieldValidationState, UseRealTimeValidationOptions } from './types'; 