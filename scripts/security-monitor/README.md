# Security Monitor Module

A modular security monitoring system that performs comprehensive security checks on your codebase.

## Structure

The security monitor has been restructured into smaller, focused components:

### Core Components

- **`SecurityMonitor.js`** - Main orchestrator class that coordinates all scanners
- **`ReportGenerator.js`** - Handles report generation and output formatting
- **`config.js`** - Configuration settings for all security patterns and rules
- **`utils.js`** - Utility functions used across the module

### Scanners

Each scanner is responsible for a specific type of security check:

- **`SensitiveDataScanner.js`** - Scans for hardcoded secrets, API keys, passwords
- **`DependencyScanner.js`** - Checks for vulnerable dependencies using npm audit
- **`EnvironmentScanner.js`** - Validates environment configuration and secrets placement
- **`FilePermissionScanner.js`** - Checks file permissions on sensitive files
- **`SecurityHeaderScanner.js`** - Validates security headers configuration

## Usage

### Command Line

```bash
# Run the modular version
node scripts/security-monitor.new.js

# Or run the original version
node scripts/security-monitor.js
```

### Programmatic Usage

```javascript
import { SecurityMonitor } from './scripts/security-monitor/index.js';

const monitor = new SecurityMonitor('/path/to/project');
const exitCode = await monitor.runSecurityCheck();
```

### Individual Scanner Usage

```javascript
import { SensitiveDataScanner } from './scripts/security-monitor/index.js';

const scanner = new SensitiveDataScanner();
const issues = await scanner.scan('/path/to/project');
```

## Benefits of Modular Structure

1. **Maintainability** - Each component has a single responsibility
2. **Testability** - Individual scanners can be tested in isolation
3. **Extensibility** - Easy to add new scanners or modify existing ones
4. **Reusability** - Scanners can be used independently
5. **Code Organization** - Clear separation of concerns

## File Size Comparison

- **Original**: `security-monitor.js` - 537 lines
- **Modular**: Multiple files, each under 200 lines:
  - `SecurityMonitor.js` - ~110 lines
  - `ReportGenerator.js` - ~170 lines
  - `config.js` - ~80 lines
  - `utils.js` - ~70 lines
  - Individual scanners - ~50-80 lines each

## Configuration

All security patterns, file paths, and settings are centralized in `config.js`. This makes it easy to:

- Add new security patterns
- Modify severity levels
- Update scan paths
- Configure required environment variables

## Adding New Scanners

To add a new scanner:

1. Create a new file in the `scanners/` directory
2. Implement the scanner class with a `scan(projectRoot)` method
3. Add the scanner to `SecurityMonitor.js`
4. Export it from `index.js`

Example:

```javascript
export class NewScanner {
  async scan(projectRoot) {
    // Implement scanning logic
    return issues; // Array of issue objects
  }
}
``` 