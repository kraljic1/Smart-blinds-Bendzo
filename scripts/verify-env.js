#!/usr/bin/env node

/**
 * Environment Variable Verification Script
 * Checks if all required environment variables are properly configured
 */

const requiredVars = [
  {
    name: 'VITE_SUPABASE_URL',
    description: 'Supabase project URL',
    example: 'https://your-project.supabase.co'
  },
  {
    name: 'VITE_SUPABASE_ANON_KEY',
    description: 'Supabase anonymous key',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  },
  {
    name: 'VITE_STRIPE_PUBLISHABLE_KEY',
    description: 'Stripe publishable key',
    example: 'pk_test_... (for development) or pk_live_... (for production)'
  }
];

console.log('🔍 Environment Variable Verification\n');

let allSet = true;
let hasErrors = false;

requiredVars.forEach(({ name, description, example }) => {
  const value = process.env[name];
  
  if (!value) {
    console.log(`❌ ${name}: NOT SET`);
    console.log(`   Description: ${description}`);
    console.log(`   Example: ${example}\n`);
    allSet = false;
  } else {
    // Validate format
    let isValid = true;
    let warning = '';
    
    if (name === 'VITE_STRIPE_PUBLISHABLE_KEY') {
      if (!value.startsWith('pk_')) {
        isValid = false;
        warning = ' (Invalid format - should start with pk_)';
      } else if (value.startsWith('pk_test_') && process.env.NODE_ENV === 'production') {
        warning = ' (⚠️  Using test key in production)';
      }
    }
    
    if (name === 'VITE_SUPABASE_URL') {
      if (!value.startsWith('https://') || !value.includes('.supabase.co')) {
        isValid = false;
        warning = ' (Invalid format - should be https://your-project.supabase.co)';
      }
    }
    
    if (isValid) {
      console.log(`✅ ${name}: SET${warning}`);
    } else {
      console.log(`❌ ${name}: INVALID${warning}`);
      hasErrors = true;
    }
  }
});

console.log('\n' + '='.repeat(50));

if (allSet && !hasErrors) {
  console.log('🎉 All environment variables are properly configured!');
  console.log('✅ Your project is ready for development/production.');
} else {
  console.log('❌ Some environment variables need attention.');
  console.log('\n📝 To fix this:');
  console.log('1. Create a .env file in your project root');
  console.log('2. Add the missing variables with your actual values');
  console.log('3. For production, set these in your Netlify environment variables');
  console.log('\n📖 See the project README for detailed setup instructions.');
}

console.log('\n🔗 Useful links:');
console.log('• Supabase Dashboard: https://app.supabase.com/');
console.log('• Stripe Dashboard: https://dashboard.stripe.com/');
console.log('• Netlify Environment Variables: https://app.netlify.com/');

process.exit(allSet && !hasErrors ? 0 : 1); 