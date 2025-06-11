#!/usr/bin/env node

/**
 * Environment Variables Validation Script
 * Validates that all required environment variables are properly configured
 */

const fs = require('fs');
const path = require('path');

// Required environment variables for production
const REQUIRED_ENV_VARS = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_STRIPE_PUBLISHABLE_KEY'
];

// Optional but recommended environment variables
const RECOMMENDED_ENV_VARS = [
  'VITE_APP_URL',
  'VITE_CONTACT_EMAIL'
];

// Security-sensitive variables that should not be in client-side code
const SERVER_ONLY_VARS = [
  'STRIPE_SECRET_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL'
];

function validateEnvironment() {
  console.log('🔍 Validating environment variables...\n');
  
  let hasErrors = false;
  let hasWarnings = false;

  // Check for .env file
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  No .env file found. This is okay for production builds.');
  }

  // Validate required variables
  console.log('📋 Checking required variables:');
  REQUIRED_ENV_VARS.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
      console.log(`❌ ${varName}: Missing (required)`);
      hasErrors = true;
    } else if (value.includes('your_') || value.includes('placeholder')) {
      console.log(`❌ ${varName}: Contains placeholder value`);
      hasErrors = true;
    } else {
      console.log(`✅ ${varName}: Configured`);
    }
  });

  // Check recommended variables
  console.log('\n📋 Checking recommended variables:');
  RECOMMENDED_ENV_VARS.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
      console.log(`⚠️  ${varName}: Not set (recommended)`);
      hasWarnings = true;
    } else {
      console.log(`✅ ${varName}: Configured`);
    }
  });

  // Security check - ensure server-only vars are not exposed
  console.log('\n🔒 Security check:');
  const clientVars = Object.keys(process.env).filter(key => key.startsWith('VITE_'));
  const exposedServerVars = SERVER_ONLY_VARS.filter(serverVar => 
    clientVars.some(clientVar => clientVar.includes(serverVar.replace(/_/g, '')))
  );

  if (exposedServerVars.length > 0) {
    console.log('❌ Security issue: Server-only variables may be exposed:');
    exposedServerVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    hasErrors = true;
  } else {
    console.log('✅ No server-only variables exposed to client');
  }

  // Validate URL formats
  console.log('\n🌐 Validating URL formats:');
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  if (supabaseUrl) {
    try {
      new URL(supabaseUrl);
      if (supabaseUrl.includes('supabase.co')) {
        console.log('✅ Supabase URL: Valid format');
      } else {
        console.log('⚠️  Supabase URL: Custom domain (verify it\'s correct)');
        hasWarnings = true;
      }
    } catch {
      console.log('❌ Supabase URL: Invalid format');
      hasErrors = true;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    console.log('❌ Environment validation failed!');
    console.log('💡 Please fix the errors above before deploying.');
    process.exit(1);
  } else if (hasWarnings) {
    console.log('⚠️  Environment validation completed with warnings.');
    console.log('💡 Consider addressing the warnings for optimal configuration.');
  } else {
    console.log('✅ Environment validation passed!');
    console.log('🎉 All environment variables are properly configured.');
  }
}

// Run validation
validateEnvironment(); 