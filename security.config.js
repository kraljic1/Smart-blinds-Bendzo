// Security Configuration for BENDZO Project
// This file contains security guidelines and configurations

export const securityConfig = {
  // Content Security Policy for production
  csp: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'", 
      "'unsafe-inline'", 
      "'unsafe-eval'",
      "https://js.stripe.com",
      "https://checkout.stripe.com",
      "https://m.stripe.com",
      "https://m.stripe.network"
    ],
    'style-src': [
      "'self'", 
      "'unsafe-inline'", 
      "https://fonts.googleapis.com",
      "https://js.stripe.com",
      "https://checkout.stripe.com",
      "https://a.stripecdn.com"
    ],
    'font-src': [
      "'self'", 
      "https://fonts.gstatic.com",
      "https://a.stripecdn.com"
    ],
    'img-src': [
      "'self'", 
      "data:", 
      "https:",
      "blob:",
      "https://*.stripe.com",
      "https://*.stripecdn.com"
    ],
    'connect-src': [
      "'self'", 
      "https://api.stripe.com",
      "https://js.stripe.com",
      "https://checkout.stripe.com",
      "https://q.stripe.com",
      "https://m.stripe.com",
      "https://merchant-ui-api.stripe.com",
      "https://r.stripe.com",
      "https://hooks.stripe.com",
      "https://m.stripe.network",
      "https://*.stripe.com",
      "wss://*.stripe.com",
      "https://*.supabase.co",
      "https://*.supabase.io",
      "wss://*.supabase.co",
      "wss://*.supabase.io"
    ],
    'frame-src': [
      "'self'",
      "https://js.stripe.com",
      "https://checkout.stripe.com",
      "https://connect.stripe.com",
      "https://hooks.stripe.com"
    ],
    'worker-src': [
      "'self'",
      "blob:",
      "https://m.stripe.network",
      "https://m.stripe.com"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"]
  },

  // Security headers for production
  headers: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin'
  },

  // Environment variable validation
  requiredEnvVars: [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_STRIPE_PUBLISHABLE_KEY'
  ],

  // Sensitive data patterns to avoid in code
  sensitivePatterns: [
    /sk_live_[a-zA-Z0-9]+/, // Stripe secret keys
    /sk_test_[a-zA-Z0-9]+/, // Stripe test secret keys
    /password\s*=\s*["'][^"']+["']/, // Hardcoded passwords
    /api[_-]?key\s*=\s*["'][^"']+["']/, // API keys
    /secret\s*=\s*["'][^"']+["']/ // Secrets
  ]
};

// Security validation function
export function validateSecurity() {
  const errors = [];

  // Check for required environment variables
  securityConfig.requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  });

  // Check for development-only configurations in production
  if (process.env.NODE_ENV === 'production') {
    if (process.env.VITE_STRIPE_PUBLISHABLE_KEY?.includes('pk_test_')) {
      errors.push('Using test Stripe key in production');
    }
  }

  return errors;
}

export default securityConfig; 