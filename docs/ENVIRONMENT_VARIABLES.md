# Environment Variables & Security Setup

## 🔒 Required Environment Variables

### **Client-Side Variables (VITE_ prefix)**
These are exposed to the browser and should only contain public keys:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Stripe Configuration (Public Key Only)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key-here

# Application URL
VITE_APP_URL=http://localhost:5173
```

### **Server-Side Variables (Netlify Functions)**
These are kept secure on the server:

```bash
# Supabase Service Role Key (NEVER expose to client)
SUPABASE_SERVICE_KEY=your-service-role-key-here

# Stripe Secret Key (NEVER expose to client)
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key-here
```

## 🛡️ Security Best Practices

### **1. Key Management**
- ✅ Use different keys for development and production
- ✅ Rotate keys regularly (every 90 days)
- ✅ Never commit `.env` files to version control
- ✅ Use `pk_test_` keys for development, `pk_live_` for production

### **2. Environment Separation**
```bash
# Development
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Production
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### **3. Validation**
Run these commands to validate your setup:

```bash
# Check environment variables
npm run validate-env

# Run security checks
npm run security-check

# Test Stripe configuration
npm run test-stripe
```

## 🔧 Setup Instructions

### **1. Create .env file**
```bash
cp .env.example .env
# Edit .env with your actual values
```

### **2. Netlify Environment Variables**
In your Netlify dashboard, add these server-side variables:
- `SUPABASE_SERVICE_KEY`
- `STRIPE_SECRET_KEY`
- `SUPABASE_URL` (same as VITE_SUPABASE_URL)

### **3. Supabase Setup**
1. Create project at https://supabase.com
2. Get URL and anon key from Settings > API
3. Generate service role key for server operations

### **4. Stripe Setup**
1. Create account at https://stripe.com
2. Get publishable and secret keys from Dashboard > Developers > API keys
3. Configure webhooks for payment confirmations

## ⚠️ Security Warnings

### **NEVER DO THIS:**
```bash
# ❌ Don't expose secret keys to client
VITE_STRIPE_SECRET_KEY=sk_test_...  # WRONG!

# ❌ Don't use production keys in development
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...  # In development

# ❌ Don't commit .env files
git add .env  # WRONG!
```

### **✅ DO THIS:**
```bash
# ✅ Only expose public keys to client
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ✅ Keep secret keys server-side only
STRIPE_SECRET_KEY=sk_test_...  # In Netlify environment

# ✅ Use .env.example for documentation
git add .env.example  # Correct!
```

## 🚨 Emergency Procedures

### **If Keys Are Compromised:**
1. **Immediately** rotate all affected keys
2. Update environment variables in:
   - Local `.env` file
   - Netlify dashboard
   - Any CI/CD systems
3. Monitor for unauthorized usage
4. Review access logs

### **Key Rotation Schedule:**
- **Development keys**: Every 30 days
- **Production keys**: Every 90 days
- **After team member changes**: Immediately
- **After security incident**: Immediately

## 📋 Validation Checklist

- [ ] All required variables are set
- [ ] No secret keys in client-side variables
- [ ] Different keys for dev/prod environments
- [ ] Keys are properly formatted
- [ ] Netlify environment variables configured
- [ ] `.env` file is in `.gitignore`
- [ ] Team has access to key management system 