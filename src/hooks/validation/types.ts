export interface FieldValidationState {
  isValid: boolean;
  error: string | null;
  warning: string | null;
  isValidating: boolean;
  touched: boolean;
}

export interface UseRealTimeValidationOptions {
  debounceMs?: number;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
} 