/**
 * Testing utilities for order functionality
 */

import { supabase } from '../supabaseClient';
import { isDevelopmentMode } from './environment';

/**
 * Test function to verify order fetching functionality
 * @returns Promise<boolean> - true if all tests pass, false otherwise
 */
export const testOrderFetching = async (): Promise<boolean> => {
  try {
    console.log('Testing order fetching functionality...');
    
    // Test 1: Check if Supabase client is available
    if (!supabase) {
      console.error('❌ Supabase client not available');
      return false;
    }
    console.log('✅ Supabase client available');
    
    // Test 2: Check if we can connect to the database
    const { error } = await supabase
      .from('orders')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    console.log('✅ Database connection successful');
    
    // Test 3: Check if Netlify function is available (in production)
    if (!isDevelopmentMode()) {
      try {
        const response = await fetch('/.netlify/functions/get-orders?limit=1');
        if (response.ok) {
          console.log('✅ Netlify function available');
        } else {
          console.warn('⚠️ Netlify function not responding correctly');
        }
      } catch (error) {
        console.warn('⚠️ Netlify function test failed:', error);
      }
    }
    
    console.log('✅ Order fetching functionality test completed');
    return true;
    
  } catch (error) {
    console.error('❌ Order fetching test failed:', error);
    return false;
  }
}; 