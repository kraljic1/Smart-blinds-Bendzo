# Security Monitoring Guide

This guide covers the comprehensive security monitoring system implemented for the BENDZO project. The system provides automated security scanning, incident logging, and real-time monitoring capabilities.

## Table of Contents

1. [Overview](#overview)
2. [Automated Security Scanning](#automated-security-scanning)
3. [Security Incident Logging](#security-incident-logging)
4. [Dependency Management](#dependency-management)
5. [Security Dashboard](#security-dashboard)
6. [Integration Guide](#integration-guide)
7. [Configuration](#configuration)
8. [Monitoring and Alerts](#monitoring-and-alerts)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Overview

The security monitoring system consists of several components:

- **Automated CI/CD Security Scanning**: GitHub Actions workflows for continuous security monitoring
- **Security Incident Logger**: Real-time logging and tracking of security events
- **Dependency Update Automation**: Automated dependency vulnerability scanning and updates
- **Security Dashboard**: Admin interface for monitoring security incidents
- **React Security Hooks**: Integration utilities for React components

## Automated Security Scanning

### GitHub Actions Workflows

#### Security Scan Workflow (`.github/workflows/security-scan.yml`)

Runs automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main`
- Daily at 2 AM UTC (scheduled)

**Features:**
- npm audit for dependency vulnerabilities
- CodeQL analysis for code security issues
- Sensitive data pattern detection
- Security headers validation

#### Dependency Updates Workflow (`.github/workflows/dependency-updates.yml`)

Runs automatically:
- Weekly on Mondays at 9 AM UTC
- Can be triggered manually

**Features:**
- Automated security fixes via `npm audit fix`
- Patch version updates
- Automatic pull request creation
- Security advisory checks

### Manual Security Scanning

Run security scans locally:

```bash
# Run comprehensive security monitoring
npm run security-monitor

# Run security scan (includes audit)
npm run security-scan

# Apply security updates
npm run security-update
```

## Security Incident Logging

### SecurityLogger Class

The `SecurityLogger` class (`src/utils/securityLogger.ts`) provides comprehensive incident tracking:

```typescript
import { securityLogger, logSecurityEvent } from '../utils/securityLogger';

// Log different types of security incidents
logSecurityEvent.failedAuth('user@example.com', 'Invalid password');
logSecurityEvent.suspiciousActivity('Multiple rapid requests');
logSecurityEvent.unauthorizedAccess('/admin', 'user123');
logSecurityEvent.rateLimitExceeded('/api/orders', 10);
logSecurityEvent.maliciousRequest('SQL injection attempt', payload);
```

### Incident Types

- `FAILED_LOGIN`: Authentication failures
- `SUSPICIOUS_ACTIVITY`: Unusual behavior patterns
- `UNAUTHORIZED_ACCESS`: Access to restricted resources
- `DATA_BREACH_ATTEMPT`: Potential data breach attempts
- `MALICIOUS_REQUEST`: Detected malicious requests
- `RATE_LIMIT_EXCEEDED`: API rate limit violations
- `INVALID_TOKEN`: Invalid authentication tokens
- `PERMISSION_VIOLATION`: Permission-based violations
- `SECURITY_SCAN_DETECTED`: Automated security scans
- `UNUSUAL_BEHAVIOR`: Other unusual activities

### Severity Levels

- `CRITICAL`: Immediate attention required
- `HIGH`: High priority security issue
- `MEDIUM`: Medium priority issue
- `LOW`: Low priority or informational

## Dependency Management

### Automated Updates

The system automatically:
1. Scans for security vulnerabilities daily
2. Applies security fixes weekly
3. Creates pull requests for review
4. Updates patch versions automatically

### Manual Dependency Management

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Check for outdated packages
npm outdated

# Update all packages to latest patch versions
npm update
```

### Critical Dependencies Monitoring

The system specifically monitors these critical dependencies:
- `react` and `react-dom`
- `@supabase/supabase-js`
- `@stripe/stripe-js` and `stripe`
- Security-related packages

## Security Dashboard

### Admin Dashboard Component

The `SecurityDashboard` component (`src/components/Admin/SecurityDashboard.tsx`) provides:

- Real-time security statistics
- Incident filtering and search
- Incident resolution tracking
- Security trend analysis

### Usage

```tsx
import SecurityDashboard from '../components/Admin/SecurityDashboard';

function AdminPage() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <SecurityDashboard />
    </div>
  );
}
```

### Features

- **Statistics Cards**: Total incidents, unresolved count, severity breakdown
- **Filtering**: By severity, type, and resolution status
- **Real-time Updates**: Automatic refresh every 30 seconds
- **Incident Management**: Mark incidents as resolved
- **Export**: Generate security reports

## Integration Guide

### React Hook Integration

Use the `useSecurityMonitoring` hook in your components:

```tsx
import { useSecurityMonitoring } from '../hooks/useSecurityMonitoring';

function LoginComponent() {
  const security = useSecurityMonitoring();

  const handleLoginFailure = (email: string, reason: string) => {
    security.logFailedAuth(email, reason);
  };

  const handleSuspiciousActivity = () => {
    security.logSuspiciousActivity('Multiple rapid login attempts');
  };

  // Rate limiting
  const handleApiCall = (endpoint: string) => {
    if (!security.checkRateLimit(endpoint)) {
      console.warn('Rate limit exceeded');
      return;
    }
    // Proceed with API call
  };

  return (
    // Your component JSX
  );
}
```

### Higher-Order Component

Wrap sensitive components with automatic monitoring:

```tsx
import { withSecurityMonitoring } from '../hooks/useSecurityMonitoring';

const AdminPanel = () => {
  return <div>Admin content</div>;
};

export default withSecurityMonitoring(AdminPanel, {
  enableRateLimitMonitoring: true,
  rateLimitThreshold: 5
});
```

### Error Boundary Integration

```tsx
import { useSecurityErrorHandler } from '../hooks/useSecurityMonitoring';

function SecurityErrorBoundary({ children }) {
  const handleSecurityError = useSecurityErrorHandler();

  return (
    <ErrorBoundary onError={handleSecurityError}>
      {children}
    </ErrorBoundary>
  );
}
```

## Configuration

### Environment Variables

Required environment variables for security monitoring:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Security Monitoring (Optional)
SECURITY_ALERT_EMAIL=admin@yourcompany.com
SECURITY_WEBHOOK_URL=https://your-monitoring-service.com/webhook
```

### Security Configuration

Update `security.config.js` for custom security settings:

```javascript
export const securityConfig = {
  // Rate limiting
  rateLimits: {
    api: { requests: 100, window: 60000 }, // 100 requests per minute
    auth: { requests: 5, window: 300000 }  // 5 auth attempts per 5 minutes
  },

  // Alert thresholds
  alertThresholds: {
    critical: 1,
    high: 3,
    medium: 5,
    low: 10
  },

  // Monitoring options
  monitoring: {
    enableRealTimeAlerts: true,
    enableAutomaticBlocking: false,
    logRetentionDays: 30
  }
};
```

## Monitoring and Alerts

### Real-time Monitoring

The system provides real-time monitoring for:
- Failed authentication attempts
- Suspicious activity patterns
- Rate limit violations
- Unauthorized access attempts
- Security scan attempts

### Alert Thresholds

Automatic alerts are triggered when:
- 1+ CRITICAL incidents in 1 minute
- 3+ HIGH incidents in 1 minute
- 5+ MEDIUM incidents in 1 minute
- 10+ LOW incidents in 1 minute

### Alert Channels

Configure alerts to be sent via:
- Console logging (development)
- Email notifications
- Slack/Discord webhooks
- External monitoring services
- Custom webhook endpoints

## Best Practices

### Development

1. **Regular Security Scans**: Run `npm run security-monitor` before commits
2. **Dependency Updates**: Review and test automated dependency updates
3. **Incident Review**: Regularly review security incidents in the dashboard
4. **Code Reviews**: Include security considerations in code reviews

### Production

1. **Monitor Dashboard**: Check security dashboard daily
2. **Alert Response**: Respond to security alerts within defined SLAs
3. **Incident Investigation**: Investigate and resolve security incidents promptly
4. **Regular Audits**: Conduct monthly security audits

### Security Hygiene

1. **Environment Variables**: Never commit secrets to version control
2. **Access Control**: Implement proper role-based access control
3. **Logging**: Log security events without exposing sensitive data
4. **Updates**: Keep all dependencies updated regularly

## Troubleshooting

### Common Issues

#### High False Positive Rate

**Problem**: Too many low-severity incidents being logged

**Solution**:
```typescript
// Adjust sensitivity in useSecurityMonitoring
const security = useSecurityMonitoring({
  rateLimitThreshold: 20, // Increase threshold
  enableSuspiciousActivityDetection: false // Disable if needed
});
```

#### Missing Security Events

**Problem**: Expected security events not being logged

**Solution**:
1. Check if security logger is properly imported
2. Verify environment configuration
3. Check browser console for errors
4. Ensure proper component integration

#### Performance Issues

**Problem**: Security monitoring affecting application performance

**Solution**:
1. Reduce monitoring frequency
2. Implement event batching
3. Use background processing for heavy operations
4. Optimize incident storage

### Debug Mode

Enable debug mode for detailed logging:

```typescript
// In development environment
if (import.meta.env.DEV) {
  securityLogger.enableDebugMode();
}
```

### Log Analysis

Analyze security logs:

```bash
# View recent security report
cat security-report.json | jq '.issues[] | select(.severity == "CRITICAL")'

# Count incidents by type
cat security-report.json | jq '.issues | group_by(.type) | map({type: .[0].type, count: length})'
```

## Support and Maintenance

### Regular Maintenance Tasks

1. **Weekly**: Review security incidents and trends
2. **Monthly**: Update security configurations and thresholds
3. **Quarterly**: Conduct comprehensive security audits
4. **Annually**: Review and update security policies

### Getting Help

For security-related issues:
1. Check this documentation first
2. Review security logs and reports
3. Contact the development team
4. For critical security issues, follow incident response procedures

### Contributing

When contributing to the security monitoring system:
1. Follow secure coding practices
2. Add appropriate tests for security features
3. Update documentation for new security features
4. Consider security implications of all changes

---

**Note**: This security monitoring system is designed to enhance security but should be part of a comprehensive security strategy that includes proper authentication, authorization, data encryption, and regular security assessments. 