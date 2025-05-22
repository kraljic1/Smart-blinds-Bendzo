import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL or key is missing from environment variables.');
  console.error('Please ensure you have a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY defined.');
  process.exit(1);
}

// Read SQL file
const sqlFilePath = path.join(__dirname, '..', 'create_tables.sql');
const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

console.log('Connecting to Supabase...');
console.log('URL:', supabaseUrl);

// Create a supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  try {
    // Try to query the orders table
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .limit(1);
    
    if (error && error.code === 'PGRST116') {
      console.log('\nIMPORTANT: The database tables are not set up correctly.');
      printSetupInstructions();
      return false;
    } else if (error) {
      console.error('Error checking database:', error);
      printSetupInstructions();
      return false;
    } else {
      console.log('✅ Database tables exist!');
      return true;
    }
  } catch (err) {
    console.error('Error connecting to database:', err);
    printSetupInstructions();
    return false;
  }
}

function printSetupInstructions() {
  console.log('\n=== DATABASE SETUP INSTRUCTIONS ===');
  console.log('Please set up the database tables using the Supabase dashboard:');
  console.log('1. Go to your Supabase project dashboard');
  console.log('2. Navigate to the SQL Editor');
  console.log('3. Create a new query');
  console.log('4. Copy and paste the following SQL:');
  console.log('\n' + sqlContent + '\n');
  console.log('5. Run the SQL query');
  console.log('\nOnce you have executed the SQL, your database will be ready to use.');
}

async function checkAndListTables() {
  const tablesExist = await checkDatabase();
  
  if (tablesExist) {
    // List tables to verify
    try {
      const { data, error } = await supabase
        .from('pg_catalog.pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      if (error) {
        console.error('Error listing tables:', error);
        return;
      }
      
      console.log('Tables in database:');
      if (data && data.length > 0) {
        data.forEach(table => {
          console.log(`- ${table.tablename}`);
        });
      } else {
        console.log('No tables found');
        printSetupInstructions();
      }
    } catch (err) {
      console.error('Error listing tables:', err);
    }
  }
}

checkAndListTables(); 