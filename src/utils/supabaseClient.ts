import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
 throw new Error('Missing required Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

// Re-export types and functions from separate modules
export type { OrderData } from '../types/order';
export { 
 addAdminUser, 
 resetAdminPassword, 
 removeAdminUser, 
 isUserAdmin 
} from './adminService';
export { 
 getOrderById, 
 getOrdersByEmail, 
 createOrder 
} from './orderService';

 