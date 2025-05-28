# Stripe API Version Update & Configuration Clarification

## Overview

This document outlines the updates made to modernize the Stripe integration and clarify configuration options.

## Changes Made

### 1. Updated Stripe API Version

**Previous**: `2023-10-16` (outdated)
**Current**: `2025-04-30.basil` (latest as of 2024/2025)

#### Files Updated:
- `src/config/stripe.ts` - Frontend Stripe configuration
- `netlify/functions/create-payment-intent.js` - Payment Intent creation
- `netlify/functions/confirm-payment.js` - Payment confirmation

#### Benefits:
- ✅ Access to latest Stripe features and improvements
- ✅ Enhanced security and bug fixes
- ✅ Better compatibility with current Stripe infrastructure
- ✅ Future-proofed integration

### 2. Made API Version Configurable

Added environment variable support for easier version management:

```bash
# Frontend (Vite)
VITE_STRIPE_API_VERSION=2025-04-30.basil

# Backend (Netlify Functions)
STRIPE_API_VERSION=2025-04-30.basil
```

#### Benefits:
- ✅ Easy version updates without code changes
- ✅ Different versions for testing vs production
- ✅ Simplified maintenance and upgrades

### 3. Clarified stripeAccount Usage

**Removed**: `stripeAccount: undefined` from `src/config/stripe.ts`

#### Explanation:
- Setting `stripeAccount: undefined` is equivalent to omitting the property
- When omitted, Stripe operations default to your platform account
- This is the correct behavior for standard (non-Connect) integrations
- Added clear documentation comment explaining this behavior

#### Benefits:
- ✅ Cleaner, more explicit code
- ✅ Reduced confusion about Stripe Connect usage
- ✅ Better documentation of intended behavior

## Environment Variables

### Required
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Optional (with sensible defaults)
```bash
VITE_STRIPE_API_VERSION=2025-04-30.basil
STRIPE_API_VERSION=2025-04-30.basil
```

## Migration Notes

### For Existing Deployments
1. **No immediate action required** - the code includes fallback defaults
2. **Recommended**: Add API version environment variables for explicit control
3. **Test thoroughly** after updating to ensure compatibility

### For New Deployments
1. Use the updated environment variable template in `STRIPE_SETUP.md`
2. Consider pinning to a specific API version for production stability

## Future Maintenance

### Checking for Updates
1. Monitor [Stripe's API versioning page](https://stripe.com/docs/api/versioning)
2. Review [Stripe's changelog](https://stripe.com/docs/upgrades) for new releases
3. Test new versions in development before production deployment

### Updating API Version
1. Update environment variables in development
2. Test payment flows thoroughly
3. Update production environment variables
4. Monitor for any issues after deployment

## Security Considerations

- ✅ Latest API version includes most recent security improvements
- ✅ Environment variable configuration prevents hardcoded versions
- ✅ Proper separation of frontend/backend API version configuration
- ✅ Clear documentation of account context (platform vs connected accounts)

## Support

For questions about:
- **Stripe API versions**: [Stripe Documentation](https://stripe.com/docs/api/versioning)
- **Environment setup**: See `STRIPE_SETUP.md`
- **Integration issues**: Check browser console and Netlify function logs 