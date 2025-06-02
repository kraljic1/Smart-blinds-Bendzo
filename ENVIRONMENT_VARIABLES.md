# Environment Variables Setup

This document explains how to set up the required environment variables for the BENDZO Smart Blinds project.

## Required Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Optional: For production, use live keys
# VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_key_here

# Development Settings
NODE_ENV=development

# Security Settings
SECURITY_HEADERS_ENABLED=true
```

## How to Get These Values

### Supabase
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings > API
4. Copy the Project URL and anon/public key

### Stripe
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to Developers > API keys
3. Copy the Publishable key (starts with `pk_test_` for test mode)

## Security Notes

- Never commit your `.env` file to version control
- Use test keys for development
- Only use live keys in production
- The security test will warn you if environment variables are missing

## Testing

Run the security test to verify your configuration:

```bash
npm run security-test
``` 