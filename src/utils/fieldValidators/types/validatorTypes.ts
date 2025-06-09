import type { ValidationResult } from '../../securityValidation';
import type { FormData } from '../../../types/validation';

export interface FieldValidator {
  (value: unknown, formData?: FormData): ValidationResult;
}

export interface ValidatorConfig {
  [fieldName: string]: FieldValidator;
} 