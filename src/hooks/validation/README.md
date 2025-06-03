# Validation System Documentation

This directory contains the refactored validation system that was previously contained in a single 394-line `useSecureValidation.ts` file. The system has been broken down into smaller, focused components following clean code principles.

## Structure

### Types (`src/types/validation.ts`)
Contains all TypeScript interfaces and types used throughout the validation system:
- `FormValidationState` - State structure for field validation
- `FormData` - Form data interface
- `UseSecureValidationOptions` - Configuration options
- `SubmitCheckResult` - Result of submission validation
- `ValidationCheckResult` - Result of field validation
- `FieldValidationResult` - Individual field validation result

### Field Validators (`src/utils/fieldValidators.ts`)
Utility functions for validating individual form fields:
- `validateFormField()` - Main field validation function
- `getRequiredFields()` - Gets required fields based on form state
- `getAllValidationFields()` - Gets all fields that need validation

### Validation State Hook (`src/hooks/useValidationState.ts`)
Manages form validation state and field-level operations:
- Field validation state management
- Debounced validation
- Field change/blur handlers
- Validation state getters
- Form validation summary

### Form Submission Hook (`src/hooks/useFormSubmission.ts`)
Handles form submission logic and rate limiting:
- Submission state management
- Rate limiting checks
- Submission flow control
- Error handling

### Main Hook (`src/hooks/useSecureValidation.ts`)
Orchestrates all validation functionality:
- Combines validation state and submission hooks
- Provides unified API
- Maintains backward compatibility

## Usage

### Basic Usage
```typescript
import { useSecureValidation } from './hooks/validation';

const MyForm = () => {
  const {
    validationState,
    isFormValid,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
    getFieldError
  } = useSecureValidation({
    validateOnChange: true,
    validateOnBlur: true,
    debounceMs: 300
  });

  // Use in your form...
};
```

### Individual Hooks
```typescript
import { useValidationState, useFormSubmission } from './hooks/validation';

// Use validation state only
const validationHook = useValidationState(options);

// Use submission logic only
const submissionHook = useFormSubmission();
```

### Utilities
```typescript
import { validateFormField, getRequiredFields } from './hooks/validation';

// Validate a single field
const result = validateFormField('email', 'test@example.com', formData);

// Get required fields for current form state
const required = getRequiredFields(formData);
```

## Benefits of Refactoring

1. **Maintainability**: Each file has a single responsibility and is under 200 lines
2. **Testability**: Individual components can be tested separately
3. **Reusability**: Hooks and utilities can be used independently
4. **Readability**: Clear separation of concerns makes code easier to understand
5. **Extensibility**: New validation logic can be added without modifying existing code

## File Sizes
- `validation.ts` (types): ~50 lines
- `fieldValidators.ts`: ~100 lines
- `useValidationState.ts`: ~180 lines
- `useFormSubmission.ts`: ~80 lines
- `useSecureValidation.ts`: ~80 lines

Total: ~490 lines (vs original 394 lines, but much better organized)

## Migration

The main `useSecureValidation` hook maintains the same API as before, so existing code should work without changes. However, you can now also use the individual hooks and utilities for more specific use cases. 