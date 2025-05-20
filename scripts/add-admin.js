/**
 * Script to add an admin user to the database
 * Run with: node scripts/add-admin.js email@example.com
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env file
dotenv.config({ path: resolve(__dirname, '../.env') });

// Get the email from command line arguments
const email = process.argv[2];

if (!email) {
  console.error('Please provide an email address as an argument');
  console.error('Example: node scripts/add-admin.js admin@example.com');
  process.exit(1);
}

// Validate email format (basic validation)
if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
  console.error('Please provide a valid email address');
  process.exit(1);
}

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Make sure your .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addAdmin() {
  try {
    // First check if the admin already exists
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
      console.log(`User ${email} is already an admin`);
      return;
    }
    
    // Add the user to admin_users
    const { error } = await supabase
      .from('admin_users')
      .insert([{ email }]);
      
    if (error) {
      throw error;
    }
    
    console.log(`Successfully added ${email} as an admin`);
    console.log('This user can now log in to the admin panel using Supabase authentication');
  } catch (error) {
    console.error('Error adding admin:', error);
    process.exit(1);
  }
}

// Run the function
addAdmin()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Unhandled error:', err);
    process.exit(1);
  }); 