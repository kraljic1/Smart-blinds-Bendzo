# Security Logger System Documentation

This directory contains the refactored security logging system that was previously contained in a single 337-line `securityLogger.ts` file. The system has been broken down into smaller, focused components following clean code principles.

## Structure

### Types (`src/types/security.ts`)
Contains all TypeScript interfaces, types, and enums used throughout the security system:
- `SecurityIncident` - Core incident data structure
- `SecurityIncidentType` - Enum of incident types
- `SecuritySeverity` - Enum of severity levels
- `SecurityStats` - Statistics interface
- `AlertThresholds` - Alert configuration interface
- `SecurityLoggerConfig` - Logger configuration interface

### Incident Manager (`src/utils/security/incidentManager.ts`)
Handles storage, retrieval, and management of security incidents:
- Incident storage with configurable limits
- Filtering by type, severity, time range
- Incident resolution tracking
- Statistics generation
- Memory management

### Alert System (`src/utils/security/alertSystem.ts`)
Monitors incident thresholds and triggers alerts:
- Configurable alert thresholds per severity
- Time-window based threshold checking
- Alert triggering and notification
- Threshold management

### Monitoring Service (`src/utils/security/monitoringService.ts`)
Handles external monitoring service integrations:
- Environment-aware logging (dev vs prod)
- External service integration examples
- Supabase integration template
- Webhook notification support
- Connectivity testing

### Security Utils (`src/utils/security/securityUtils.ts`)
Helper functions for security operations:
- Incident ID generation
- Data sanitization
- Environment detection
- Payload formatting
- Validation utilities

### Main Logger (`src/utils/securityLogger.ts`)
Orchestrates all security logging functionality:
- Combines all components
- Provides unified API
- Maintains backward compatibility
- Configuration management

## Usage

### Basic Usage
```typescript
import { securityLogger } from './utils/securityLogger';

// Log different types of incidents
securityLogger.logFailedAuth('user@example.com', 'Invalid password');
securityLogger.logSuspiciousActivity('Multiple failed login attempts');
securityLogger.logUnauthorizedAccess('/admin/users', 'user123');
securityLogger.logRateLimitExceeded('/api/login', 5);
securityLogger.logMaliciousRequest('SQL injection attempt', { query: 'DROP TABLE users' });

// Get incident data
const recentIncidents = securityLogger.getRecentIncidents(10);
const stats = securityLogger.getSecurityStats();
const unresolved = securityLogger.getUnresolvedIncidents();

// Resolve incidents
securityLogger.resolveIncident('incident_id', 'admin_user');
```

### Using Individual Components
```typescript
import { IncidentManager, AlertSystem, MonitoringService } from './utils/security';

// Use incident manager only
const incidentManager = new IncidentManager(500); // max 500 incidents
incidentManager.addIncident(incident);

// Use alert system only
const alertSystem = new AlertSystem({ high: 2, critical: 1 });
alertSystem.checkAlertThresholds('high', incidentManager);

// Use monitoring service only
const monitoringService = new MonitoringService();
await monitoringService.sendIncident(incident);
```

### Utility Functions
```typescript
import { logSecurityEvent } from './utils/securityLogger';

// Convenient logging functions
logSecurityEvent.failedAuth('user@example.com');
logSecurityEvent.suspiciousActivity('Unusual login pattern');
logSecurityEvent.unauthorizedAccess('/admin');
logSecurityEvent.rateLimitExceeded('/api/data', 100);
logSecurityEvent.maliciousRequest('XSS attempt');
```

### Configuration
```typescript
import { SecurityLogger } from './utils/securityLogger';

const logger = new SecurityLogger({
  maxIncidents: 2000,
  alertThresholds: {
    low: 20,
    medium: 10,
    high: 5,
    critical: 1
  }
});
```

## Benefits of Refactoring

1. **Maintainability**: Each file has a single responsibility and is under 200 lines
2. **Testability**: Individual components can be tested separately
3. **Configurability**: Alert thresholds and storage limits are configurable
4. **Extensibility**: New monitoring services can be added easily
5. **Reusability**: Components can be used independently
6. **Readability**: Clear separation of concerns makes code easier to understand

## File Sizes
- `security.ts` (types): ~55 lines
- `incidentManager.ts`: ~130 lines
- `alertSystem.ts`: ~90 lines
- `monitoringService.ts`: ~170 lines
- `securityUtils.ts`: ~140 lines
- `securityLogger.ts`: ~150 lines

Total: ~735 lines (vs original 337 lines, but much better organized and more feature-rich)

## Migration

The main `securityLogger` maintains the same API as before, so existing code should work without changes. The refactored version adds:

- Configurable alert thresholds
- Better monitoring service integration
- More comprehensive incident management
- Improved data sanitization
- Better testing capabilities

## Environment Variables

For production monitoring integrations, you may want to set:

```env
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_LOGGING_SERVICE_TOKEN=your_logging_token
VITE_SECURITY_WEBHOOK_URL=your_webhook_url
```

## Testing

Each component can be tested independently:

```typescript
// Test incident manager
const manager = new IncidentManager(10);
manager.addIncident(testIncident);
expect(manager.getTotalIncidentCount()).toBe(1);

// Test alert system
const alerts = new AlertSystem({ high: 1 });
const triggered = alerts.checkAlertThresholds('high', manager);
expect(triggered).toBe(true);

// Test monitoring service
const monitoring = new MonitoringService();
const connected = await monitoring.testConnectivity();
expect(connected).toBe(true);
``` 