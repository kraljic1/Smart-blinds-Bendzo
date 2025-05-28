# Stripe Payment Integration Setup

This guide will help you set up Stripe payments for your e-commerce application.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Netlify account for hosting
3. Supabase account for database

## Step 1: Get Stripe API Keys

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to **Developers** > **API keys**
3. Copy your **Publishable key** (starts with `pk_`)
4. Copy your **Secret key** (starts with `sk_`)

## Step 2: Environment Variables

Add these environment variables to your project:

### For Development (.env file)
```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Stripe API Version (optional - defaults to latest)
VITE_STRIPE_API_VERSION=2025-04-30.basil
STRIPE_API_VERSION=2025-04-30.basil

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_KEY=your_supabase_service_key_here

# Netlify Configuration
URL=http://localhost:8888
```

### For Production (Netlify Environment Variables)
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add the following variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `VITE_STRIPE_API_VERSION`: Stripe API version for frontend (optional)
   - `STRIPE_API_VERSION`: Stripe API version for backend functions (optional)
   - `SUPABASE_SERVICE_KEY`: Your Supabase service role key
   - `URL`: Your production site URL (e.g., https://your-site.netlify.app)

## Step 2.1: Stripe API Version Management

The application uses the latest Stripe API version (`2025-04-30.basil`) by default. You can:

- **Use defaults**: The app automatically uses the latest supported version
- **Pin to specific version**: Set `STRIPE_API_VERSION` and `VITE_STRIPE_API_VERSION` environment variables
- **Update versions**: Change environment variables to upgrade API versions without code changes

### Why API Version Matters
- **New features**: Latest versions include new Stripe features and improvements
- **Bug fixes**: Newer versions contain important security and stability fixes
- **Compatibility**: Ensures your integration works with current Stripe infrastructure

### Updating API Versions
1. Check [Stripe's API versioning docs](https://stripe.com/docs/api/versioning) for latest version
2. Update environment variables in both development and production
3. Test thoroughly with the new version before deploying

## Step 3: Database Setup

Ensure your Supabase database has the following tables:

### Orders Table
```sql
-- Add payment_intent_id column to orders table
ALTER TABLE orders ADD COLUMN payment_intent_id TEXT;
```

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run netlify:dev
   ```

2. Add items to your cart and proceed to checkout

3. Select "Credit card" as payment method

4. Use Stripe test card numbers:
   - **Success**: 4242 4242 4242 4242
   - **Decline**: 4000 0000 0000 0002
   - **3D Secure**: 4000 0025 0000 3155

5. Use any future expiry date and any 3-digit CVC

## Step 5: Go Live

1. In your Stripe Dashboard, activate your account
2. Replace test API keys with live keys
3. Update environment variables in Netlify
4. Test with real card numbers (small amounts)

## Features Included

✅ **Secure Card Payments**: PCI-compliant payment processing
✅ **Payment Intent API**: Modern Stripe integration
✅ **Real-time Validation**: Card validation and error handling
✅ **Order Confirmation**: Automatic email confirmations
✅ **Payment Verification**: Server-side payment verification
✅ **Responsive Design**: Mobile-friendly payment forms
✅ **Multi-language**: Croatian language support

## Payment Flow

1. Customer fills out checkout form
2. Selects "Credit card" payment method
3. Payment Intent is created on the server
4. Customer enters card details securely
5. Payment is processed by Stripe
6. Order is confirmed and saved to database
7. Confirmation email is sent

## Security Features

- **No card data storage**: Card details never touch your servers
- **Payment verification**: Server-side payment confirmation
- **Amount validation**: Prevents payment tampering
- **Secure transmission**: All data encrypted in transit

## Support

For Stripe-specific issues, check:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

For integration issues, check the browser console and Netlify function logs. 