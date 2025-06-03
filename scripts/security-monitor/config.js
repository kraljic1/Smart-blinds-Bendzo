/**
 * Security Monitor Configuration
 * Contains all security patterns, dependencies, and settings
 */

export const SECURITY_CONFIG = {
  // Files to scan for sensitive data
  scanPaths: [
    'src',
    'scripts',
    'netlify/functions'
  ],
  
  // Patterns that indicate potential security issues
  sensitivePatterns: [
    {
      pattern: /sk_live_[a-zA-Z0-9]+/g,
      description: 'Live Stripe secret key',
      severity: 'CRITICAL'
    },
    {
      pattern: /sk_test_[a-zA-Z0-9]+/g,
      description: 'Test Stripe secret key',
      severity: 'HIGH'
    },
    {
      pattern: /password\s*[:=]\s*["'][^"']+["']/gi,
      description: 'Hardcoded password',
      severity: 'HIGH'
    },
    {
      pattern: /api[_-]?key\s*[:=]\s*["'][^"']+["']/gi,
      description: 'Hardcoded API key',
      severity: 'HIGH'
    },
    {
      pattern: /secret\s*[:=]\s*["'][^"']+["']/gi,
      description: 'Hardcoded secret',
      severity: 'HIGH'
    },
    {
      pattern: /token\s*[:=]\s*["'][^"']+["']/gi,
      description: 'Hardcoded token',
      severity: 'MEDIUM'
    },
    {
      pattern: /console\.log\(/g,
      description: 'Console.log statement (potential info disclosure)',
      severity: 'LOW'
    },
    {
      pattern: /eval\s*\(/g,
      description: 'Use of eval() function',
      severity: 'HIGH'
    },
    {
      pattern: /innerHTML\s*=/g,
      description: 'Use of innerHTML (potential XSS)',
      severity: 'MEDIUM'
    }
  ],

  // Dependencies to check for known vulnerabilities
  criticalDependencies: [
    'react',
    'react-dom',
    '@supabase/supabase-js',
    '@stripe/stripe-js',
    'stripe'
  ],

  // Environment variables that should be present
  requiredEnvVars: [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_STRIPE_PUBLISHABLE_KEY'
  ],

  // Security headers that should be configured
  requiredSecurityHeaders: [
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Content-Security-Policy'
  ],

  // Sensitive files to check permissions for
  sensitiveFiles: [
    '.env',
    '.env.local',
    '.env.production',
    'package.json',
    'package-lock.json'
  ],

  // Environment files to validate
  envFiles: ['.env', '.env.local', '.env.production']
}; 