# Supabase Database Setup

This guide will help you set up the Supabase database for the order management system.

## Steps to Set Up

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.io) and sign up or log in
   - Create a new project with a name of your choice
   - Choose a secure password for the database

2. **Add Database Schema**
   - Go to the SQL Editor in your Supabase project
   - Copy and paste the contents of `db_setup.sql` into the SQL editor
   - Run the script to create the necessary tables and security policies

3. **Get Your API Keys**
   - Go to Project Settings > API
   - Copy the URL and anon key
   - Create a `.env` file in the root of your project with the following content:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_APP_URL=your_app_url
   ```

4. **Configure Netlify Environment Variables**
   - Go to your Netlify project
   - Navigate to Site settings > Build & deploy > Environment
   - Add the same environment variables you added to your `.env` file

## Testing

After setting up, you should be able to:
1. Create orders through the checkout
2. View order history
3. Access order details by ID

## Database Structure

The database has a single table:

### Orders Table
- `id`: Auto-incrementing primary key
- `order_id`: Unique identifier for the order (formatted as ORD-timestamp-random)
- `customer_name`: Full name of the customer
- `customer_email`: Email of the customer
- `customer_phone`: Phone number of the customer
- `customer_address`: Address of the customer
- `items`: JSONB array of ordered items
- `notes`: Additional notes for the order
- `total_amount`: Total amount of the order
- `status`: Status of the order (default: "received")
- `created_at`: Timestamp when the order was created 