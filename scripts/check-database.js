import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 Checking Supabase Database...\n');
  
  try {
    // Check orders table
    console.log('📋 ORDERS TABLE:');
    console.log('================');
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (ordersError) {
      console.error('❌ Error fetching orders:', ordersError);
    } else {
      console.log(`✅ Found ${orders.length} orders`);
      orders.forEach((order, index) => {
        console.log(`\n${index + 1}. Order ID: ${order.order_id}`);
        console.log(`   Customer: ${order.customer_name} (${order.customer_email})`);
        console.log(`   Total: €${order.total_amount}`);
        console.log(`   Status: ${order.status}`);
        console.log(`   Created: ${new Date(order.created_at).toLocaleString()}`);
      });
    }
    
    // Check order items table
    console.log('\n\n🛍️ ORDER ITEMS TABLE:');
    console.log('=====================');
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (itemsError) {
      console.error('❌ Error fetching order items:', itemsError);
    } else {
      console.log(`✅ Found ${items.length} order items`);
      items.forEach((item, index) => {
        console.log(`\n${index + 1}. Product: ${item.product_name}`);
        console.log(`   Order ID: ${item.order_id}`);
        console.log(`   Quantity: ${item.quantity}`);
        console.log(`   Price: €${item.unit_price}`);
        console.log(`   Dimensions: ${item.width}x${item.height}cm`);
      });
    }
    
    // Check admin users table
    console.log('\n\n👤 ADMIN USERS TABLE:');
    console.log('====================');
    const { data: admins, error: adminsError } = await supabase
      .from('admin_users')
      .select('id, username, email, role, is_active, created_at')
      .order('created_at', { ascending: false });
    
    if (adminsError) {
      console.error('❌ Error fetching admin users:', adminsError);
    } else {
      console.log(`✅ Found ${admins.length} admin users`);
      admins.forEach((admin, index) => {
        console.log(`\n${index + 1}. Username: ${admin.username}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Active: ${admin.is_active ? 'Yes' : 'No'}`);
        console.log(`   Created: ${new Date(admin.created_at).toLocaleString()}`);
      });
    }
    
    // Summary statistics
    console.log('\n\n📊 SUMMARY STATISTICS:');
    console.log('======================');
    console.log(`Total Orders: ${orders?.length || 0}`);
    console.log(`Total Order Items: ${items?.length || 0}`);
    console.log(`Total Admin Users: ${admins?.length || 0}`);
    
    if (orders && orders.length > 0) {
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
      console.log(`Total Revenue: €${totalRevenue.toFixed(2)}`);
      
      const statusCounts = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});
      
      console.log('\nOrders by Status:');
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`  ${status}: ${count}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
  }
}

// Run the check
checkDatabase().then(() => {
  console.log('\n✅ Database check completed!');
}).catch((error) => {
  console.error('❌ Script failed:', error);
}); 