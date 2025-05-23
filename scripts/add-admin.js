/**
 * Script to add an admin user to the database
 * Run with: node scripts/add-admin.js
 * Security: Uses interactive prompts to prevent email exposure in command history
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createInterface } from 'readline';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env file
dotenv.config({ path: resolve(__dirname, '../.env') });

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Make sure your .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Create readline interface for secure input
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility function to get user input
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Validate email format
function isValidEmail(email) {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

async function secureAddAdmin() {
  try {
    console.log('🔐 SECURE ADMIN ADDITION SCRIPT');
    console.log('===============================\n');
    
    // Security warning
    console.log('⚠️  SECURITY WARNING: This script will grant admin privileges.');
    console.log('   Only authorized personnel should run this script.\n');
    
    // Get email through secure prompt
    let email;
    while (true) {
      email = await question('📧 Enter admin email address: ');
      
      if (!email.trim()) {
        console.log('❌ Email cannot be empty. Please try again.\n');
        continue;
      }
      
      if (!isValidEmail(email)) {
        console.log('❌ Invalid email format. Please try again.\n');
        continue;
      }
      
      break;
    }
    
    // Confirmation step
    console.log(`\n📋 You are about to add: ${email}`);
    const confirmation = await question('⚠️  Type "CONFIRM" to proceed: ');
    
    if (confirmation !== 'CONFIRM') {
      console.log('❌ Operation cancelled for security.');
      rl.close();
      process.exit(0);
    }
    
    console.log('\n🔄 Processing...');
    
    // Check if the admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is the error code for "no rows returned" - that's expected if the admin doesn't exist
      throw checkError;
    }
    
    if (existingAdmin) {
      console.log(`ℹ️  User ${email} is already an admin`);
      rl.close();
      return;
    }
    
    // Generate username from email (part before @)
    const username = email.split('@')[0];
    
    // Add the user to admin_users
    const { error } = await supabase
      .from('admin_users')
      .insert([{ 
        email,
        username,
        password_hash: 'supabase_auth', // This will be handled by Supabase Auth
        role: 'admin',
        is_active: true
      }]);
      
    if (error) {
      throw error;
    }
    
    console.log(`✅ Successfully added ${email} as an admin`);
    console.log('✅ This user can now log in to the admin panel using Supabase authentication');
    console.log('\n🔒 Security reminder: Inform the user to use strong authentication practices.');
    
  } catch (error) {
    console.error('❌ Error adding admin:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the function
secureAddAdmin()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Unhandled error:', err);
    rl.close();
    process.exit(1);
  }); 