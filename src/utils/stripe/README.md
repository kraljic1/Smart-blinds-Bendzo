# Stripe Utilities

This directory contains modular Stripe payment processing utilities, broken down into focused, maintainable components.

## Structure

### Core Files

- **`index.ts`** - Main export file that re-exports all functionality
- **`types.ts`** - TypeScript type definitions for Stripe operations
- **`config.ts`** - Configuration utilities (API URLs, environment variables)

### Functionality Modules

- **`stripeInstance.ts`** - Stripe instance management and initialization
- **`currency.ts`** - Currency formatting and conversion utilities
- **`paymentIntent.ts`** - Payment intent creation functionality
- **`paymentConfirmation.ts`** - Payment confirmation and order processing
- **`paymentProcessor.ts`** - Stripe payment processing with Payment Elements

## Usage

### Recommended (New Modular Approach)

```typescript
// Import specific functionality
import { createPaymentIntent } from '@/utils/stripe/paymentIntent';
import { formatCurrency, toCents } from '@/utils/stripe/currency';
import { getStripe } from '@/utils/stripe/stripeInstance';

// Or import from the main index
import { createPaymentIntent, formatCurrency, getStripe } from '@/utils/stripe';
```

### Legacy Support

```typescript
// Still works for backward compatibility
import { createPaymentIntent, formatCurrency } from '@/utils/stripeUtils';
```

## Benefits of Modular Structure

1. **Maintainability** - Each file focuses on a single responsibility
2. **Testability** - Individual modules can be tested in isolation
3. **Code Organization** - Related functionality is grouped together
4. **Performance** - Tree-shaking can eliminate unused code
5. **Developer Experience** - Easier to find and understand specific functionality

## File Size Compliance

Each module is kept under 200 lines as per project guidelines:

- `types.ts` - ~70 lines (type definitions)
- `config.ts` - ~20 lines (configuration)
- `currency.ts` - ~25 lines (currency utilities)
- `stripeInstance.ts` - ~25 lines (instance management)
- `paymentIntent.ts` - ~45 lines (payment intent creation)
- `paymentConfirmation.ts` - ~35 lines (payment confirmation)
- `paymentProcessor.ts` - ~45 lines (payment processing)
- `index.ts` - ~25 lines (re-exports)

## Migration Guide

The original `stripeUtils.ts` file has been refactored but maintains backward compatibility. Existing imports will continue to work, but new code should use the modular imports for better maintainability. 