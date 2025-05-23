# Scripts Directory

This directory contains administrative scripts for managing the Smartblinds application.

## 🔐 Security Notice

These scripts have administrative privileges and should only be run by authorized personnel.

## Available Scripts

### `add-admin.js` - Add Admin User

**Purpose**: Securely add admin users to the system.

**Security Features**:
- ✅ Interactive prompts (no email exposure in command history)
- ✅ Email validation
- ✅ Confirmation requirement
- ✅ Duplicate detection
- ✅ Secure error handling

**Usage**:
```bash
# Run the script
node scripts/add-admin.js

# Follow the interactive prompts:
# 1. Enter admin email address
# 2. Type "CONFIRM" to proceed
```

**Requirements**:
- Valid `.env` file with Supabase credentials
- Proper database setup (run `scripts/setup-database.js` first)

### `setup-database.js` - Database Setup

**Purpose**: Initialize the database schema and tables.

**Usage**:
```bash
node scripts/setup-database.js
```

### `check-database.js` - Database Status Check

**Purpose**: Verify database connection and view current data.

**Usage**:
```bash
node scripts/check-database.js
```

## 🛡️ Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **Access Control**: Only authorized personnel should run these scripts
3. **Audit Trail**: Keep logs of admin additions
4. **Regular Review**: Periodically review admin user list

## ⚠️ Important Notes

- These scripts require direct database access
- Changes are immediate and cannot be easily undone
- Always test in development environment first
- Consider backing up data before running setup scripts 