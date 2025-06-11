/**
 * TypeScript interfaces and types for form validation
 */

export interface FormValidationState {
 [key: string]: {
 isValid: boolean;
 errors: string[];
 warnings?: string[];
 touched: boolean;
 };
}

export interface UseSecureValidationOptions {
 validateOnChange?: boolean;
 validateOnBlur?: boolean;
 debounceMs?: number;
}

export interface FormData {
 fullName?: string;
 email?: string;
 phoneNumber?: string;
 phoneCode?: string;
 address?: string;
 shippingAddress?: string;
 city?: string;
 shippingCity?: string;
 postalCode?: string;
 shippingPostalCode?: string;
 companyName?: string;
 companyOib?: string;
 additionalNotes?: string;
 sameAsBilling?: boolean;
 needsR1Invoice?: boolean;
 [key: string]: unknown;
}

export interface SubmitCheckResult {
 canSubmit: boolean;
 reason?: string | null;
 remainingAttempts?: number;
 validationState?: FormValidationState;
}

export interface ValidationCheckResult {
 isValid: boolean;
 validationState: FormValidationState;
}

export interface FieldValidationResult {
 isValid: boolean;
 errors: string[];
 warnings?: string[];
 touched: boolean;
} 