# Email Setup Guide for Order Status Updates

## Overview
The "Manage Order" functionality now includes automatic email notifications when order status is updated. This guide explains how to configure email settings.

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

## Gmail Setup Instructions

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication if not already enabled

### 2. Generate App Password
- Go to Google Account > Security > 2-Step Verification
- Scroll down to "App passwords"
- Select "Mail" and generate a password
- Use this generated password as `EMAIL_PASS`

### 3. Configure Environment Variables
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_character_app_password
```

## Alternative Email Providers

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

### Custom SMTP
```env
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@yourdomain.com
EMAIL_PASS=your_password
```

## Features

### Croatian Email Templates
- All email content is translated to Croatian
- Status-specific messages for each order state
- Professional HTML email design

### Status Updates
When you update an order status in the admin panel, the system will:
1. Update the order status in the database
2. Send an email notification to the customer
3. Include order details and status-specific messages

### Supported Status Updates
- **Zaprimljeno** (Received) - Initial order confirmation
- **U obradi** (Processing) - Order is being prepared
- **Poslano** (Shipped) - Order has been shipped
- **Završeno** (Completed) - Order delivered successfully
- **Otkazano** (Cancelled) - Order cancelled

## Testing

### Development Mode
If email credentials are not configured, the system will:
- Still update the order status successfully
- Log a warning about missing email configuration
- Return success without sending email

### Production Mode
With proper email configuration:
- Order status updates trigger automatic emails
- Customers receive professional Croatian emails
- Email delivery is logged for debugging

## Troubleshooting

### Common Issues

1. **"Missing credentials for PLAIN" error**
   - Check that `EMAIL_USER` and `EMAIL_PASS` are set
   - Verify Gmail app password is correct

2. **"Authentication failed" error**
   - Ensure 2FA is enabled on Gmail
   - Generate a new app password
   - Check email address is correct

3. **"Connection timeout" error**
   - Verify `EMAIL_HOST` and `EMAIL_PORT` settings
   - Check firewall/network restrictions

### Debug Steps
1. Check Netlify function logs for detailed error messages
2. Verify environment variables are set in Netlify dashboard
3. Test with a simple email first

## Deployment

### Netlify Environment Variables
Set these in your Netlify dashboard under Site Settings > Environment Variables:
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_SECURE`
- `EMAIL_USER`
- `EMAIL_PASS`

### Local Development
Create a `.env` file in the project root with the same variables for local testing.

## Security Notes
- Never commit `.env` files to version control
- Use app passwords instead of main account passwords
- Regularly rotate email credentials
- Monitor email sending logs for suspicious activity 