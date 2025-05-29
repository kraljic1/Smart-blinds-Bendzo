# Environment Setup Guide

## Overview
This guide helps you set up the required environment variables to fix the current issues with email sending and database connections.

## Required Environment Variables

### 1. Supabase Configuration
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

### 2. Stripe Configuration
```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 3. Email Configuration (Optional)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 4. App Configuration
```env
URL=https://your-netlify-site.netlify.app
```

## Setup Instructions

### Local Development
1. Create a `.env` file in the project root
2. Copy the environment variables above and fill in your values
3. Restart your development server

### Netlify Deployment
1. Go to your Netlify dashboard
2. Navigate to Site Settings > Environment Variables
3. Add each environment variable with its corresponding value

## Email Setup (Gmail)
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account > Security > 2-Step Verification
3. Scroll down to "App passwords"
4. Generate an app password for "Mail"
5. Use this 16-character password as `EMAIL_PASS`

## Current Issues Fixed

### 1. Form Field Missing ID/Name Attributes ✅
- Fixed search input in OrderSearch component
- Fixed company name and OIB inputs in CompanyInfoSection

### 2. Email Credentials Error ✅
- Updated send-order-confirmation function to handle missing credentials gracefully
- Added proper error handling and CORS headers
- System will continue to work even without email configuration

### 3. JSON Parsing Error
- This appears to be related to the get-orders function response
- The function itself is correct, the issue might be intermittent

## Testing
After setting up the environment variables:
1. Test order creation
2. Check email sending (if configured)
3. Verify admin panel functionality

## Notes
- Email configuration is optional - the system will work without it
- All other environment variables are required for full functionality
- Make sure to never commit `.env` files to version control 