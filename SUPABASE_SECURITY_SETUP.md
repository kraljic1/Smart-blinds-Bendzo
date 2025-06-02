# Supabase Security Configuration Guide

This guide will help you fix the CodeQL security warnings by properly configuring your Supabase authentication settings.

## 🔧 Step 1: Configure OTP Expiry (Fix "Auth OTP Long Expiry")

1. **Go to Supabase Dashboard**
   - Navigate to https://app.supabase.com/
   - Select your project

2. **Open Authentication Settings**
   - Click "Authentication" in the left sidebar
   - Click "Settings" tab

3. **Configure OTP Settings**
   - Find "Email OTP expiry" setting
   - Change from default `3600` seconds to `300` seconds (5 minutes)
   - Click "Save"

## 🔒 Step 2: Enable Password Protection (Fix "Leaked Password Protection Disabled")

1. **In Authentication Settings**
   - Find "Password Protection" section
   - Enable "Check for breached passwords"
   - Set "Minimum password length" to `8` characters
   - Enable "Require uppercase letters"
   - Enable "Require lowercase letters"
   - Enable "Require numbers"
   - Click "Save"

## 🛡️ Step 3: Execute Security SQL (Fix "Function Search Path Mutable")

1. **Go to SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

2. **Execute the Security Configuration**
   - Copy the contents of `supabase_auth_config.sql`
   - Paste into the SQL editor
   - Click "Run"

## ✅ Step 4: Verify Security Settings

After completing the above steps:

1. **Check OTP Expiry**
   - OTP emails should expire in 5 minutes instead of 1 hour

2. **Test Password Protection**
   - Try creating an account with a weak password
   - Should be rejected with security requirements

3. **Verify Database Functions**
   - All functions should have secure search paths
   - RLS policies should be more restrictive

## 🔍 Step 5: Monitor Security

The new configuration includes:
- ✅ **Audit logging** for all security events
- ✅ **Secure function definitions** with proper search paths
- ✅ **Restricted RLS policies** requiring authentication
- ✅ **Admin verification functions** with security definer

## 📊 Expected Results

After implementing these changes, your CodeQL Security Advisor should show:
- ✅ **0 errors**
- ✅ **0 warnings** 
- ✅ **All security issues resolved**

## 🚨 Important Notes

- **Backup your data** before running the SQL scripts
- **Test authentication** after making changes
- **Update your application** if needed to handle new security requirements
- **Monitor the audit logs** for any security events

## 🔄 Rollback Instructions

If you need to rollback any changes:

1. **Restore OTP expiry** to previous value in Authentication Settings
2. **Disable password protection** if needed
3. **Drop new tables** if necessary:
   ```sql
   DROP TABLE IF EXISTS security_audit_log CASCADE;
   ```

---

**Security Level**: Enterprise Grade 🛡️
**Compliance**: OWASP Security Standards ✅ 